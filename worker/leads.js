const allowedCourses = new Set(["foundation", "skills", "professional", "unknown"]);
const allowedGoals = new Set(["", "catwalk", "photoshoot", "career", "explore"]);
const allowedContactTimes = new Set(["any", "morning", "afternoon", "evening"]);

const courseNames = {
  foundation: "Model Foundation — Nền tảng",
  skills: "Model Skills — Kỹ năng",
  professional: "Professional Model — Nâng cao",
  unknown: "Chưa biết, cần tư vấn"
};

const goalNames = {
  "": "Chưa cung cấp",
  catwalk: "Rèn kỹ năng catwalk",
  photoshoot: "Tạo dáng và làm việc trước ống kính",
  career: "Theo đuổi nghề người mẫu",
  explore: "Tìm hiểu và khám phá thêm"
};

const contactTimeNames = {
  any: "Bất kỳ thời gian phù hợp",
  morning: "Buổi sáng",
  afternoon: "Buổi chiều",
  evening: "Buổi tối"
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
  const learningGoal = value.learning_goal ?? "";
  const contactTime = value.contact_time;

  if (name.length < 2 || name.length > 120) return null;
  if (!/^(?:\+84|84|0)\d{8,10}$/.test(normalizedPhone)) return null;
  if (!allowedCourses.has(course)) return null;
  if (typeof learningGoal !== "string" || !allowedGoals.has(learningGoal)) return null;
  if (!allowedContactTimes.has(contactTime)) return null;
  if (value.consent !== true) return null;

  return { name, phone, course, learningGoal, contactTime };
}

function buildEmail(lead) {
  const submittedAt = new Date().toISOString();
  const fields = [
    ["Họ và tên", lead.name],
    ["Số điện thoại", lead.phone],
    ["Khóa học quan tâm", courseNames[lead.course]],
    ["Mục tiêu học", goalNames[lead.learningGoal]],
    ["Thời gian liên hệ", contactTimeNames[lead.contactTime]],
    ["Thời gian gửi", submittedAt]
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = fields
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("");

  return { text, html: `<h1>Yêu cầu tư vấn mới</h1>${html}` };
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

  if (!env.RESEND_API_KEY || !env.LEADS_TO_EMAIL || !env.LEADS_FROM_EMAIL) {
    console.error("Lead email service is not configured.");
    return jsonResponse({ error: "Hệ thống chưa được cấu hình nhận đăng ký. Vui lòng thử lại sau." }, 503);
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
        subject: "Có yêu cầu tư vấn mới — Model Academy",
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
