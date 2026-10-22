/* Navigation, smooth scroll helpers, and small UI enhancements */
(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

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

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  // Add a subtle shadow once the sticky header has moved away from the top.
  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

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

  // Reveal content as it enters the viewport, unless the user prefers reduced motion.
  const revealTargets = document.querySelectorAll(
    ".intro-strip-inner, .section-heading, .feature-card, .program-card, .timeline-item, " +
    ".instructor-image, .instructor-copy, .gallery-item, .enrollment-card, .faq-item, .lead-copy, .lead-form"
  );
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (revealTargets.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

    document.body.classList.add("js-reveal-ready");
    revealTargets.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      const siblings = element.parentElement.querySelectorAll(":scope > .reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min((siblings.length - 1) * 110, 330)}ms`);
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
})();
