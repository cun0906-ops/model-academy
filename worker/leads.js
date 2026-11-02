const allowedCourses = new Set([
  "kol_koc",
  "branding_model",
  "personal_image",
  "kol_branding",
  "model_image",
  "undetermined",
  "skills",
  "foundation",
  "unknown"
]);

const courseNames = {
  kol_koc: "KOL/KOC",
  branding_model: "Personal Branding / Model",
  personal_image: "Personal Image",
  kol_branding: "KOL/KOC & Personal Branding",
  model_image: "Model & Personal Image",
  undetermined: "Chưa xác định (Cần tư vấn thêm)",
  skills: "KOL/KOC",
  foundation: "Personal Image",
  unknown: "Chưa xác định"
};

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxQOQeImY9CGFEhkbdSl6aNz8SixReRXwHjMKwnj3j2GQPLt8SWQF6vJX5w60BNdMnBRA/exec";

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

function formatVietnamTime(date = new Date()) {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(date);
  } catch {
    return date.toISOString();
  }
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

function buildEmail(lead, submittedAtVN) {
  const goalDisplay = lead.learningGoal || "Chưa cung cấp";
  const fields = [
    ["Họ và tên", lead.name],
    ["Số điện thoại", lead.phone],
    ["Khóa học quan tâm", courseNames[lead.course] || lead.course],
    ["Mục tiêu học", goalDisplay],
    ["Thời gian liên hệ", contactTimeNames[lead.contactTime] || "Bất kỳ thời gian phù hợp"],
    ["Thời gian gửi (VN)", submittedAtVN]
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = fields
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("");

  return { text, html: `<h1>Yêu cầu tư vấn mới — ADA Talent Academy</h1>${html}` };
}

async function sendEmailViaResend(lead, submittedAtVN, env) {
  const email = buildEmail(lead, submittedAtVN);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.LEADS_FROM_EMAIL,
      to: [env.LEADS_TO_EMAIL],
      subject: `Yêu cầu tư vấn mới: ${lead.name} (${lead.phone}) — ADA Talent Academy`,
      text: email.text,
      html: email.html
    })
  });

  if (!response.ok) {
    throw new Error(`Resend HTTP ${response.status}`);
  }
  return true;
}

async function pushLeadToGoogleSheet(lead, submittedAtVN, env) {
  const sheetWebhookUrl = (env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL).trim();
  if (!sheetWebhookUrl) return false;

  const sheetPayload = {
    submitted_at: submittedAtVN,
    name: lead.name,
    phone: `'${lead.phone}`, // Giữ số 0 ở đầu khi đẩy vào Google Sheet
    course_code: lead.course,
    course_name: courseNames[lead.course] || lead.course,
    learning_goal: lead.learningGoal || "Chưa cung cấp",
    contact_time: contactTimeNames[lead.contactTime] || "Bất kỳ thời gian phù hợp",
    source: "ADA Talent Academy Landing Page"
  };

  const response = await fetch(sheetWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sheetPayload),
    redirect: "follow"
  });

  if (!response.ok) {
    throw new Error(`Google Sheet Webhook HTTP ${response.status}`);
  }
  return true;
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

  const hasResendConfig = Boolean(
    env.RESEND_API_KEY && env.LEADS_TO_EMAIL && env.LEADS_FROM_EMAIL
  );
  const hasSheetConfig = Boolean((env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL).trim());

  if (!hasResendConfig && !hasSheetConfig) {
    const missingBindings = [
      "RESEND_API_KEY",
      "LEADS_TO_EMAIL",
      "LEADS_FROM_EMAIL",
      "GOOGLE_SHEET_WEBHOOK_URL"
    ].filter((name) => !env[name]);
    console.error("Missing Worker runtime bindings:", missingBindings.join(", "));
    return jsonResponse(
      {
        error: `Worker chưa nhận được cấu hình: ${missingBindings.join(", ")}. Hãy thêm các giá trị này trong Runtime → Production rồi Deploy.`
      },
      503
    );
  }

  const submittedAtVN = formatVietnamTime(new Date());
  const tasks = [];

  if (hasResendConfig) {
    tasks.push(
      sendEmailViaResend(lead, submittedAtVN, env).catch((err) => {
        console.error("Lead email provider error:", err.message || err);
        throw err;
      })
    );
  }

  if (hasSheetConfig) {
    tasks.push(
      pushLeadToGoogleSheet(lead, submittedAtVN, env).catch((err) => {
        console.error("Google Sheet webhook error:", err.message || err);
        throw err;
      })
    );
  }

  const results = await Promise.allSettled(tasks);
  const anySucceeded = results.some((r) => r.status === "fulfilled");

  if (!anySucceeded) {
    return jsonResponse({ error: "Chưa gửi được yêu cầu. Vui lòng thử lại sau." }, 502);
  }

  return jsonResponse({ ok: true, sheet_synced: hasSheetConfig }, 200);
}
