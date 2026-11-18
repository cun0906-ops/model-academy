/* ==========================================================================
   CONTENT.JS - Dữ liệu & Xử lý nội dung chi tiết các chương trình đào tạo
   ADA Talent Academy
   ========================================================================== */
(() => {
  "use strict";

  // Dữ liệu nội dung chi tiết 4 chương trình đào tạo
  const ROADMAP_DATA = {
    "program-1": {
      "id": "program-1",
      "badge": "CHƯƠNG TRÌNH 01",
      "formatBadge": "5 Buổi • Đào tạo Online",
      "title": "KOL/KOC STARTER ONLINE",
      "subtitle": "CHƯƠNG TRÌNH ĐÀO TẠO CHI TIẾT – BẢN GIẢNG DẠY & VẬN HÀNH",
      "tagline": "Bắt đầu từ con số 0 - Khám phá thế mạnh - Xây dựng hình ảnh - Tạo video đầu tiên",
      "priceOld": "2.000.000đ",
      "priceNew": "1.500.000đ",
      "saveText": "Tiết kiệm 25% (500.000đ)",
      "courseCode": "kol_starter",
      "sessions": [
        {
          "num": "BUỔI 01",
          "name": "KHÁM PHÁ BẢN THÂN – ĐỊNH HƯỚNG HÌNH ẢNH KOL/KOC",
          "duration": "120 phút",
          "format": "Online",
          "meta": "120 phút • Online",
          "objective": "Hiểu lĩnh vực KOL/KOC, nhận diện thế mạnh và tìm hướng nội dung phù hợp.",
          "teachingPoints": [
            "1. Làm quen với nghề KOL/KOC: Phân biệt KOL, KOC và nhà sáng tạo nội dung, các hình thức hoạt động phổ biến và những cơ hội trong nghề khi làm thật, làm đều.",
            "2. Khám phá bản thân: Trả lời 5 câu hỏi về kiến thức, trải nghiệm, sở thích và phong cách giao tiếp để tìm ra thế mạnh có thể biến thành nội dung.",
            "3. Định hướng hình ảnh cá nhân: Chọn chủ đề ở giao điểm giữa điều mình biết, điều mình thích và điều người xem cần; xác định người xem và 3 từ khóa hình ảnh cá nhân."
          ],
          "output": "Bản định hướng cá nhân và tối thiểu 03 ý tưởng nội dung."
        },
        {
          "num": "BUỔI 02",
          "name": "XÂY DỰNG THƯƠNG HIỆU CÁ NHÂN – ĐỊNH HÌNH KÊNH KOL/KOC",
          "duration": "120 phút",
          "format": "Online",
          "meta": "120 phút • Online",
          "objective": "Xây dựng hình ảnh cá nhân nhất quán và hình dung cấu trúc một kênh nội dung cơ bản.",
          "teachingPoints": [
            "1. Tư duy thương hiệu cá nhân: Hiểu thương hiệu cá nhân là gì, xây câu định vị riêng và chọn phong cách thể hiện đúng với con người thật để duy trì lâu dài.",
            "2. Xây dựng nền tảng kênh: Chọn nền tảng phù hợp và tối ưu tên kênh, ảnh đại diện, phần giới thiệu sao cho tất cả cùng truyền tải một thông điệp.",
            "3. Xây dựng nhóm nội dung: Kết hợp các nhóm nội dung kiến thức, đời sống, review và giải trí theo tỷ lệ hợp lý để kênh vừa có giá trị vừa gần gũi."
          ],
          "output": "Câu định vị cá nhân, kênh có tên, phần giới thiệu và 3 nhóm nội dung."
        },
        {
          "num": "BUỔI 03",
          "name": "TƯ DUY SÁNG TẠO NỘI DUNG – XÂY DỰNG KỊCH BẢN VIDEO",
          "duration": "120 phút",
          "format": "Online",
          "meta": "120 phút • Online",
          "objective": "Tìm ý tưởng, phát triển nội dung và viết kịch bản video ngắn phù hợp định hướng cá nhân.",
          "teachingPoints": [
            "1. Tư duy sáng tạo nội dung: Hiểu người xem cần gì, tìm ý tưởng từ đời sống và bình luận, học cấu trúc từ kênh tham khảo và phát triển một ý tưởng thành nhiều video.",
            "2. Các dạng nội dung phổ biến: Làm quen các dạng video kiến thức, kể chuyện, review, giải trí và giới thiệu sản phẩm để chọn cách kể phù hợp.",
            "3. Kỹ thuật xây dựng kịch bản: Viết kịch bản 30–60 giây theo cấu trúc mở đầu thu hút, một thông điệp chính và lời kêu gọi hành động rõ ràng."
          ],
          "output": "Tối thiểu 10 ý tưởng và 01 kịch bản video hoàn chỉnh."
        },
        {
          "num": "BUỔI 04",
          "name": "KỸ NĂNG TRƯỚC ỐNG KÍNH – THỰC HÀNH QUAY VIDEO",
          "duration": "120 phút",
          "format": "Online",
          "meta": "120 phút • Online",
          "objective": "Tăng tự tin, cải thiện kỹ năng trình bày và biết tự quay video bằng điện thoại.",
          "teachingPoints": [
            "1. Tâm lý trước máy quay: Vượt qua cảm giác ngại camera bằng cách nhìn ống kính, tưởng tượng đang nói với một người bạn, giữ tư thế thoải mái và cảm xúc tự nhiên.",
            "2. Kỹ năng trình bày: Luyện giọng nói, tốc độ, cử chỉ; nói theo ý chính thay vì học thuộc, quay từng đoạn ngắn để dễ quay lại và dễ dựng.",
            "3. Quay bằng điện thoại: Thiết lập khung hình dọc 9:16, bố cục, ánh sáng, âm thanh, phông nền đúng cách và tránh các lỗi thường gặp khi quay."
          ],
          "output": "Đoạn giới thiệu bản thân 30 giây và bản quay đầu tiên theo kịch bản."
        },
        {
          "num": "BUỔI 05",
          "name": "HOÀN THIỆN VIDEO – ĐĂNG TẢI VÀ ĐỊNH HƯỚNG PHÁT TRIỂN",
          "duration": "120 phút",
          "format": "Online",
          "meta": "120 phút • Online",
          "objective": "Hoàn thiện video đầu tiên, nắm các bước đăng tải cơ bản và định hướng phát triển sau khóa học.",
          "teachingPoints": [
            "1. Hoàn thiện video: Dựng video bằng CapCut, gồm cắt ghép đoạn quay, thêm chữ tiêu đề, phụ đề, nhạc nền và kiểm tra tổng thể trước khi xuất.",
            "2. Đăng tải nội dung: Chuẩn bị tiêu đề, mô tả, ảnh bìa, hashtag; tuân thủ bản quyền, minh bạch khi hợp tác và tương tác với người xem sau khi đăng.",
            "3. Định hướng phát triển tiếp theo: Xác định kỹ năng cần luyện tiếp, duy trì thói quen sáng tạo và chọn hướng phát triển phù hợp với bản thân."
          ],
          "output": "01 video hoàn thiện, có chữ/phụ đề, hình và tiếng rõ."
        }
      ]
    },
    "program-2": {
      "id": "program-2",
      "badge": "CHƯƠNG TRÌNH 02",
      "formatBadge": "3 Buổi • Đào tạo Offline",
      "title": "KOL/KOC MODEL",
      "subtitle": "CHƯƠNG TRÌNH TÀI TRỢ PHÁT TRIỂN TÀI NĂNG",
      "tagline": "KHỞI ĐẦU HÀNH TRÌNH KOL/KOC & MODEL CHUYÊN NGHIỆP",
      "priceOld": "5.000.000đ",
      "priceNew": "2.000.000đ",
      "saveText": "Tiết kiệm 60% (3 triệu)",
      "courseCode": "kol_model",
      "sessions": [
        {
          "num": "BUỔI 01",
          "name": "KOL/KOC: KHÁM PHÁ BẢN THÂN, ĐỊNH HƯỚNG HÌNH ẢNH",
          "duration": "120 phút",
          "format": "Offline",
          "meta": "120 phút • Offline",
          "objective": "Hiểu vai trò KOL/KOC, nhận diện điểm mạnh cá nhân và chọn hướng hình ảnh phù hợp để bắt đầu.",
          "teachingPoints": [
            "1. Làm quen nghề KOL/KOC: Phân biệt KOL, KOC và nhà sáng tạo nội dung, cùng các hình thức hoạt động phổ biến.",
            "2. Khám phá bản thân: Tìm ra sở thích, kiến thức, trải nghiệm và cá tính có thể chuyển hóa thành nội dung.",
            "3. Định hướng hình ảnh cá nhân: Chọn nhóm chủ đề, phong cách thể hiện, khán giả mục tiêu và thông điệp chính, qua phân tích các kênh KOL/KOC thực tế."
          ],
          "output": "Định hướng hình ảnh ban đầu và tối thiểu 03 ý tưởng nội dung."
        },
        {
          "num": "BUỔI 02",
          "name": "KOL/KOC: XÂY DỰNG NỘI DUNG, THỰC HÀNH TRƯỚC ỐNG KÍNH",
          "duration": "120 phút",
          "format": "Offline",
          "meta": "120 phút • Offline",
          "objective": "Biết cách hình thành ý tưởng, xây dựng nội dung ngắn và bước đầu tự tin trước máy quay.",
          "teachingPoints": [
            "1. Tư duy nội dung: Xác định nội dung dành cho ai, giải quyết nhu cầu gì; tìm và phát triển ý tưởng từ trải nghiệm, sản phẩm, dịch vụ.",
            "2. Cấu trúc video ngắn: Mở đầu thu hút, nội dung chính rõ ràng và lời kêu gọi hành động phù hợp.",
            "3. Kỹ năng trước ống kính: Luyện giọng nói, ánh mắt, biểu cảm, ngôn ngữ cơ thể; làm quen khung hình, góc quay và ghi hình bằng điện thoại."
          ],
          "output": "01 kịch bản video ngắn và bản ghi hình thực hành có góp ý từ giảng viên."
        },
        {
          "num": "BUỔI 03",
          "name": "MODEL: NHẬP MÔN MODEL, TẠO DÁNG VÀ BIỂU CẢM",
          "duration": "120 phút",
          "format": "Offline",
          "meta": "120 phút • Offline",
          "objective": "Làm quen công việc Model, hiểu nguyên tắc cơ bản khi đứng trước máy ảnh và thực hành tạo dáng.",
          "teachingPoints": [
            "1. Tổng quan nghề Model: Người mẫu ảnh, người mẫu thương mại, người mẫu trình diễn và các hướng hoạt động phổ biến.",
            "2. Tư thế và tạo dáng: Cách đứng, di chuyển, kiểm soát hình thể; nguyên tắc về góc mặt, hướng cơ thể, tay, chân và đường nét tổng thể.",
            "3. Biểu cảm và thần thái: Sử dụng ánh mắt, biểu cảm gương mặt và thay đổi thần thái theo từng concept, thực hành trực tiếp cùng giảng viên."
          ],
          "output": "Nắm nguyên tắc tạo dáng, biểu cảm và có trải nghiệm thực hành Model cơ bản."
        }
      ]
    },
    "program-3": {
      "id": "program-3",
      "badge": "CHƯƠNG TRÌNH 03",
      "formatBadge": "12 Buổi • Đào tạo Offline",
      "title": "MODEL PROFESSIONAL",
      "subtitle": "LỘ TRÌNH ĐÀO TẠO CHI TIẾT 12 BUỔI – TÀI LIỆU GIẢNG VIÊN",
      "tagline": "Tạo dáng - Biểu cảm - Catwalk - Model thương mại - Portfolio & Casting",
      "priceOld": "20.000.000đ",
      "priceNew": "6.000.000đ",
      "saveText": "Tiết kiệm 70% (14 triệu)",
      "courseCode": "model_pro",
      "sessions": [
        {
          "num": "BUỔI 01",
          "name": "ĐỊNH HƯỚNG NGHỀ MODEL VÀ TÁC PHONG CHUYÊN NGHIỆP",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Tìm hiểu các nhánh nghề Model, xác định thế mạnh và phong cách phù hợp, học tác phong làm việc với ekip và cách đọc brief. Chụp bộ ảnh đầu vào để so sánh tiến bộ cuối khóa.",
          "output": "Bản định hướng Model và checklist tác phong."
        },
        {
          "num": "BUỔI 02",
          "name": "KIỂM SOÁT HÌNH THỂ, TƯ THẾ VÀ CHUYỂN ĐỘNG",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Luyện tư thế đứng, ngồi, xoay người, di chuyển; kiểm soát vai, cổ, tay, chân và sửa các lỗi tư thế thường gặp.",
          "output": "Thực hiện được bộ tư thế nền tảng."
        },
        {
          "num": "BUỔI 03",
          "name": "POSING MASTER: KỸ THUẬT TẠO DÁNG",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Nguyên tắc tạo dáng toàn thân, bán thân, cận mặt; chuyển pose mượt và tương tác với đạo cụ, thực hành chụp cùng photographer.",
          "output": "Bộ ảnh tạo dáng và “ngân hàng dáng” phù hợp với bản thân."
        },
        {
          "num": "BUỔI 04",
          "name": "FACIAL EXPRESSION: BIỂU CẢM VÀ THẦN THÁI",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Điều khiển ánh mắt, nụ cười, cơ mặt và thể hiện 5 phong cách biểu cảm theo từng concept.",
          "output": "Bộ biểu cảm cơ bản theo các concept."
        },
        {
          "num": "BUỔI 05",
          "name": "RUNWAY FOUNDATION: KỸ THUẬT TRÌNH DIỄN",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Nền tảng catwalk: nhịp bước, điểm nhìn, thăng bằng, điểm dừng, pose cuối sàn và quay đầu theo nhạc.",
          "output": "Một lượt catwalk cơ bản theo nhạc."
        },
        {
          "num": "BUỔI 06",
          "name": "RUNWAY PERFORMANCE: TRÌNH DIỄN NÂNG CAO",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Điều chỉnh bước đi theo trang phục và phong cách, làm chủ sân khấu, trình diễn theo nhóm và xử lý tình huống.",
          "output": "Một phần trình diễn hoàn chỉnh."
        },
        {
          "num": "BUỔI 07",
          "name": "COMMERCIAL MODEL: NGƯỜI MẪU THƯƠNG MẠI",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Tư duy ảnh quảng cáo, tạo dáng với thời trang, mỹ phẩm, phụ kiện, luôn giữ sản phẩm là trung tâm, chụp theo brief cùng photographer.",
          "output": "Bộ ảnh thương mại theo brief."
        },
        {
          "num": "BUỔI 08",
          "name": "PHOTOSHOOT SKILLS: LÀM VIỆC TRONG BUỔI CHỤP",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Quy trình một buổi chụp chuyên nghiệp, phối hợp với photographer, stylist và tự “chạy pose” khi không có chỉ dẫn.",
          "output": "Hoàn thành một buổi chụp mô phỏng theo quy trình."
        },
        {
          "num": "BUỔI 09",
          "name": "FASHION & STYLING: TRANG PHỤC VÀ HÌNH ẢNH",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Phối trang phục, phụ kiện, tóc, makeup theo concept và biến đổi nhiều phong cách với cùng một trang phục.",
          "output": "Bộ gợi ý hình ảnh cá nhân."
        },
        {
          "num": "BUỔI 10",
          "name": "CASTING & AUDITION: THỬ VAI VÀ TUYỂN CHỌN",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Chuẩn bị hồ sơ casting, giới thiệu bản thân 30 giây, thể hiện theo chỉ dẫn và nhận diện các buổi casting không minh bạch.",
          "output": "Hồ sơ casting cơ bản và phần thực hành audition."
        },
        {
          "num": "BUỔI 11",
          "name": "PORTFOLIO: XÂY DỰNG HỒ SƠ MODEL",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Chọn lọc ảnh từ các buổi thực hành, xây dựng portfolio và comp card chuyên nghiệp.",
          "output": "Portfolio Model bản cơ bản."
        },
        {
          "num": "BUỔI 12",
          "name": "FINAL SHOWCASE: TRÌNH DIỄN TỐT NGHIỆP",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Trình diễn tổng hợp catwalk, tạo dáng, chụp ảnh cuối khóa; so sánh với ảnh đầu vào và nhận đánh giá từ giảng viên.",
          "output": "Phần trình diễn tốt nghiệp và nhận xét cá nhân."
        }
      ]
    },
    "program-4": {
      "id": "program-4",
      "badge": "CHƯƠNG TRÌNH 04",
      "formatBadge": "12 Buổi • Đào tạo 4 Online & 8 Offline",
      "title": "KOL/KOC ADVANCED",
      "subtitle": "LỘ TRÌNH ĐÀO TẠO CHI TIẾT 12 BUỔI – TÀI LIỆU GIẢNG VIÊN",
      "tagline": "Xây kênh - Sản xuất nội dung - Livestream - Hợp tác nhãn hàng",
      "priceOld": "20.000.000đ",
      "priceNew": "6.000.000đ",
      "saveText": "Tiết kiệm 70% (14 triệu)",
      "courseCode": "kol_advanced",
      "sessions": [
        {
          "num": "BUỔI 01",
          "name": "ĐỊNH VỊ CÁ NHÂN VÀ CHIẾN LƯỢC KÊNH (Online)",
          "duration": "150 phút",
          "format": "Online",
          "meta": "150 phút • Online",
          "content": "Chọn mô hình KOL/KOC theo mục tiêu, phân tích thế mạnh cá nhân, xác định khán giả, chọn ngách và xây dựng câu định vị riêng.",
          "output": "Bản định vị cá nhân, khán giả mục tiêu và định hướng kênh."
        },
        {
          "num": "BUỔI 02",
          "name": "THIẾT KẾ KÊNH VÀ THƯƠNG HIỆU CÁ NHÂN",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Tối ưu tên kênh, ảnh đại diện, phần giới thiệu, video ghim; xây trụ cột nội dung và phong cách nhận diện nhất quán.",
          "output": "Kênh được tối ưu và bộ nhận diện nội dung cơ bản."
        },
        {
          "num": "BUỔI 03",
          "name": "NGHIÊN CỨU KHÁN GIẢ VÀ PHÁT TRIỂN Ý TƯỞNG (Online)",
          "duration": "150 phút",
          "format": "Online",
          "meta": "150 phút • Online",
          "content": "Tìm insight từ bình luận, tìm kiếm, cộng đồng; phân tích đối thủ, xu hướng và xây kho ý tưởng có hệ thống.",
          "output": "Kho 30 ý tưởng được phân nhóm."
        },
        {
          "num": "BUỔI 04",
          "name": "KỊCH BẢN VIDEO NGẮN NÂNG CAO",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Viết kịch bản giữ chân người xem với 7 kiểu mở đầu, nhiều định dạng nội dung và hướng dẫn sản xuất rõ ràng.",
          "output": "03 kịch bản hoàn chỉnh."
        },
        {
          "num": "BUỔI 05",
          "name": "BIỂU ĐẠT TRƯỚC ỐNG KÍNH VÀ DẪN DẮT NỘI DUNG",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Luyện giọng nói, ánh mắt, ngôn ngữ cơ thể và phong cách dẫn dắt tự nhiên khi review, chia sẻ, giới thiệu sản phẩm.",
          "output": "01 video trình bày trước ống kính đã chỉnh sửa."
        },
        {
          "num": "BUỔI 06",
          "name": "QUAY DỰNG VÀ QUY TRÌNH SẢN XUẤT NỘI DUNG",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Bố cục, góc máy, ánh sáng, âm thanh, quay sản phẩm và dựng video; quy trình quay 4–6 video trong một buổi.",
          "output": "01 video hoàn chỉnh theo quy trình sản xuất."
        },
        {
          "num": "BUỔI 07",
          "name": "CHIẾN LƯỢC NỘI DUNG ĐA NỀN TẢNG (Online)",
          "duration": "150 phút",
          "format": "Online",
          "meta": "150 phút • Online",
          "content": "Điều chỉnh nội dung theo TikTok, Facebook, Instagram, YouTube Shorts; tái sử dụng một ý tưởng cho nhiều định dạng.",
          "output": "Kế hoạch phân phối nội dung đa nền tảng."
        },
        {
          "num": "BUỔI 08",
          "name": "PHÂN TÍCH DỮ LIỆU VÀ TỐI ƯU HIỆU QUẢ (Online)",
          "duration": "150 phút",
          "format": "Online",
          "meta": "150 phút • Online",
          "content": "Đọc các chỉ số quan trọng, hiểu vì sao video hiệu quả hay chưa hiệu quả và thử nghiệm để cải thiện.",
          "output": "Báo cáo phân tích và danh sách thử nghiệm."
        },
        {
          "num": "BUỔI 09",
          "name": "KOC REVIEW VÀ NỘI DUNG THƯƠNG MẠI",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Cấu trúc video review thuyết phục, quay sản phẩm chuyên nghiệp, làm nội dung thương mại trung thực, minh bạch.",
          "output": "01 video review sản phẩm."
        },
        {
          "num": "BUỔI 10",
          "name": "LIVESTREAM VÀ TƯƠNG TÁC CỘNG ĐỒNG",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Chuẩn bị và dẫn dắt một phiên livestream, giữ tương tác, xử lý tình huống khó và tư vấn bán hàng trung thực.",
          "output": "Kịch bản livestream và phần thực hành livestream mô phỏng."
        },
        {
          "num": "BUỔI 11",
          "name": "HỢP TÁC NHÃN HÀNG VÀ PHÁT TRIỂN NGHỀ NGHIỆP",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Các hình thức hợp tác thương mại, xây dựng media kit, nhận brief và thỏa thuận làm việc với nhãn hàng.",
          "output": "Media kit cơ bản và bộ câu hỏi nhận brief."
        },
        {
          "num": "BUỔI 12",
          "name": "DỰ ÁN TỐT NGHIỆP VÀ KẾ HOẠCH 30 NGÀY",
          "duration": "150 phút",
          "format": "Offline",
          "meta": "150 phút • Offline",
          "content": "Tổng hợp kỹ năng thành một dự án kênh hoàn chỉnh, trình bày chiến lược và nhận phản biện từ giảng viên.",
          "output": "Dự án kênh mẫu và kế hoạch phát triển 30 ngày."
        }
      ]
    }
  };

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Tạo HTML cho từng buổi học trong lộ trình chi tiết
   */
  function renderSessionCard(s) {
    // 1. Khối nội dung đào tạo trọng tâm
    let pointsHtml = "";
    if (Array.isArray(s.teachingPoints) && s.teachingPoints.length > 0) {
      const itemsHtml = s.teachingPoints
        .map((p) => {
          const match = p.match(/^(\d+\.\s*[^:]+:?)(.*)$/);
          if (match) {
            return `<li class="session-point-item"><strong class="point-num-title">${escapeHtml(match[1])}</strong>${escapeHtml(match[2])}</li>`;
          }
          return `<li class="session-point-item">${escapeHtml(p)}</li>`;
        })
        .join("");

      pointsHtml = `
        <div class="roadmap-session-col session-col-points">
          <h5 class="session-block-label">Nội dung đào tạo trọng tâm:</h5>
          <ul class="session-points-list">
            ${itemsHtml}
          </ul>
        </div>
      `;
    } else if (s.content) {
      pointsHtml = `
        <div class="roadmap-session-col session-col-points">
          <h5 class="session-block-label">Nội dung đào tạo trọng tâm:</h5>
          <p class="session-desc-text">${escapeHtml(s.content)}</p>
        </div>
      `;
    }

    // 2. Khối mục tiêu buổi học (nếu có)
    let objectiveHtml = "";
    if (s.objective) {
      objectiveHtml = `
        <div class="roadmap-session-col session-col-objective">
          <h5 class="session-block-label">Mục tiêu:</h5>
          <p class="session-objective-text">${escapeHtml(s.objective)}</p>
        </div>
      `;
    }

    const hasObjective = Boolean(objectiveHtml);
    const mainRowHtml = `
      <div class="roadmap-session-main-row ${!hasObjective ? 'is-single-col' : ''}">
        ${objectiveHtml}
        ${pointsHtml}
      </div>
    `;

    // 3. Thực hành & Kết quả đầu ra (nếu có)
    let outputsHtml = "";
    if (s.practice || s.output) {
      outputsHtml = `
        <div class="session-results-grid">
          ${s.practice ? `
            <div class="session-result-item">
              <span class="result-label">Thực hành:</span>
              <span class="result-text">${escapeHtml(s.practice)}</span>
            </div>
          ` : ""}
          ${s.output ? `
            <div class="session-result-item">
              <span class="result-label">Kết quả:</span>
              <span class="result-text">${escapeHtml(s.output)}</span>
            </div>
          ` : ""}
        </div>
      `;
    }

    return `
      <article class="roadmap-session-card">
        <div class="roadmap-session-head">
          <div class="session-head-left">
            <span class="session-num">${escapeHtml(s.num)}</span>
            <h4 class="session-title">${escapeHtml(s.name)}</h4>
          </div>
          <div class="session-head-right">
            <span class="session-meta-chip">${escapeHtml(s.meta || "")}</span>
          </div>
        </div>

        ${mainRowHtml}
        ${outputsHtml}
      </article>
    `;
  }

  /**
   * Khởi tạo và điều khiển Roadmap Detail Modal
   */
  function initRoadmapModal() {
    const modal = document.querySelector("#roadmap-modal");
    if (!modal) return;

    const badgeEl = modal.querySelector("#roadmap-badge");
    const chipEl = modal.querySelector("#roadmap-tagline-chip");
    const titleEl = modal.querySelector("#roadmap-title");
    const descEl = modal.querySelector("#roadmap-desc");
    const listEl = modal.querySelector("#roadmap-sessions-list");
    const priceOldEl = modal.querySelector("#roadmap-footer-old");
    const priceDealEl = modal.querySelector("#roadmap-footer-deal");
    const priceSaveEl = modal.querySelector("#roadmap-footer-save");
    const enrollBtn = modal.querySelector("#roadmap-enroll-btn");
    const tabs = modal.querySelectorAll("[data-roadmap-tab]");
    const courseSelect = document.querySelector("#course");

    let currentProgramId = "program-1";

    function renderProgram(programId) {
      const data = ROADMAP_DATA[programId];
      if (!data) return;
      currentProgramId = programId;

      if (badgeEl) badgeEl.textContent = data.badge;
      if (chipEl) chipEl.textContent = data.formatBadge;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.tagline;
      if (priceOldEl) priceOldEl.textContent = data.priceOld;
      if (priceDealEl) priceDealEl.textContent = data.priceNew;
      if (priceSaveEl) priceSaveEl.textContent = data.saveText;

      if (enrollBtn) {
        enrollBtn.dataset.course = data.courseCode;
      }

      tabs.forEach((tab) => {
        const isActive = tab.dataset.roadmapTab === programId;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
      });

      if (listEl) {
        listEl.innerHTML = data.sessions.map((s) => renderSessionCard(s)).join("");
      }
    }

    function openModal(programId = "program-1") {
      renderProgram(programId);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("roadmap-modal-open");
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("roadmap-modal-open");
    }

    // Chuyển tab chương trình trong popup
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const progId = tab.dataset.roadmapTab;
        if (progId) renderProgram(progId);
      });
    });

    // Nút "Chi tiết lộ trình" trên từng thẻ chương trình Section 06
    document.querySelectorAll("[data-open-roadmap]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const progId = btn.dataset.openRoadmap || "program-1";
        openModal(progId);
      });
    });

    // Đóng popup qua nút đóng & nền mờ
    modal.querySelectorAll("[data-close-roadmap]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
      });
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("roadmap-modal-backdrop")) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });

    // Bấm "Đăng ký khóa học này" trong popup: chọn khóa học trong form và cuộn xuống
    if (enrollBtn) {
      enrollBtn.addEventListener("click", () => {
        const courseCode = enrollBtn.dataset.course;
        if (courseSelect && courseCode) {
          courseSelect.value = courseCode;
        }
        closeModal();
      });
    }
  }

  // Khởi chạy khi DOM sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRoadmapModal);
  } else {
    initRoadmapModal();
  }

  // Xuất biến toàn cục nếu cần truy cập
  window.ROADMAP_DATA = ROADMAP_DATA;
})();
