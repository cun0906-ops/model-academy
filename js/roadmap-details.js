const ROADMAP_DATA = {
  "program-1": {
    "badge": "CHƯƠNG TRÌNH 01",
    "title": "KOL/KOC & MODEL TRỰC TIẾP",
    "tagline": "Bắt đầu từ con số 0 – Học xong được đồng hành 30 ngày thực chiến",
    "priceOld": "5.000.000đ",
    "priceNew": "2.000.000đ",
    "saveText": "Tiết kiệm 60% (3 triệu)",
    "courseCode": "kol_model",
    "experts": ["hoangNam", "dangThiTan"],
    "sessions": [
      "KOL/KOC NHẬP MÔN: KHÁM PHÁ BẢN THÂN VÀ THIẾT LẬP KÊNH",
      "KOL/KOC: Ý TƯỞNG, KỊCH BẢN VÀ NÓI TRƯỚC CAMERA",
      "KOL/KOC: QUAY VÀ DỰNG VIDEO BẰNG ĐIỆN THOẠI",
      "MODEL: NHẬP MÔN MODEL, TẠO DÁNG, BIỂU CẢM VÀ KẾ HOẠCH 30 NGÀY"
    ]
  },
  "program-2": {
    "badge": "CHƯƠNG TRÌNH 02",
    "title": "KOL/KOC & MODEL TRỰC TUYẾN",
    "tagline": "Bắt đầu từ con số 0 – Học xong được đồng hành 30 ngày thực chiến",
    "priceOld": "5.000.000đ",
    "priceNew": "2.000.000đ",
    "saveText": "Tiết kiệm 60% (3 triệu)",
    "courseCode": "kol_starter",
    "experts": ["hoangNam", "dangThiTan"],
    "sessions": [
      "KOL/KOC NHẬP MÔN: KHÁM PHÁ BẢN THÂN",
      "ĐỊNH HƯỚNG HÌNH ẢNH VÀ THIẾT LẬP KÊNH",
      "Ý TƯỞNG VÀ KỊCH BẢN VIDEO NGẮN",
      "NÓI TRƯỚC CAMERA VÀ QUAY VIDEO",
      "DỰNG VIDEO BẰNG CAPCUT",
      "MODEL NHẬP MÔN: TẠO DÁNG, BIỂU CẢM VÀ KẾ HOẠCH 30 NGÀY"
    ]
  },
  "program-3": {
    "badge": "CHƯƠNG TRÌNH 03",
    "title": "MODEL PROFESSIONAL",
    "tagline": "Tạo dáng - Biểu cảm - Catwalk - Model thương mại - Portfolio & Casting",
    "priceOld": "10.000.000đ",
    "priceNew": "6.000.000đ",
    "saveText": "Tiết kiệm 40% (4 triệu)",
    "courseCode": "model_pro",
    "experts": ["dangThiTan"],
    "sessions": [
      "ĐỊNH HƯỚNG NGHỀ MODEL, TÁC PHONG VÀ PHONG CÁCH CÁ NHÂN – HỌC ONLINE",
      "KIẾN THỨC TẠO DÁNG, BIỂU CẢM VÀ STYLING – HỌC ONLINE",
      "CASTING, PORTFOLIO VÀ LÀM VIỆC VỚI NHÃN HÀNG – HỌC ONLINE",
      "THỰC HÀNH HÌNH THỂ, POSING MASTER VÀ CHỤP CÙNG PHOTOGRAPHER – THỰC HÀNH TRỰC TIẾP TẠI STUDIO",
      "THỰC HÀNH RUNWAY CATWALK VÀ TRÌNH DIỄN – THỰC HÀNH TRỰC TIẾP TẠI STUDIO",
      "THỰC HÀNH CHỤP THƯƠNG MẠI VÀ CHỤP PORTFOLIO – THỰC HÀNH TRỰC TIẾP TẠI STUDIO",
      "FINAL SHOWCASE, KẾ HOẠCH 30 NGÀY VÀ KHỞI ĐỘNG 30 NGÀY ĐỒNG HÀNH – THỰC HÀNH TRỰC TIẾP TẠI STUDIO"
    ]
  },
  "program-4": {
    "badge": "CHƯƠNG TRÌNH 04",
    "title": "KOL/KOC ADVANCED",
    "tagline": "Xây kênh - Sản xuất nội dung - Livestream - Hợp tác nhãn hàng",
    "priceOld": "10.000.000đ",
    "priceNew": "6.000.000đ",
    "saveText": "Tiết kiệm 40% (4 triệu)",
    "courseCode": "kol_advanced",
    "experts": ["hoangNam"],
    "sessions": [
      "ĐỊNH VỊ CÁ NHÂN, CHIẾN LƯỢC VÀ THIẾT KẾ KÊNH – HỌC ONLINE",
      "Ý TƯỞNG VÀ KỊCH BẢN VIDEO NGẮN NÂNG CAO – HỌC ONLINE",
      "ĐA NỀN TẢNG, ĐỌC DỮ LIỆU VÀ HỢP TÁC NHÃN HÀNG – HỌC ONLINE",
      "THỰC HÀNH BIỂU ĐẠT TRƯỚC ỐNG KÍNH – THỰC HÀNH TRỰC TIẾP TẠI STUDIO",
      "THỰC HÀNH QUAY DỰNG VÀ SẢN XUẤT THEO LÔ – THỰC HÀNH TRỰC TIẾP TẠI STUDIO",
      "THỰC HÀNH KOC REVIEW VÀ LIVESTREAM BÁN HÀNG – THỰC HÀNH TRỰC TIẾP TẠI STUDIO",
      "DỰ ÁN TỐT NGHIỆP, KẾ HOẠCH 30 NGÀY VÀ KHỞI ĐỘNG 30 NGÀY ĐỒNG HÀNH – THỰC HÀNH TRỰC TIẾP TẠI STUDIO"
    ]
  }
};

// Nội dung giới thiệu, chuyên đề và lịch khai giảng theo từng khóa học.
const ROADMAP_DETAILS = {
  "program-1": {
    "intro": [
      {
        "type": "paragraph",
        "text": "Nhiều người muốn xây kênh, bán hàng online hay làm mẫu nhưng chưa biết bắt đầu từ đâu: video đăng lên ít người xem, chưa biết làm nội dung gì, ngại nói trước camera, hoặc học xong không có ai hướng dẫn tiếp."
      },
      {
        "type": "paragraph",
        "text": "Chương trình KOL/KOC & MODEL TRỰC TIẾP do ADA Talent Academy – ADA GROUP thiết kế dành cho người chưa biết gì. Chỉ trong 4 buổi học trực tiếp (120 phút/buổi), học viên học từ lập kênh, viết kịch bản, quay và dựng video bằng điện thoại đến tạo dáng Model, và ra về với sản phẩm thật."
      },
      {
        "type": "paragraph",
        "text": "Điểm khác biệt: học xong không bị bỏ rơi. Mỗi học viên được đồng hành 30 ngày thực chiến để đưa kênh vào hoạt động và bắt đầu kiếm thu nhập."
      },
      {
        "type": "heading",
        "text": "30 NGÀY ĐỒNG HÀNH THỰC CHIẾN SAU KHÓA HỌC"
      },
      {
        "type": "list",
        "items": [
          "Ngày 1–7: Hoàn thiện kênh và đăng đều: duyệt kênh trong 24 giờ, kho 30 ý tưởng, mẫu kịch bản.",
          "Ngày 8–14: Tìm định dạng hiệu quả: phân tích chỉ số cùng học viên, chọn 1–2 định dạng nội dung chủ lực.",
          "Ngày 15–21: Bắt đầu kiếm thu nhập: hướng dẫn affiliate, chọn sản phẩm, kết nối nguồn hàng và nhãn hàng trong hệ sinh thái ADA GROUP.",
          "Ngày 22–30: Livestream và tổng kết: hỗ trợ livestream thử tại studio ADA, buổi tổng kết 1:1 và kế hoạch tháng tiếp theo."
        ]
      },
      {
        "type": "paragraph",
        "text": "Cách thức: người phụ trách riêng, nhóm Zalo lớp, báo cáo hằng ngày, 1 buổi online chữa bài mỗi tuần."
      },
      {
        "type": "heading",
        "text": "LỢI ÍCH KHI THAM GIA CHƯƠNG TRÌNH"
      },
      {
        "type": "list",
        "items": [
          "Học trực tiếp tại lớp, giảng viên chỉnh sửa tại chỗ.",
          "Quay, dựng video và chụp ảnh tạo dáng ngay trong giờ học.",
          "Lớp tối đa 15 học viên để giảng viên kèm được từng người.",
          "Không cần kinh nghiệm, chỉ cần một chiếc điện thoại."
        ]
      },
      {
        "type": "heading",
        "text": "ĐỐI TƯỢNG THAM GIA"
      },
      {
        "type": "list",
        "items": [
          "Người mới, chưa có kinh nghiệm làm nội dung hay làm mẫu.",
          "Người đã có kênh nhưng video ít người xem, chưa có hướng rõ ràng.",
          "Người muốn bán hàng online, làm affiliate hoặc xây hình ảnh cá nhân cho công việc kinh doanh.",
          "Người muốn tự tin hơn khi xuất hiện trước máy quay, máy ảnh."
        ]
      },
      {
        "type": "heading",
        "text": "SẢN PHẨM HỌC VIÊN NHẬN ĐƯỢC"
      },
      {
        "type": "list",
        "items": [
          "Bản định hướng hình ảnh cá nhân và tối thiểu 03 ý tưởng nội dung.",
          "Kênh cơ bản đã thiết lập.",
          "01 kịch bản và 01 video hoàn thiện.",
          "Bộ ảnh thực hành tạo dáng.",
          "Kế hoạch 30 ngày đồng hành."
        ]
      },
      {
        "type": "heading",
        "text": "ƯU ĐÃI ĐI KÈM"
      },
      {
        "type": "list",
        "items": [
          "30 ngày đồng hành thực chiến sau khóa: người phụ trách riêng, báo cáo hằng ngày, 1 buổi online chữa bài mỗi tuần (trị giá 5.000.000đ)",
          "Hỗ trợ thành lập doanh nghiệp/hộ kinh doanh cho KOL, trở thành đối tác ADA GROUP (trị giá 3.000.000đ)",
          "Phòng Marketing chuyên nghiệp đồng hành: 1 bài viết/ngày, 10 video/tháng (trị giá 10.000.000đ)",
          "Phần mềm hỗ trợ bán hàng, tự động đăng bài đa nền tảng (trị giá 5.000.000đ)",
          "Stylist, makeup, mỗi tuần 1 bộ ảnh thương hiệu cá nhân (trị giá 10.000.000đ)",
          "Sử dụng studio livestream idol tại công ty (trị giá 3.000.000đ)",
          "Hỗ trợ setup phòng livestream tại nhà (trị giá 2.000.000đ)",
          "Bảo hành học lại (trị giá 2.000.000đ)",
          "Voucher giảm 30% thời trang, túi xách, nước hoa và dịch vụ truyền thông (tối đa 1.000.000đ)",
          "Tham gia chương trình Hoa hậu Doanh nhân cùng Á hậu Đặng Thị Tân (đặc quyền)"
        ]
      },
      {
        "type": "paragraph",
        "text": "*Tổng trị giá 40.000.000đ. Ưu đãi chỉ áp dụng trong 30 ngày sau khi hoàn thành khóa học, giá 2.000.000đ chỉ áp dụng khi đăng ký trong tháng 11. Áp dụng theo điều kiện và chính sách của ADA GROUP. Kết quả xây kênh và thu nhập phụ thuộc vào quá trình thực hành của mỗi học viên."
      }
    ],
    "translations": [
      "KOL/KOC Basics: Self-Discovery & Channel Setup",
      "Ideas, Scriptwriting & On-Camera Speaking",
      "Smartphone Filming & CapCut Editing",
      "Introduction to Modeling & 30-Day Plan",
      "30-Day Hands-on Mentoring Program"
    ],
    "extraTopic": "30 ngày đồng hành thực chiến sau khóa",
    "periodsPerSession": 3,
    "curriculumNote": "1 buổi = 120 phút = 3 tiết (40 phút/tiết). Sau khóa học: 30 ngày đồng hành thực chiến.",
    "schedule": {
      "date": "01/12/2026",
      "days": "Thứ 7 và Chủ nhật (buổi Model xếp lịch linh hoạt)",
      "time": "Thứ 7: 14:00–16:00\nChủ nhật: 09:00–11:00",
      "location": "Tầng 3, Chung cư Báo Công an nhân dân, số 22 đường Nghiêm Xuân Yêm, Thanh Liệt, Hà Nội",
      "format": "Học trực tiếp (offline)",
      "duration": "04 buổi × 120 phút (12 tiết) + 30 ngày đồng hành",
      "tuitionNote": "Đã bao gồm gói ưu đãi đi kèm và 30 ngày đồng hành theo chính sách của ADA GROUP."
    }
  },
  "program-2": {
    "intro": [
      {
        "type": "paragraph",
        "text": "Nhiều người muốn xây kênh, bán hàng online hay làm mẫu nhưng chưa biết bắt đầu từ đâu: video đăng lên ít người xem, chưa biết làm nội dung gì, ngại nói trước camera, hoặc học xong không có ai hướng dẫn tiếp."
      },
      {
        "type": "paragraph",
        "text": "Chương trình KOL/KOC & MODEL TRỰC TUYẾN do ADA Talent Academy – ADA GROUP thiết kế dành cho người chưa biết gì. Chỉ trong 6 buổi học trực tuyến (90 phút/buổi) cùng 1 buổi chuẩn bị, học viên học từ lập kênh, viết kịch bản, quay và dựng video bằng điện thoại đến tạo dáng Model, và ra về với sản phẩm thật."
      },
      {
        "type": "paragraph",
        "text": "Điểm khác biệt: học xong không bị bỏ rơi. Mỗi học viên được đồng hành 30 ngày thực chiến để đưa kênh vào hoạt động và bắt đầu kiếm thu nhập."
      },
      {
        "type": "heading",
        "text": "30 NGÀY ĐỒNG HÀNH THỰC CHIẾN SAU KHÓA HỌC"
      },
      {
        "type": "list",
        "items": [
          "Ngày 1–7: Hoàn thiện kênh và đăng đều: duyệt kênh trong 24 giờ, kho 30 ý tưởng, mẫu kịch bản.",
          "Ngày 8–14: Tìm định dạng hiệu quả: phân tích chỉ số cùng học viên, chọn 1–2 định dạng nội dung chủ lực.",
          "Ngày 15–21: Bắt đầu kiếm thu nhập: hướng dẫn affiliate, chọn sản phẩm, kết nối nguồn hàng và nhãn hàng trong hệ sinh thái ADA GROUP.",
          "Ngày 22–30: Livestream và tổng kết: hỗ trợ livestream thử tại studio ADA, buổi tổng kết 1:1 và kế hoạch tháng tiếp theo."
        ]
      },
      {
        "type": "paragraph",
        "text": "Cách thức: người phụ trách riêng, nhóm Zalo lớp, báo cáo hằng ngày, 1 buổi online chữa bài mỗi tuần."
      },
      {
        "type": "heading",
        "text": "LỢI ÍCH KHI THAM GIA CHƯƠNG TRÌNH"
      },
      {
        "type": "list",
        "items": [
          "Học trực tuyến buổi tối, phù hợp người bận rộn hoặc ở xa; có bản ghi hình để xem lại.",
          "Chia nhóm nhỏ, giảng viên ghim màn hình góp ý từng học viên; nhận xét bài nộp trong 48 giờ và 1 buổi góp ý 1:1.",
          "Lớp tối đa 20 học viên.",
          "Nội dung, sản phẩm đầu ra và quyền lợi giống hệt lớp trực tiếp: setup livestream tại nhà được tư vấn từ xa; studio livestream, stylist và chụp ảnh thực hiện tại công ty.",
          "Không cần kinh nghiệm, chỉ cần một chiếc điện thoại."
        ]
      },
      {
        "type": "heading",
        "text": "ĐỐI TƯỢNG THAM GIA"
      },
      {
        "type": "list",
        "items": [
          "Người mới, chưa có kinh nghiệm làm nội dung hay làm mẫu.",
          "Người đã có kênh nhưng video ít người xem, chưa có hướng rõ ràng.",
          "Người muốn bán hàng online, làm affiliate hoặc xây hình ảnh cá nhân cho công việc kinh doanh.",
          "Người muốn tự tin hơn khi xuất hiện trước máy quay, máy ảnh."
        ]
      },
      {
        "type": "heading",
        "text": "SẢN PHẨM HỌC VIÊN NHẬN ĐƯỢC"
      },
      {
        "type": "list",
        "items": [
          "Bản định hướng hình ảnh cá nhân và tối thiểu 03 ý tưởng nội dung.",
          "Kênh cơ bản đã thiết lập.",
          "01 kịch bản và 01 video hoàn thiện.",
          "Bộ ảnh thực hành tạo dáng.",
          "Kế hoạch 30 ngày đồng hành."
        ]
      },
      {
        "type": "heading",
        "text": "ƯU ĐÃI ĐI KÈM"
      },
      {
        "type": "list",
        "items": [
          "30 ngày đồng hành thực chiến sau khóa: người phụ trách riêng, báo cáo hằng ngày, 1 buổi online chữa bài mỗi tuần (trị giá 5.000.000đ)",
          "Hỗ trợ thành lập doanh nghiệp/hộ kinh doanh cho KOL, trở thành đối tác ADA GROUP (trị giá 3.000.000đ)",
          "Phòng Marketing chuyên nghiệp đồng hành: 1 bài viết/ngày, 10 video/tháng (trị giá 10.000.000đ)",
          "Phần mềm hỗ trợ bán hàng, tự động đăng bài đa nền tảng (trị giá 5.000.000đ)",
          "Stylist, makeup, mỗi tuần 1 bộ ảnh thương hiệu cá nhân (trị giá 10.000.000đ)",
          "Sử dụng studio livestream idol tại công ty (trị giá 3.000.000đ)",
          "Hỗ trợ setup phòng livestream tại nhà (trị giá 2.000.000đ)",
          "Bảo hành học lại (trị giá 2.000.000đ)",
          "Voucher giảm 30% thời trang, túi xách, nước hoa và dịch vụ truyền thông (tối đa 1.000.000đ)",
          "Tham gia chương trình Hoa hậu Doanh nhân cùng Á hậu Đặng Thị Tân (đặc quyền)"
        ]
      },
      {
        "type": "paragraph",
        "text": "*Tổng trị giá 40.000.000đ. Ưu đãi chỉ áp dụng trong 30 ngày sau khi hoàn thành khóa học; giá 2.000.000đ chỉ áp dụng khi đăng ký trong tháng 11. Áp dụng theo điều kiện và chính sách của ADA GROUP. Kết quả xây kênh và thu nhập phụ thuộc vào quá trình thực hành của mỗi học viên."
      }
    ],
    "translations": [
      "KOL/KOC Basics: Self-Discovery",
      "Personal Image & Channel Setup",
      "Ideas & Short-Video Scriptwriting",
      "On-Camera Speaking & Filming",
      "Video Editing with CapCut",
      "Introduction to Modeling & 30-Day Plan",
      "30-Day Hands-on Mentoring Program"
    ],
    "extraTopic": "30 ngày đồng hành thực chiến sau khóa",
    "periodsPerSession": 2,
    "curriculumNote": "1 buổi = 90 phút = 2 tiết (45 phút/tiết). Trước khóa có 1 buổi chuẩn bị 30 phút. Sau khóa học: 30 ngày đồng hành thực chiến.",
    "schedule": {
      "date": "01/12/2026",
      "days": "Thứ 2, 4, 6 (buổi Model xếp lịch linh hoạt)",
      "time": "19:30–21:00",
      "location": "Online (Zoom/Google Meet)",
      "format": "Học trực tuyến, có ghi hình xem lại",
      "duration": "06 buổi × 90 phút (12 tiết) + 1 buổi chuẩn bị + 30 ngày đồng hành",
      "tuitionNote": "Quyền lợi giống hệt lớp trực tiếp, đã bao gồm gói ưu đãi đi kèm và 30 ngày đồng hành."
    }
  },
  "program-3": {
    "intro": [
      {
        "type": "paragraph",
        "text": "Trong thời đại hình ảnh lên ngôi, thần thái và phong cách trước ống kính đã trở thành một lợi thế cạnh tranh thực sự. Người mẫu hôm nay không chỉ xuất hiện trên sàn diễn hay trang tạp chí, mà còn hiện diện trong các chiến dịch quảng cáo, sự kiện, cuộc thi nhan sắc và cả trên chính những kênh bán hàng của người làm kinh doanh. Một người mẫu chuyên nghiệp cần nhiều hơn ngoại hình: đó là kỹ năng, tác phong và bản lĩnh trình diễn."
      },
      {
        "type": "paragraph",
        "text": "Chương trình MODEL PROFESSIONAL do ADA Talent Academy – ADA GROUP thiết kế và tổ chức là hành trình 7 buổi (3 buổi online và 4 buổi thực hành tại studio) đào tạo người mẫu đa năng dành cho nữ, giúp học viên đi từ những tư thế nền tảng đến sàn diễn chuyên nghiệp. Đây không đơn thuần là một khóa học tạo dáng, mà là nơi mỗi học viên rèn luyện thần thái, xây dựng hồ sơ nghề nghiệp và bước vào hệ sinh thái phát triển tài năng của ADA GROUP, gắn liền với chương trình Hoa hậu Doanh nhân."
      },
      {
        "type": "paragraph",
        "text": "Với triết lý đào tạo \"Rèn luyện – Tự tin – Tỏa sáng\", chương trình mang đến:"
      },
      {
        "type": "list",
        "items": [
          "Hiểu biết toàn diện về nghề Model và tác phong làm việc chuyên nghiệp.",
          "Kỹ năng kiểm soát hình thể, tạo dáng và biểu cảm theo từng concept.",
          "Kỹ thuật catwalk và bản lĩnh làm chủ sân khấu.",
          "Năng lực làm việc với ekip chụp ảnh, casting và xây dựng portfolio."
        ]
      },
      {
        "type": "paragraph",
        "text": "Điểm đặc biệt của chương trình là 3 buổi online buổi tối giúp học viên nắm kiến thức tại nhà, sau đó 4 buổi thực hành tại studio có giảng viên chỉnh sửa từng chi tiết:"
      },
      {
        "type": "list",
        "items": [
          "Chụp ảnh đầu vào để so sánh sự thay đổi sau khóa học.",
          "Thực hành tạo dáng, biểu cảm cùng photographer chuyên nghiệp.",
          "Luyện catwalk nền tảng và trình diễn nâng cao.",
          "Chụp ảnh thương mại theo brief, làm việc trong buổi chụp thực tế.",
          "Xây dựng portfolio và thực hành casting.",
          "Trình diễn tốt nghiệp trong Final Showcase."
        ]
      },
      {
        "type": "paragraph",
        "text": "ADA Talent Academy tin rằng, MODEL PROFESSIONAL sẽ là hành trình giúp mỗi học viên khám phá vẻ đẹp và bản lĩnh của chính mình, tự tin tỏa sáng trước ống kính, trên sàn diễn và trong mọi cơ hội phía trước."
      },
      {"type":"heading","text":"LỊCH TRÌNH 7 BUỔI – ONLINE & THỰC HÀNH TRỰC TIẾP"},{"type":"list","items":["Buổi 1 – HỌC ONLINE (tối T2-4-6): Định hướng nghề Model, tác phong và phong cách cá nhân.", "Buổi 2 – HỌC ONLINE: Kiến thức tạo dáng, biểu cảm và styling.", "Buổi 3 – HỌC ONLINE: Casting, portfolio và làm việc với nhãn hàng.", "Buổi 4 – THỰC HÀNH TRỰC TIẾP tại studio (T7/CN): Hình thể, tạo dáng, chụp cùng photographer.", "Buổi 5 – THỰC HÀNH TRỰC TIẾP: Runway catwalk và trình diễn.", "Buổi 6 – THỰC HÀNH TRỰC TIẾP: Chụp thương mại và chụp portfolio.", "Buổi 7 – THỰC HÀNH TRỰC TIẾP: Final Showcase, kế hoạch 30 ngày.", "Sau khóa: 30 ngày đồng hành thực chiến."]},
      {
        "type": "heading",
        "text": "LỢI ÍCH KHI THAM GIA CHƯƠNG TRÌNH"
      },
      {
        "type": "list",
        "items": [
          "Lộ trình 7 buổi chuyên sâu: 3 buổi online buổi tối, 4 buổi thực hành tại studio vào cuối tuần.",
          "Thực hành chụp ảnh cùng photographer, có ảnh cho portfolio cá nhân.",
          "Không yêu cầu chiều cao hay số đo chuẩn, tập trung phát triển kỹ năng và thế mạnh riêng.",
          "Trình diễn tốt nghiệp trong Final Showcase, nhận đánh giá và nhận xét cá nhân.",
          "Kết nối chương trình Hoa hậu Doanh nhân và hệ sinh thái ADA GROUP với gói ưu đãi đi kèm."
        ]
      },
      {
        "type": "heading",
        "text": "ĐỐI TƯỢNG THAM GIA"
      },
      {
        "type": "list",
        "items": [
          "Nữ muốn theo đuổi người mẫu ảnh, người mẫu thương mại, sự kiện, trình diễn.",
          "Người đã học nhập môn và muốn rèn luyện kỹ năng Model bài bản.",
          "Chủ shop thời trang, mỹ phẩm muốn tự làm mẫu cho sản phẩm.",
          "Người chuẩn bị tham gia các cuộc thi nhan sắc, cần rèn luyện catwalk và phong thái sân khấu."
        ]
      },
      {
        "type": "heading",
        "text": "MỤC TIÊU HỌC TẬP"
      },
      {
        "type": "paragraph",
        "text": "Sau khi hoàn thành chương trình, học viên có thể:"
      },
      {
        "type": "list",
        "items": [
          "Hiểu các nhánh nghề Model và tác phong làm việc chuyên nghiệp.",
          "Kiểm soát hình thể, tạo dáng và biểu cảm có chủ đích theo concept.",
          "Thực hiện catwalk tự tin, làm chủ sân khấu và xử lý tình huống.",
          "Làm việc hiệu quả với photographer, stylist trong buổi chụp thương mại.",
          "Chuẩn bị hồ sơ casting và portfolio Model cơ bản."
        ]
      },
      {
        "type": "heading",
        "text": "ƯU ĐÃI ĐI KÈM"
      },
      {
        "type": "list",
        "items": ["30 ngày đồng hành thực chiến sau khóa: người phụ trách riêng, báo cáo hằng ngày, 1 buổi online chữa bài mỗi tuần (trị giá 5.000.000đ)", "Hỗ trợ thành lập doanh nghiệp/hộ kinh doanh cho KOL, trở thành đối tác ADA GROUP (trị giá 3.000.000đ)", "Phòng Marketing chuyên nghiệp đồng hành: 1 bài viết/ngày, 10 video/tháng (trị giá 10.000.000đ)", "Phần mềm hỗ trợ bán hàng, tự động đăng bài đa nền tảng (trị giá 5.000.000đ)", "Stylist, makeup, mỗi tuần 1 bộ ảnh thương hiệu cá nhân (trị giá 10.000.000đ)", "Sử dụng studio livestream idol tại công ty (trị giá 3.000.000đ)", "Hỗ trợ setup phòng livestream tại nhà (trị giá 2.000.000đ)", "Bảo hành học lại (trị giá 6.000.000đ)", "Voucher giảm 30% thời trang, túi xách, nước hoa và dịch vụ truyền thông (tối đa 1.000.000đ)", "Tham gia chương trình Hoa hậu Doanh nhân cùng Á hậu Đặng Thị Tân (đặc quyền)"]
      },
      {
        "type": "paragraph",
        "text": "*Tổng trị giá 44.000.000đ. Giá 6.000.000đ (gốc 10.000.000đ) chỉ áp dụng khi đăng ký trong tháng 11. Ưu đãi chỉ áp dụng trong 30 ngày sau khi hoàn thành khóa học. Áp dụng theo điều kiện và chính sách của ADA GROUP."
      }
    ],
    "translations": ["Model Career Orientation, Manner & Personal Style", "Posing, Expression & Styling Fundamentals", "Casting, Portfolio & Working with Brands", "Studio Practice: Body Control, Posing & Photoshoot", "Runway Catwalk Practice", "Commercial & Portfolio Photoshoot Practice", "Final Showcase & 30-Day Plan", "30-Day Hands-on Mentoring Program"],
    "periodsPerSession": 4,
    "curriculumNote": "1 buổi = 150 phút ≈ 4 tiết. Buổi 1–3 học online, buổi 4–7 thực hành tại studio. Sau khóa: 30 ngày đồng hành thực chiến.",
    "schedule": {"date": "01/12/2026", "days": "Online: Thứ 2, 4, 6\nThực hành: Thứ 7, Chủ nhật", "time": "Online (Thứ 2, 4, 6): 19:30–22:00\nOffline (Thứ 7): 14:00–16:30\nOffline (Chủ nhật): 09:00–11:30", "location": "Online (Zoom/Google Meet) + Offline (Tầng 3, Chung cư Báo Công an nhân dân, số 22 đường Nghiêm Xuân Yêm, Thanh Liệt, Hà Nội)", "format": "Buổi 1–3 học online buổi tối, buổi 4–7 thực hành tại studio cuối tuần", "duration": "07 buổi × 150 phút (3 online + 4 thực hành) + 30 ngày đồng hành", "tuitionNote": "Đã bao gồm gói ưu đãi đi kèm và 30 ngày đồng hành thực chiến sau khóa theo chính sách của ADA GROUP."}
  },
  "program-4": {
    "intro": [
      {
        "type": "paragraph",
        "text": "Thị trường nội dung số đang bước vào giai đoạn cạnh tranh khốc liệt. Mỗi ngày có hàng triệu video được đăng tải, nhưng chỉ những người làm nội dung có chiến lược, có bản sắc và có năng lực vận hành bài bản mới thực sự tạo được chỗ đứng. KOL/KOC hôm nay không chỉ là người xuất hiện trước ống kính, mà còn là một nhà sáng tạo, một người kinh doanh và một thương hiệu cá nhân có sức ảnh hưởng."
      },
      {
        "type": "paragraph",
        "text": "Chương trình KOL/KOC ADVANCED do ADA Talent Academy – ADA GROUP thiết kế và tổ chức là hành trình 7 buổi chuyên sâu (3 buổi online nền tảng và 4 buổi thực hành tại studio), giúp người làm nội dung chuyển mình từ “đăng cho có” sang “làm kênh có chiến lược”. Đây không đơn thuần là một khóa học kỹ năng, mà là nơi học viên xây dựng nền móng nghề nghiệp vững chắc, đồng thời bước vào hệ sinh thái phát triển KOL/KOC và kinh doanh của ADA GROUP."
      },
      {
        "type": "paragraph",
        "text": "Với triết lý đào tạo \"Chiến lược – Thực chiến – Bứt phá\", chương trình mang đến:"
      },
      {
        "type": "list",
        "items": [
          "Tư duy định vị và chiến lược kênh rõ ràng, khác biệt.",
          "Quy trình sáng tạo và sản xuất nội dung chuyên nghiệp.",
          "Năng lực đọc dữ liệu để tối ưu hiệu quả nội dung.",
          "Kỹ năng livestream, review và hợp tác với nhãn hàng."
        ]
      },
      {
        "type": "paragraph",
        "text": "Điểm đặc biệt của chương trình là học viên làm việc trên chính kênh của mình, thực hành tại studio và được giảng viên góp ý trực tiếp:"
      },
      {
        "type": "list",
        "items": [
          "Định vị cá nhân và tối ưu kênh theo chuẩn chuyên nghiệp.",
          "Xây dựng kho ý tưởng và kịch bản giữ chân người xem.",
          "Làm chủ kỹ năng trước ống kính, quay dựng theo quy trình.",
          "Thực hành livestream và làm video review sản phẩm.",
          "Chuẩn bị media kit để làm việc với nhãn hàng.",
          "Hoàn thiện dự án kênh và kế hoạch phát triển 30 ngày."
        ]
      },
      {
        "type": "paragraph",
        "text": "ADA Talent Academy tin rằng, KOL/KOC ADVANCED sẽ là bệ phóng giúp mỗi học viên trở thành một nhà sáng tạo nội dung chuyên nghiệp, vững vàng trên hành trình xây dựng thương hiệu cá nhân và kinh doanh trên nền tảng số."
      },
      {"type":"heading","text":"LỊCH TRÌNH 7 BUỔI – ONLINE & THỰC HÀNH TRỰC TIẾP"},{"type":"list","items":["Buổi 1 – HỌC ONLINE: Định vị cá nhân, chiến lược và thiết kế kênh.", "Buổi 2 – HỌC ONLINE: Ý tưởng và kịch bản video ngắn nâng cao.", "Buổi 3 – HỌC ONLINE: Đa nền tảng, đọc dữ liệu, media kit và hợp tác nhãn hàng.", "Buổi 4 – THỰC HÀNH TRỰC TIẾP tại studio: Biểu đạt trước ống kính.", "Buổi 5 – THỰC HÀNH TRỰC TIẾP: Quay dựng và sản xuất theo lô.", "Buổi 6 – THỰC HÀNH TRỰC TIẾP: KOC review và livestream bán hàng.", "Buổi 7 – THỰC HÀNH TRỰC TIẾP: Dự án tốt nghiệp, kế hoạch 30 ngày.", "Sau khóa: 30 ngày đồng hành thực chiến – người phụ trách riêng, báo cáo hằng ngày, chữa bài hằng tuần, gắn sản phẩm affiliate, kết nối nguồn hàng và nhãn hàng, livestream tại studio ADA."]},
      {
        "type": "heading",
        "text": "LỢI ÍCH KHI THAM GIA CHƯƠNG TRÌNH"
      },
      {
        "type": "list",
        "items": [
          "Lộ trình 7 buổi chuyên sâu: 3 buổi online nền tảng và 4 buổi thực hành offline tại studio.",
          "Làm việc trên kênh thật của chính mình, có giảng viên góp ý trực tiếp.",
          "Nắm trọn chuỗi kỹ năng từ định vị, sản xuất, livestream đến hợp tác nhãn hàng.",
          "Hoàn thiện dự án kênh và kế hoạch phát triển 30 ngày sau khóa học.",
          "Tiếp cận hệ sinh thái phát triển KOL/KOC và kinh doanh của ADA GROUP với gói ưu đãi đi kèm."
        ]
      },
      {
        "type": "heading",
        "text": "ĐỐI TƯỢNG THAM GIA"
      },
      {
        "type": "list",
        "items": [
          "Người đã học nhập môn hoặc đã có trải nghiệm làm nội dung.",
          "Chủ shop, người kinh doanh online muốn tự làm video và livestream bán hàng.",
          "Người làm dịch vụ, chuyên gia muốn xây dựng uy tín và thương hiệu cá nhân.",
          "Người muốn tiếp cận các hình thức hợp tác thương mại: review, affiliate, booking."
        ]
      },
      {
        "type": "heading",
        "text": "MỤC TIÊU HỌC TẬP"
      },
      {
        "type": "paragraph",
        "text": "Sau khi hoàn thành chương trình, học viên có thể:"
      },
      {
        "type": "list",
        "items": [
          "Xây dựng định vị cá nhân rõ ràng và vận hành kênh nhất quán, chuyên nghiệp.",
          "Tìm ý tưởng có hệ thống và viết kịch bản video giữ chân người xem.",
          "Tự tổ chức quy trình quay dựng và phân phối nội dung đa nền tảng.",
          "Đọc dữ liệu, đánh giá hiệu quả và tối ưu nội dung.",
          "Làm video review, livestream bán hàng trung thực, thuyết phục.",
          "Chuẩn bị hồ sơ, media kit và quy trình làm việc với nhãn hàng."
        ]
      },
      {
        "type": "heading",
        "text": "ƯU ĐÃI ĐI KÈM"
      },
      {
        "type": "list",
        "items": ["30 ngày đồng hành thực chiến sau khóa: người phụ trách riêng, báo cáo hằng ngày, 1 buổi online chữa bài mỗi tuần (trị giá 5.000.000đ)", "Hỗ trợ thành lập doanh nghiệp/hộ kinh doanh cho KOL, trở thành đối tác ADA GROUP (trị giá 3.000.000đ)", "Phòng Marketing chuyên nghiệp đồng hành: 1 bài viết/ngày, 10 video/tháng (trị giá 10.000.000đ)", "Phần mềm hỗ trợ bán hàng, tự động đăng bài đa nền tảng (trị giá 5.000.000đ)", "Stylist, makeup, mỗi tuần 1 bộ ảnh thương hiệu cá nhân (trị giá 10.000.000đ)", "Sử dụng studio livestream idol tại công ty (trị giá 3.000.000đ)", "Hỗ trợ setup phòng livestream tại nhà (trị giá 2.000.000đ)", "Bảo hành học lại (trị giá 6.000.000đ)", "Voucher giảm 30% thời trang, túi xách, nước hoa và dịch vụ truyền thông (tối đa 1.000.000đ)", "Tham gia chương trình Hoa hậu Doanh nhân cùng Á hậu Đặng Thị Tân (đặc quyền)"]
      },
      {
        "type": "paragraph",
        "text": "*Tổng trị giá 44.000.000đ. Giá 6.000.000đ (gốc 10.000.000đ) chỉ áp dụng khi đăng ký trong tháng 11. Ưu đãi chỉ áp dụng trong 30 ngày sau khi hoàn thành khóa học. Áp dụng theo điều kiện và chính sách của ADA GROUP."
      }
    ],
    "translations": ["Personal Positioning, Strategy & Channel Design", "Advanced Ideation & Short-Video Scriptwriting", "Multi-Platform, Analytics & Brand Partnerships", "On-Camera Practice", "Batch Filming & Editing Practice", "KOC Review & Live-Selling Practice", "Capstone Project & 30-Day Plan", "30-Day Hands-on Mentoring Program"],
    "periodsPerSession": 4,
    "curriculumNote": "1 buổi = 150 phút ≈ 4 tiết. Buổi 1–3 học online, buổi 4–7 thực hành offline tại studio. Sau khóa: 30 ngày đồng hành thực chiến.",
    "schedule": {
      "date": "01/12/2026",
      "days": "Thứ 2, 4, 6",
      "time": "13:30–16:00",
      "location": "Online (Zoom/Google Meet) + Offline (Tầng 3, Chung cư Báo Công an nhân dân, số 22 đường Nghiêm Xuân Yêm, Thanh Liệt, Hà Nội)",
      "format": "Buổi 1–3 học online (Zoom/Google Meet), buổi 4–7 thực hành offline tại studio",
      "duration": "07 buổi × 150 phút (3 online + 4 offline) + 30 ngày đồng hành",
      "tuitionNote": "Đã bao gồm gói ưu đãi đi kèm và 30 ngày đồng hành thực chiến sau khóa theo chính sách của ADA GROUP."
    }
  }
};

const ROADMAP_EXPERT_PROFILES = {
  "hoangNam": {
    "name": "Giảng viên Hoàng Nam",
    "roles": "Thạc sĩ – Diễn viên – Ca sĩ – Giảng viên",
    "photo": {
      "src": "assets/experts/hoangnam.jpg",
      "alt": "Chân dung giảng viên Hoàng Nam",
      "size": 2792
    },
    "summary": "Thạc sĩ Hoàng Nam là diễn viên, ca sĩ và giảng viên trong lĩnh vực nghệ thuật biểu diễn. Với nền tảng chuyên môn về diễn xuất và hoạt động nghệ thuật, giảng viên Hoàng Nam hướng đến việc giúp học viên khám phá thế mạnh cá nhân, phát triển khả năng biểu đạt cảm xúc, rèn luyện thần thái và nâng cao sự tự tin trước ống kính.",
    "sections": [
      {
        "title": "Giới thiệu",
        "items": [
          "Thạc sĩ, diễn viên và ca sĩ hoạt động trong lĩnh vực nghệ thuật biểu diễn.",
          "Giảng viên Học viện Âm nhạc Quốc gia Việt Nam.",
          "Giảng viên Trường Cao đẳng Nghệ thuật Hà Nội.",
          "Gương mặt nghệ sĩ tiêu biểu năm 2025.",
          "Huy chương vàng Liên hoan Sân khấu châu Á năm 2024.",
          "Huy chương bạc Liên hoan Sân khấu kịch nói năm 2024."
        ]
      },
      {
        "title": "Lĩnh vực đào tạo đề xuất tại ADA Talent Academy",
        "items": [
          "Kỹ năng diễn xuất và thể hiện cảm xúc trước ống kính.",
          "Kỹ năng giao tiếp, giọng nói và ngôn ngữ cơ thể.",
          "Kỹ năng tạo dáng, biểu cảm và phát triển thần thái cá nhân.",
          "Định hướng xây dựng hình ảnh và phong cách cá nhân.",
          "Thực hành trình bày nội dung trước máy quay.",
          "Phát triển sự tự tin và khả năng làm chủ sân khấu."
        ]
      }
    ]
  },
  "dangThiTan": {
    "name": "Á hậu Đặng Thị Tân",
    "roles": "Á hậu 2 Hoa hậu Doanh nhân Quốc gia Việt Nam 2024",
    "photo": {
      "src": "assets/experts/dangthitan.jpg",
      "alt": "Chân dung Á hậu Đặng Thị Tân",
      "size": 3432
    },
    "summary": "Á hậu Đặng Thị Tân là nhà sáng lập Câu lạc bộ Tân Yoga Hà Nội. Năm 2026, với vai trò Chánh Văn phòng Liên đoàn Yoga Hà Nội, cô góp phần kết nối các câu lạc bộ và phát triển phong trào yoga tại Thủ đô.",
    "sections": [
      {
        "title": "Giới thiệu",
        "items": [
          "Đạt giải Người đẹp Tài năng với tiết mục yoga tại Hoa hậu Doanh nhân Quốc gia Việt Nam 2024.",
          "Sáng lập và trực tiếp giảng dạy tại Câu lạc bộ Tân Yoga Hà Nội.",
          "Từng đảm nhiệm vai trò MC và trọng tài tại Giải Yoga Hướng Mặt Trời lần VI.",
          "Tham gia talk show “Bật tự tin – Tỏa chất riêng”, chia sẻ kinh nghiệm rèn phong thái và xây dựng hình ảnh cá nhân."
        ]
      },
      {
        "title": "Lĩnh vực đào tạo đề xuất tại ADA Talent Academy",
        "items": [
          "Rèn tư thế, thăng bằng và kiểm soát chuyển động qua các bài tập yoga cơ bản.",
          "Luyện phong thái trước công chúng, chú trọng giọng nói và ngôn ngữ cơ thể.",
          "Thực hành điều chỉnh biểu cảm và cử chỉ khi xuất hiện trước ống kính.",
          "Nhận diện thế mạnh và định hình phong cách cá nhân phù hợp với hình ảnh muốn xây dựng."
        ]
      }
    ]
  }
};
