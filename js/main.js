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

  // Reveal content as it enters the viewport (hỗ trợ cả cuộn xuống và từ dưới cuộn lên)
  const revealTargets = document.querySelectorAll(
    ".intro-strip-inner, .section-heading, .feature-card, .benefit-card, .program-card, .timeline-item, " +
    ".instructor-image, .instructor-copy, .gallery-item, .enrollment-card, .faq-item, .lead-copy, .lead-media, .lead-form, " +
    ".pillar-card, .audience-card, .program-detail-card, .value-card, .advantage-card, .challenges-callout, " +
    ".section-heading-split, .about-header, .gifts-slider-container"
  );
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealTargets.length && "IntersectionObserver" in window && !prefersReducedMotion) {
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
        threshold: 0.08,
        rootMargin: "-40px 0px -20px 0px"
      }
    );

    document.body.classList.add("js-reveal-ready");
    revealTargets.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      revealObserver.observe(element);
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

  // Gifts auto-scrolling infinite slider with Swiper CDN
  function initGiftsSwiper() {
    const giftsSliderViewport = document.querySelector(".gifts-slider-viewport");
    if (!giftsSliderViewport || typeof Swiper === "undefined") return;

    new Swiper(giftsSliderViewport, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      speed: 750,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".slider-next",
        prevEl: ".slider-prev",
      },
      pagination: {
        el: ".slider-dots",
        clickable: true,
        bulletClass: "slider-dot",
        bulletActiveClass: "is-active",
        renderBullet: function (index, className) {
          return '<button type="button" class="' + className + '" aria-label="Chuyển tới quà tặng ' + (index + 1) + '"></button>';
        },
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 18,
        },
        901: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1101: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGiftsSwiper);
  } else {
    initGiftsSwiper();
  }

})();
