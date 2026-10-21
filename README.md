# Model Academy — Landing Page

Landing page giới thiệu khóa học đào tạo người mẫu, viết bằng HTML, CSS và JavaScript thuần.

## Cấu trúc

```text
model-academy/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── form.js
└── README.md
```

## Chạy thử

1. Giải nén thư mục.
2. Mở `index.html` bằng trình duyệt, hoặc mở thư mục trong VS Code và chạy bằng extension **Live Server**.
3. Kiểm tra ở desktop và chế độ mobile trong DevTools.

Trang dùng ảnh minh họa từ Unsplash và font Google Fonts, nên cần kết nối Internet để tải các tài nguyên này.

## Những mục cần thay trước khi sử dụng thật

- Thay tên `MODEL ACADEMY` bằng tên học viện.
- Thay số hotline, Zalo, địa chỉ, thông tin pháp lý và liên kết mạng xã hội.
- Thay ảnh minh họa bằng ảnh do học viện sở hữu hoặc có quyền sử dụng.
- Kiểm tra lại tên khóa học, nội dung, học phí, lịch khai giảng, điều kiện đầu vào và quyền lợi.
- Bổ sung trang/chính sách quyền riêng tư thực tế và cập nhật liên kết từ form.
- Cấu hình endpoint nhận lead trong `js/form.js`.

## Tích hợp form

Mặc định form chạy ở **chế độ demo**. Khi gửi form, dữ liệu chỉ được ghi ra console để kiểm thử; website không giả vờ rằng lead đã được lưu hoặc gửi.

Trong `js/form.js`, thay:

```js
const API_ENDPOINT = "";
```

bằng URL API backend của bạn. API nên:
- Chỉ nhận HTTPS ở môi trường production.
- Validate lại dữ liệu ở server.
- Chống spam/rate-limit và xử lý gửi lặp.
- Lưu dữ liệu an toàn, giới hạn quyền truy cập.
- Trả HTTP status phù hợp khi thành công/thất bại.
- Tuân thủ yêu cầu thông báo và đồng ý xử lý dữ liệu cá nhân.

Không đặt API key bí mật trong JavaScript frontend.

## Ghi chú

Đây là bộ mã frontend mẫu, chưa có backend, CRM, Google Sheets, hệ thống quản trị lead hay analytics được kết nối.
