import { sendLead } from "./leads.js";

const allowedOrigins = new Set([
  "https://adaacademy.tech",
  "https://www.adaacademy.tech"
]);

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (allowedOrigins.has(origin)) return true;
  if (origin.endsWith(".vercel.app")) return true;
  if (
    origin === "http://localhost" ||
    origin === "http://127.0.0.1" ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:")
  ) {
    return true;
  }
  return false;
}

function jsonResponse(body, status, headers = {}) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers }
  });
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin"
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (!origin || !isAllowedOrigin(origin)) {
      return jsonResponse({ error: "Nguồn gửi yêu cầu không hợp lệ." }, 403);
    }

    const headers = corsHeaders(origin);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (new URL(request.url).pathname !== "/api/leads") {
      return jsonResponse({ error: "Không tìm thấy đường dẫn." }, 404, headers);
    }

    if (request.method !== "POST") {
      return jsonResponse(
        { error: "Phương thức không được hỗ trợ." },
        405,
        { ...headers, Allow: "POST, OPTIONS" }
      );
    }

    const response = await sendLead(request, env);
    const responseHeaders = new Headers(response.headers);
    for (const [name, value] of Object.entries(headers)) {
      responseHeaders.set(name, value);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  }
};
