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
├── worker/
│   ├── index.js
│   └── leads.js
├── wrangler.jsonc
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
- Cấu hình secrets của Cloudflare Worker để gửi thông báo đăng ký qua email.

## Tích hợp form với Vercel và Cloudflare Workers

Website được host trên Vercel. Form gọi Worker API tại `https://model-academy.cun09062.workers.dev/api/leads`; Worker kiểm tra dữ liệu rồi gửi email thông báo tuyển sinh qua Resend. Form không gửi email xác nhận cho người đăng ký vì hiện chưa thu thập email.

Form yêu cầu họ tên, số điện thoại, khóa học quan tâm và xác nhận đồng ý liên hệ. Mục tiêu học và thời gian liên hệ là tùy chọn. Trước khi chạy thật, hãy bổ sung liên kết đến chính sách quyền riêng tư thực tế của học viện.

### Cấu hình và deploy

1. Tạo API key trong Resend, xác minh domain gửi. Địa chỉ `LEADS_FROM_EMAIL` phải thuộc domain đã xác minh.
2. Cài Node.js trên máy có source code rồi deploy Worker từ thư mục dự án bằng `npx wrangler deploy`. Wrangler config trong `wrangler.jsonc` sẽ deploy Worker `model-academy` tại `model-academy.cun09062.workers.dev`.
3. Trong Cloudflare, mở Worker **model-academy → Settings → Variables and Secrets** và thêm:
   - `RESEND_API_KEY` — lưu dưới dạng secret, không đưa vào mã nguồn.
   - `LEADS_TO_EMAIL` — địa chỉ tuyển sinh nhận thông báo.
   - `LEADS_FROM_EMAIL` — địa chỉ gửi thuộc domain đã xác minh.
4. Frontend chỉ cho phép gọi API từ `https://adaacademy.tech` và `https://www.adaacademy.tech`.
5. Deploy website lên Vercel như bình thường; form gọi Worker API độc lập với host website.
6. Để chạy thử Worker local, cài Wrangler rồi chạy `npx wrangler dev`. Tạo file `.dev.vars` ở thư mục gốc với ba giá trị trên; file này đã được Git ignore. Không commit hoặc chia sẻ secrets.

Ví dụ `.dev.vars` (thay bằng giá trị của riêng học viện; không dùng cú pháp này để lưu secret vào Git):

```ini
RESEND_API_KEY=re_...
LEADS_TO_EMAIL=tuyensinh@example.com
LEADS_FROM_EMAIL="Model Academy <no-reply@example.com>"
```

Gói miễn phí và giới hạn của Cloudflare/Resend có thể thay đổi; kiểm tra bảng giá của nhà cung cấp trước khi triển khai. Backend hiện gửi email thông báo, chưa lưu lead vào database/CRM và chưa tích hợp CAPTCHA/rate limit. Trước khi quảng bá công khai, nên bật Cloudflare Turnstile hoặc quy tắc giới hạn request để giảm spam. Hãy chỉ báo thành công cho người dùng khi dịch vụ email chấp nhận gửi.

Không đặt API key bí mật trong JavaScript frontend.

## Ghi chú

Mở `index.html` bằng file trực tiếp/Live Server sẽ không dùng được API trên trình duyệt vì CORS chỉ cho phép domain production. Dự án chưa có database, CRM, Google Sheets hay analytics.
