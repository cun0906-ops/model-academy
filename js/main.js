/* Navigation, smooth scroll helpers, and small UI enhancements */
(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];
  const brandLink = document.querySelector(".brand");

  function closeMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Mở menu" : "Đóng menu");
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    if (brandLink) brandLink.addEventListener("click", closeMenu);

    nav.addEventListener("click", (event) => {
      if (event.target === nav) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  // Add a subtle shadow once the sticky header has moved away from the top & sync header height.
  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
    document.documentElement.style.setProperty("--header-actual-h", `${header.offsetHeight}px`);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader);

  const navIndicator = nav ? nav.querySelector(".nav-indicator") : null;
  const sectionLinks = nav ? [...nav.querySelectorAll('a[href^="#"]:not(.button)')] : [];
  const sectionLinkTargets = sectionLinks
    .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
    .filter(({ section }) => section);
  let activeNavFrame = 0;

  function updateActiveNav() {
    activeNavFrame = 0;
    const threshold = (header ? header.offsetHeight : 0) + 100;
    let activeLink = null;

    sectionLinkTargets.forEach(({ link, section }) => {
      if (section.getBoundingClientRect().top <= threshold) activeLink = link;
    });

    sectionLinks.forEach((link) => {
      if (link === activeLink) {
        link.classList.add("is-current");
        link.setAttribute("aria-current", "location");
      } else {
        link.classList.remove("is-current");
        link.removeAttribute("aria-current");
      }
    });

    if (!navIndicator) return;
    if (!activeLink || window.innerWidth <= 900) {
      navIndicator.classList.remove("is-visible");
      return;
    }

    navIndicator.style.width = `${activeLink.offsetWidth}px`;
    navIndicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
    navIndicator.classList.add("is-visible");
  }

  function scheduleActiveNavUpdate() {
    if (activeNavFrame) return;
    activeNavFrame = window.requestAnimationFrame(updateActiveNav);
  }

  updateActiveNav();
  window.addEventListener("scroll", scheduleActiveNavUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveNavUpdate);
  window.addEventListener("hashchange", scheduleActiveNavUpdate);

  // Current year in footer.
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Theo dõi hướng cuộn chung (down / up) cho toàn bộ trang
  let lastScrollY = window.scrollY;
  let scrollDirection = "down";

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 4) {
        scrollDirection = "down";
      } else if (currentScrollY < lastScrollY - 4) {
        scrollDirection = "up";
      }
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );

  // Reveal content as it enters the viewport (hỗ trợ cả cuộn xuống và từ dưới cuộn lên)
  const revealTargets = document.querySelectorAll(
    ".intro-strip-inner, .section-heading, .feature-card, .benefit-card, .program-card, .timeline-item, " +
    ".instructor-image, .instructor-copy, .gallery-item, .enrollment-card, .faq-item, .lead-copy, .lead-media, .lead-form, " +
    ".pillar-card, .audience-card, .program-detail-card, .value-card, .advantage-card, .challenges-callout, " +
    ".section-heading-split, .about-header"
  );
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealTargets.length && "IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.dataset.scrollDir = scrollDirection;
            const siblings = Array.from(
              el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal-on-scroll") : []
            );
            const index = siblings.indexOf(el);
            if (index >= 0) {
              const delay =
                scrollDirection === "up" && siblings.length > 1
                  ? (siblings.length - 1 - index) * 70
                  : index * 70;
              el.style.setProperty("--reveal-delay", `${Math.min(delay, 280)}ms`);
            }
            el.classList.add("is-visible");
          } else {
            // Khi phần tử rời khỏi màn hình hoàn toàn, gỡ bỏ is-visible
            // để sẵn sàng cho hiệu ứng xuất hiện tiếp theo khi người dùng cuộn ngược lại
            el.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 80px 0px"
      }
    );


    document.body.classList.add("js-reveal-ready");
    revealTargets.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      revealObserver.observe(element);
    });
  }

  // Section 03 - Quà tặng học viên: Hiển thị dần lên khi cuộn tới và cả khi cuộn lại (hai chiều)
  const giftRows = document.querySelectorAll(".gift-row");
  if (giftRows.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    const giftsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.scrollDir = scrollDirection;
            entry.target.classList.add("is-visible");
          } else {
            // Khi cuộn qua khỏi màn hình (cả cuộn xuống lẫn cuộn ngược lại từ dưới lên)
            // gỡ bỏ is-visible để khi cuộn quay trở lại, phần tử tiếp tục hiện dần lên mượt mà
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -10px 0px" // Kích hoạt ngay khi vừa chạm màn hình, không bị ẩn khi đang đọc
      }
    );

    giftRows.forEach((row) => {
      row.classList.add("gift-reveal");
      giftsObserver.observe(row);
    });
  }

  // Course cards can preselect a course in the admissions form.
  const courseSelect = document.querySelector("#course");
  document.querySelectorAll("[data-course]").forEach((link) => {
    link.addEventListener("click", () => {
      if (courseSelect) courseSelect.value = link.dataset.course || "";
    });
  });

  // Floating back to top button
  const backToTopBtn = document.querySelector("#back-to-top");
  if (backToTopBtn) {
    const toggleBackToTop = () => {
      backToTopBtn.classList.toggle("is-visible", window.scrollY > 350);
    };
    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  // Banner Modal Popup (Hiển thị sắc nét & Chặn click xuyên thấu an toàn)
  function initBannerModal() {
    const bannerModal = document.querySelector("#banner-modal");
    if (!bannerModal) return;

    let isClosing = false;
    let sharpTimer = null;

    function openBanner() {
      if (isClosing) return;
      bannerModal.classList.remove("is-closing");
      bannerModal.classList.add("is-open");
      bannerModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("banner-modal-open");

      // Sau khi animation mở hoàn tất (400ms), kích hoạt .is-sharp gỡ bỏ transform
      // Giúp ảnh render trực tiếp 100% độ nét pixel gốc, không bị mờ do GPU texture
      clearTimeout(sharpTimer);
      sharpTimer = setTimeout(() => {
        if (bannerModal.classList.contains("is-open") && !isClosing) {
          bannerModal.classList.add("is-sharp");
        }
      }, 400);
    }

    function closeBanner() {
      if (isClosing || !bannerModal.classList.contains("is-open")) return;
      isClosing = true;
      clearTimeout(sharpTimer);

      bannerModal.classList.remove("is-sharp");
      bannerModal.classList.remove("is-open");
      bannerModal.classList.add("is-closing");
      bannerModal.setAttribute("aria-hidden", "true");

      // Trong suốt thời gian mờ dần 350ms, banner-modal vẫn giữ pointer-events: auto
      // để chặn triệt để mọi click/tap/ghost-click xuyên xuống các nút và liên kết bên dưới!
      setTimeout(() => {
        bannerModal.classList.remove("is-closing");
        document.body.classList.remove("banner-modal-open");
        isClosing = false;
      }, 350);
    }

    // Xử lý sự kiện click:
    // - Bấm nút X: tắt modal
    // - Bấm bất kỳ điểm nào trong ảnh: KHÔNG ẩn đi (giữ nguyên)
    // - Bấm ra ngoài ảnh (backdrop hoặc vùng trống ngoài dialog): tự động tắt modal mà không ảnh hưởng tới nút bên dưới
    bannerModal.addEventListener("click", (e) => {
      // 1. Nhấp vào nút X đóng
      if (e.target.closest(".banner-modal-close")) {
        e.preventDefault();
        e.stopPropagation();
        closeBanner();
        return;
      }

      // 2. Nhấp vào bất kỳ điểm nào trong ảnh/dialog -> KHÔNG ẩn đi, giữ nguyên
      if (e.target.closest(".banner-modal-dialog")) {
        return;
      }

      // 3. Nhấp ra ngoài ảnh (backdrop hoặc vùng trống ngoài dialog) -> tự động đóng banner
      e.preventDefault();
      e.stopPropagation();
      closeBanner();
    });

    // Chặn triệt để touchstart/pointerdown bên ngoài dialog lan truyền xuống trang dưới (loại bỏ ghost-clicks trên mobile)
    bannerModal.addEventListener("pointerdown", (e) => {
      if (!e.target.closest(".banner-modal-dialog")) {
        e.stopPropagation();
      }
    });

    // Đóng khi bấm phím Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && bannerModal.classList.contains("is-open")) {
        closeBanner();
      }
    });

    // Hiển thị banner sau khi trang tải xong (350ms để tạo hiệu ứng xuất hiện mượt mà)
    openBanner();
  }

  initBannerModal();

})();
