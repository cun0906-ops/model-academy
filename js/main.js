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

  // Current year in footer.
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Course cards can preselect a course in the admissions form.
  const courseSelect = document.querySelector("#course");
  document.querySelectorAll("[data-course]").forEach((link) => {
    link.addEventListener("click", () => {
      if (courseSelect) courseSelect.value = link.dataset.course || "";
    });
  });
})();
