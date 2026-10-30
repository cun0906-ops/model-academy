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

  // Gifts auto-scrolling infinite slider (vòng lặp vô tận mượt mà)
  const giftsSlider = document.querySelector(".gifts-slider-container");
  if (giftsSlider) {
    const track = giftsSlider.querySelector(".gifts-slider-track");
    const originalCards = track ? Array.from(track.querySelectorAll(".gift-card")) : [];
    const prevBtn = giftsSlider.querySelector(".slider-prev");
    const nextBtn = giftsSlider.querySelector(".slider-next");
    const dotsContainer = document.querySelector(".slider-dots");
    const viewport = giftsSlider.querySelector(".gifts-slider-viewport");

    if (track && originalCards.length && viewport) {
      const originalCount = originalCards.length; // 6 thẻ quà tặng
      const AUTO_PLAY_DELAY = 3500;
      let currentIndex = originalCount; // Bắt đầu tại thẻ thật đầu tiên (index = 6)
      let autoPlayTimer = null;
      let isTransitioning = false;
      let transitionSafetyTimer = null;

      // Nhân bản thẻ quà tặng để tạo vòng lặp vô tận mượt mà (không giật ngược)
      // Clones trước:
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.add("gift-card-clone");
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("a, button").forEach((el) => el.setAttribute("tabindex", "-1"));
        track.insertBefore(clone, originalCards[0]);
      });

      // Clones sau:
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.add("gift-card-clone");
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("a, button").forEach((el) => el.setAttribute("tabindex", "-1"));
        track.appendChild(clone);
      });

      // Tạo dots chỉ báo (6 dots tương ứng 6 quà tặng)
      function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = "";
        for (let i = 0; i < originalCount; i++) {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = `slider-dot${i === 0 ? " is-active" : ""}`;
          dot.setAttribute("aria-label", `Chuyển tới quà tặng ${i + 1}`);
          dot.addEventListener("click", () => {
            if (isTransitioning) return;
            goToDot(i);
            startAutoPlay();
          });
          dotsContainer.appendChild(dot);
        }
      }

      function updateDots() {
        if (!dotsContainer) return;
        const activeIdx = ((currentIndex - originalCount) % originalCount + originalCount) % originalCount;
        const dots = dotsContainer.querySelectorAll(".slider-dot");
        dots.forEach((dot, idx) => {
          dot.classList.toggle("is-active", idx === activeIdx);
        });
      }

      function updateSliderPosition() {
        const allCards = track.querySelectorAll(".gift-card");
        if (!allCards.length) return;
        const targetCard = allCards[currentIndex];
        const offset = targetCard ? targetCard.offsetLeft : 0;
        track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      }

      function setSlide(newIndex, animate) {
        if (!animate) {
          track.style.transition = "none";
          currentIndex = newIndex;
          updateSliderPosition();
          void track.offsetWidth; // Buộc trình duyệt cập nhật layout ngay lập tức
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              track.style.transition = "";
            });
          });
          updateDots();
          return;
        }

        isTransitioning = true;
        currentIndex = newIndex;
        track.style.transition = "";
        updateSliderPosition();
        updateDots();

        clearTimeout(transitionSafetyTimer);
        transitionSafetyTimer = setTimeout(() => {
          handleTransitionEnd();
        }, 950);
      }

      function handleTransitionEnd() {
        clearTimeout(transitionSafetyTimer);
        if (!isTransitioning) return;
        isTransitioning = false;

        // Dịch chuyển tức thời (teleport vô hình) khi ra khỏi phạm vi thẻ thật
        if (currentIndex >= 2 * originalCount) {
          // Trượt mượt qua thẻ 6 tới clone thẻ 1 -> reset về thẻ 1 thật
          currentIndex -= originalCount;
          track.style.transition = "none";
          updateSliderPosition();
          void track.offsetWidth;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              track.style.transition = "";
            });
          });
        } else if (currentIndex < originalCount) {
          // Lùi mượt qua thẻ 1 tới clone thẻ 6 -> reset về thẻ 6 thật
          currentIndex += originalCount;
          track.style.transition = "none";
          updateSliderPosition();
          void track.offsetWidth;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              track.style.transition = "";
            });
          });
        }
        updateDots();
      }

      track.addEventListener("transitionend", (e) => {
        if (e.target === track && e.propertyName === "transform") {
          handleTransitionEnd();
        }
      });

      function nextSlide() {
        if (isTransitioning) return;
        setSlide(currentIndex + 1, true);
      }

      function prevSlide() {
        if (isTransitioning) return;
        setSlide(currentIndex - 1, true);
      }

      function goToDot(targetDotIndex) {
        if (isTransitioning) return;
        const currentDotIndex = ((currentIndex - originalCount) % originalCount + originalCount) % originalCount;
        let diff = targetDotIndex - currentDotIndex;
        if (diff === 0) return;

        // Lựa chọn hướng xoay ngắn nhất
        if (diff > originalCount / 2) {
          diff -= originalCount;
        } else if (diff < -originalCount / 2) {
          diff += originalCount;
        }
        setSlide(currentIndex + diff, true);
      }

      function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_DELAY);
      }

      function stopAutoPlay() {
        if (autoPlayTimer) {
          clearInterval(autoPlayTimer);
          autoPlayTimer = null;
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          prevSlide();
          startAutoPlay();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          nextSlide();
          startAutoPlay();
        });
      }

      // Tạm dừng khi rê chuột và tiếp tục khi chuột rời đi
      giftsSlider.addEventListener("mouseenter", stopAutoPlay);
      giftsSlider.addEventListener("mouseleave", startAutoPlay);

      // Hỗ trợ cử chỉ vuốt chạm trên thiết bị di động (phát hiện vuốt ngang mượt mà)
      let touchStartX = 0;
      let touchStartY = 0;
      viewport.addEventListener(
        "touchstart",
        (e) => {
          stopAutoPlay();
          if (e.touches && e.touches.length) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
          }
        },
        { passive: true }
      );

      viewport.addEventListener(
        "touchend",
        (e) => {
          if (e.changedTouches && e.changedTouches.length) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            // Chỉ kích hoạt lướt nếu hướng vuốt ngang chiếm ưu thế
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
              if (diffX > 0) nextSlide();
              else prevSlide();
            }
          }
          startAutoPlay();
        },
        { passive: true }
      );

      // Tạm dừng slider khi chuyển tab trình duyệt
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopAutoPlay();
        else startAutoPlay();
      });

      // Tự động căn chỉnh khi thay đổi kích thước màn hình
      window.addEventListener("resize", () => {
        setSlide(currentIndex, false);
      });

      // Khởi tạo slider ở vị trí thẻ thật đầu tiên
      renderDots();
      setSlide(originalCount, false);
      startAutoPlay();
    }
  }

})();
