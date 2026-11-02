/**
 * HƯỚNG DẪN CÀI ĐẶT TRÊN GOOGLE SHEET:
 * 1. Mở file Google Sheet trên tài khoản Gmail của bạn.
 * 2. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. Xóa hết code mặc định trong file Code.gs và dán toàn bộ đoạn code bên dưới vào.
 * 4. Bấm biểu tượng Đĩa mềm (Ctrl + S) để Lưu.
 * 5. Bấm nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * 6. Ở mục "Chọn loại" (hình bánh răng) -> Chọn "Ứng dụng web" (Web app):
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)  <-- RẤT QUAN TRỌNG!
 * 7. Bấm "Triển khai" (Deploy), cấp quyền truy cập (Authorize access -> Advanced -> Go to project),
 *    sau đó Copy đường dẫn "URL ứng dụng web" (có dạng https://script.google.com/macros/s/.../exec).
 * 8. Dán URL đó vào biến môi trường `GOOGLE_SHEET_WEBHOOK_URL` trên Cloudflare Worker.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Nếu trang tính đang trống (chưa có tiêu đề cột), tự động tạo dòng tiêu đề ở hàng 1
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian đăng ký",
        "Họ và tên",
        "Số điện thoại",
        "Chương trình quan tâm",
        "Mục tiêu / Nhu cầu học tập",
        "Thời gian liên hệ",
        "Nguồn"
      ]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
    }

    var rawData = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);

    sheet.appendRow([
      data.submitted_at || new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      data.name || "",
      data.phone || "",
      data.course_name || data.course_code || "",
      data.learning_goal || "Chưa cung cấp",
      data.contact_time || "Bất kỳ thời gian phù hợp",
      data.source || "ADA Talent Academy Landing Page"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

