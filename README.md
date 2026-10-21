# Model Academy — Landing Page

Landing page giới thiệu khóa học đào tạo người mẫu, viết bằng HTML, CSS và JavaScript thuần.

## Cấu trúc

```text
model-academy/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── functions/
│   └── api/
│       └── leads.js
├── js/
│   ├── main.js
│   └── form.js
└── README.md
```

## Chạy thử

1. Giải nén thư mục.
2. Mở `index.html` bằng trình duyệt để xem giao diện. Để thử gửi form, dùng Wrangler theo hướng dẫn bên dưới.
3. Kiểm tra ở desktop và chế độ mobile trong DevTools.

Trang dùng ảnh minh họa từ Unsplash và font Google Fonts, nên cần kết nối Internet để tải các tài nguyên này.

## Những mục cần thay trước khi sử dụng thật

- Thay tên `MODEL ACADEMY` bằng tên học viện.
- Thay số hotline, Zalo, địa chỉ, thông tin pháp lý và liên kết mạng xã hội.
- Thay ảnh minh họa bằng ảnh do học viện sở hữu hoặc có quyền sử dụng.
- Kiểm tra lại tên khóa học, nội dung, học phí, lịch khai giảng, điều kiện đầu vào và quyền lợi.
- Bổ sung trang/chính sách quyền riêng tư thực tế và cập nhật liên kết từ form.
- Cấu hình secrets của Cloudflare Pages để gửi thông báo đăng ký qua email.

## Tích hợp form

Form gửi dữ liệu tới `/api/leads`, được xử lý bởi Cloudflare Pages Function (Workers runtime). Backend kiểm tra dữ liệu rồi gửi email thông báo tuyển sinh qua Resend. Form không gửi email xác nhận cho người đăng ký vì hiện chưa thu thập email.

Form yêu cầu họ tên, số điện thoại, khóa học quan tâm và xác nhận đồng ý liên hệ. Mục tiêu học và thời gian liên hệ là tùy chọn. Trước khi chạy thật, hãy bổ sung liên kết đến chính sách quyền riêng tư thực tế của học viện.

### Cấu hình và deploy

1. Tạo tài khoản Cloudflare và một dự án **Workers & Pages → Pages**, kết nối repository này. Đặt build command trống và build output directory là `.` (thư mục gốc).
2. Tạo tài khoản Resend, xác minh domain gửi email, rồi tạo API key. Địa chỉ gửi (`LEADS_FROM_EMAIL`) phải thuộc domain đã xác minh.
3. Trong Pages project, vào **Settings → Variables and Secrets** và cấu hình:
   - `RESEND_API_KEY` — lưu dưới dạng secret, không đưa vào mã nguồn.
   - `LEADS_TO_EMAIL` — địa chỉ tuyển sinh nhận thông báo.
   - `LEADS_FROM_EMAIL` — địa chỉ gửi thuộc domain đã xác minh trên Resend.
4. Deploy Pages. Endpoint `/api/leads` sẽ được deploy cùng trang; gửi form hợp lệ sẽ gửi email đến `LEADS_TO_EMAIL`.
5. Để chạy thử local, cài Wrangler rồi chạy `npx wrangler pages dev .`. Tạo file `.dev.vars` ở thư mục gốc với ba giá trị trên; file này đã được Git ignore. Không commit hoặc chia sẻ các secret.

Ví dụ `.dev.vars` (thay bằng giá trị của riêng học viện; không dùng cú pháp này để lưu secret vào Git):

```js
RESEND_API_KEY=re_...
LEADS_TO_EMAIL=tuyensinh@example.com
LEADS_FROM_EMAIL="Model Academy <no-reply@example.com>"
```

Gói miễn phí và giới hạn của Cloudflare/Resend có thể thay đổi; kiểm tra bảng giá của nhà cung cấp trước khi triển khai. Backend hiện gửi email thông báo, chưa lưu lead vào database/CRM và chưa tích hợp CAPTCHA/rate limit. Trước khi quảng bá công khai, nên bật Cloudflare Turnstile hoặc quy tắc giới hạn request để giảm spam. Hãy chỉ báo thành công cho người dùng khi dịch vụ email chấp nhận gửi.

Không đặt API key bí mật trong JavaScript frontend.

## Ghi chú

Chạy `index.html` bằng cách mở trực tiếp file không cung cấp API backend; hãy dùng `wrangler pages dev .` để kiểm thử toàn bộ form. Dự án chưa có database, CRM, Google Sheets hay analytics.
