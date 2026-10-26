const allowedCourses = new Set([
  "kol_koc",
  "branding_model",
  "personal_image"
]);

const courseNames = {
  kol_koc: "KOL/KOC",
  branding_model: "Personal Branding / Model",
  personal_image: "Personal Image"
};

const allowedContactTimes = new Set(["any"]);

const contactTimeNames = {
  any: "Bất kỳ thời gian phù hợp"
};

function jsonResponse(body, status) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function validateLead(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const name = typeof value.name === "string" ? value.name.trim() : "";
  const phone = typeof value.phone === "string" ? value.phone.trim() : "";
  const normalizedPhone = phone.replace(/[\s.-]/g, "");
  const course = value.course;
  const learningGoal = typeof value.learning_goal === "string" ? value.learning_goal.trim() : "";
  const contactTime = allowedContactTimes.has(value.contact_time) ? value.contact_time : "any";

  if (name.length < 2 || name.length > 120) return null;
  if (!/^(?:\+84|84|0)\d{8,10}$/.test(normalizedPhone)) return null;
  if (!allowedCourses.has(course)) return null;
  if (learningGoal.length > 500) return null;
  if (!allowedContactTimes.has(contactTime)) return null;
  if (value.consent !== true) return null;

  return { name, phone, course, learningGoal, contactTime };
}

function buildEmail(lead) {
  const submittedAt = new Date().toISOString();
  const goalDisplay = lead.learningGoal || "Chưa cung cấp";
  const fields = [
    ["Họ và tên", lead.name],
    ["Số điện thoại", lead.phone],
    ["Khóa học quan tâm", courseNames[lead.course] || lead.course],
    ["Mục tiêu học", goalDisplay],
    ["Thời gian liên hệ", contactTimeNames[lead.contactTime] || "Bất kỳ thời gian phù hợp"],
    ["Thời gian gửi", submittedAt]
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = fields
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("");

  return { text, html: `<h1>Yêu cầu tư vấn mới — ADA Talent Academy</h1>${html}` };
}

export async function sendLead(request, env) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "Yêu cầu phải có nội dung JSON." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 10_000) {
    return jsonResponse({ error: "Dữ liệu gửi lên quá lớn." }, 413);
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ error: "Không đọc được dữ liệu gửi lên." }, 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > 10_000) {
    return jsonResponse({ error: "Dữ liệu gửi lên quá lớn." }, 413);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Dữ liệu JSON không hợp lệ." }, 400);
  }

  const lead = validateLead(body);
  if (!lead) {
    return jsonResponse({ error: "Vui lòng kiểm tra lại thông tin và xác nhận đồng ý liên hệ." }, 400);
  }

  const missingBindings = ["RESEND_API_KEY", "LEADS_TO_EMAIL", "LEADS_FROM_EMAIL"]
    .filter((name) => !env[name]);
  if (missingBindings.length > 0) {
    console.error("Missing Worker runtime bindings:", missingBindings.join(", "));
    return jsonResponse({
      error: `Worker chưa nhận được cấu hình: ${missingBindings.join(", ")}. Hãy thêm các giá trị này trong Runtime → Production rồi Deploy.`
    }, 503);
  }

  const email = buildEmail(lead);
  let response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.LEADS_FROM_EMAIL,
        to: [env.LEADS_TO_EMAIL],
        subject: "Yêu cầu tư vấn mới — ADA Talent Academy",
        text: email.text,
        html: email.html
      })
    });
  } catch {
    console.error("Lead email provider could not be reached.");
    return jsonResponse({ error: "Chưa gửi được yêu cầu. Vui lòng thử lại sau." }, 502);
  }

  if (!response.ok) {
    console.error(`Lead email provider returned HTTP ${response.status}.`);
    return jsonResponse({ error: "Chưa gửi được yêu cầu. Vui lòng thử lại sau." }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
