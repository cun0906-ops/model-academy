/* ==========================================================================
   CONTENT.JS - Xử lý nội dung chi tiết các chương trình đào tạo
   ADA Talent Academy
   ========================================================================== */
(() => {
  "use strict";

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderIntroduction(details) {
    return `<div class="roadmap-panel-copy">${details.intro.map((block) => {
      if (block.type === "list") {
        return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      }
      const tag = block.type === "heading" ? "h4" : "p";
      return `<${tag}>${escapeHtml(block.text)}</${tag}>`;
    }).join("")}</div>`;
  }

  function renderCurriculum(program, details) {
    const headings = ["STT", "Chuyên đề", "Số buổi", "Số tiết"];
    const columnGroup = `
      <colgroup>
        <col class="roadmap-col-index">
        <col>
        <col class="roadmap-col-count" span="2">
      </colgroup>`;
    const topics = [...program.sessions];
    if (details.extraTopic) topics.push(details.extraTopic);

    const rows = topics.map((topic, index) => {
      const isClass = index < program.sessions.length;
      return `<tr>
        <td>${index + 1}</td>
        <th scope="row">${escapeHtml(topic)}<em lang="en">${escapeHtml(details.translations[index])}</em></th>
        <td>${isClass ? "01" : "**"}</td>
        <td>${isClass ? String(details.periodsPerSession).padStart(2, "0") : "**"}</td>
      </tr>`;
    }).join("");

    return `
      <div class="roadmap-curriculum-frame">
        <div class="roadmap-curriculum-scroll" tabindex="0" role="region" aria-label="Bảng nội dung chương trình">
          <div class="roadmap-curriculum-sticky-heading" aria-hidden="true">
            <table class="roadmap-table roadmap-curriculum-heading">
              ${columnGroup}
              <thead><tr>${headings.map((heading) => `<th scope="col">${heading}</th>`).join("")}</tr></thead>
            </table>
          </div>
          <table class="roadmap-table roadmap-curriculum-table" aria-label="Nội dung chương trình">
            ${columnGroup}
            <thead class="sr-only"><tr>${headings.map((heading) => `<th scope="col">${heading}</th>`).join("")}</tr></thead>
            <tbody>${rows}</tbody>
            <tfoot><tr><th scope="row">Tổng</th>
              <td></td>
              <td>${String(program.sessions.length).padStart(2, "0")}</td>
              <td>${program.sessions.length * details.periodsPerSession}</td>
            </tr></tfoot>
          </table>
        </div>
      </div>
      <p class="roadmap-panel-note">${escapeHtml(details.curriculumNote)}</p>`;
  }

  function renderSchedule(program, details) {
    const { schedule } = details;
    const pending = "Sẽ cập nhật";

    return `
      <div class="roadmap-table-scroll" tabindex="0" role="region" aria-label="Bảng lịch khai giảng">
        <table class="roadmap-table roadmap-schedule-table">
          <caption>Lịch khai giảng</caption>
          <thead><tr><th scope="col">Khóa</th><th scope="col">Ngày khai giảng</th><th scope="col">Lịch học</th><th scope="col">Thời gian</th><th scope="col">Hình thức / Địa điểm</th></tr></thead>
          <tbody>
            <tr>
              <th scope="row">K01</th>
              <td>${escapeHtml(schedule.date || pending)}</td>
              <td>${escapeHtml(schedule.days).replaceAll("\n", "<br>")}</td>
              <td>${escapeHtml(schedule.time || pending).replaceAll("\n", "<br>")}</td>
              <td>${escapeHtml(schedule.location)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="roadmap-schedule-notes">
        <li><strong>Hình thức</strong> — ${escapeHtml(schedule.format)}</li>
        <li><strong>Thời lượng</strong> — ${escapeHtml(schedule.duration)}</li>
        <li><strong>Học phí</strong> — ${escapeHtml(program.priceNew)}. ${escapeHtml(schedule.tuitionNote)}</li>
        <li><strong>Đăng ký</strong> — Hotline/Zalo <a href="tel:0918371032">0918 371 032</a> · ADA Talent Academy</li>
      </ul>`;
  }

  function renderExpertProfile({ name, roles, photo, summary, sections }) {
    const sectionMarkup = sections.map(({ title, items }) => `
      <section>
        <h5>${escapeHtml(title)}</h5>
        <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>`).join("");

    return `
      <article class="roadmap-expert">
        <header class="roadmap-expert-identity">
          <img class="roadmap-expert-photo" src="${escapeHtml(photo.src)}" width="${photo.size}" height="${photo.size}"
            alt="${escapeHtml(photo.alt)}" decoding="async">
          <div>
            <h4>${escapeHtml(name)}</h4>
            <p class="roadmap-expert-roles">${escapeHtml(roles)}</p>
          </div>
        </header>
        <div class="roadmap-expert-details">
          <p class="roadmap-expert-summary">${escapeHtml(summary)}</p>
          ${sectionMarkup}
        </div>
      </article>`;
  }

  function initRoadmapModal() {
    const modal = document.querySelector("#roadmap-modal");
    if (!modal) return;

    const badgeEl = modal.querySelector("#roadmap-badge");
    const titleEl = modal.querySelector("#roadmap-title");
    const descEl = modal.querySelector("#roadmap-desc");
    const panel = modal.querySelector("#roadmap-panel");
    const dialog = modal.querySelector(".roadmap-modal-dialog");
    const closeButton = modal.querySelector(".roadmap-modal-close");
    const priceOldEl = modal.querySelector("#roadmap-footer-old");
    const priceDealEl = modal.querySelector("#roadmap-footer-deal");
    const priceSaveEl = modal.querySelector("#roadmap-footer-save");
    const enrollBtn = modal.querySelector("#roadmap-enroll-btn");
    const tabs = [...modal.querySelectorAll("[data-roadmap-tab]")];
    const courseSelect = document.querySelector("#course");

    let currentProgramId;
    let opener;

    const renderers = {
      intro: (_program, details) => renderIntroduction(details),
      content: renderCurriculum,
      schedule: renderSchedule,
      experts: (program) => program.experts.map((expertId) => renderExpertProfile(ROADMAP_EXPERT_PROFILES[expertId])).join("")
    };

    function selectTab(selectedTab) {
      tabs.forEach((tab) => {
        const isActive = tab === selectedTab;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      const renderPanel = renderers[selectedTab.dataset.roadmapTab];
      panel.innerHTML = renderPanel(ROADMAP_DATA[currentProgramId], ROADMAP_DETAILS[currentProgramId]);
      panel.setAttribute("aria-labelledby", selectedTab.id);
      panel.scrollTop = 0;
      dialog.scrollTop = 0;
    }

    function openModal(button) {
      const programId = button.dataset.openRoadmap;
      const data = ROADMAP_DATA[programId];
      if (!data || !ROADMAP_DETAILS[programId]) return;
      currentProgramId = programId;
      opener = button;

      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.tagline;
      if (priceOldEl) priceOldEl.textContent = data.priceOld;
      if (priceDealEl) priceDealEl.textContent = data.priceNew;
      if (priceSaveEl) priceSaveEl.textContent = data.saveText;

      if (enrollBtn) enrollBtn.dataset.course = data.courseCode;
      selectTab(tabs[0]);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("roadmap-modal-open");
      tabs[0].focus({ preventScroll: true });
    }

    function closeModal(focusTarget = opener) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("roadmap-modal-open");
      focusTarget?.focus({ preventScroll: true });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectTab(tab));
      tab.addEventListener("keydown", (event) => {
        const positions = {
          ArrowLeft: (index + tabs.length - 1) % tabs.length,
          ArrowRight: (index + 1) % tabs.length,
          Home: 0,
          End: tabs.length - 1
        };
        if (!Object.hasOwn(positions, event.key)) return;
        event.preventDefault();
        const next = tabs[positions[event.key]];
        selectTab(next);
        next.focus({ preventScroll: true });
      });
    });

    // Nút "Chi tiết lộ trình" trên từng thẻ chương trình Section 06
    document.querySelectorAll("[data-open-roadmap]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(btn);
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
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") {
        closeModal();
      }
      if (e.key === "Tab" && e.shiftKey && document.activeElement === closeButton) {
        e.preventDefault();
        enrollBtn.focus();
      }
      if (e.key === "Tab" && !e.shiftKey && document.activeElement === enrollBtn) {
        e.preventDefault();
        closeButton.focus();
      }
    });

    // Bấm "Đăng ký khóa học này" trong popup: chọn khóa học trong form và cuộn xuống
    enrollBtn.addEventListener("click", () => {
      const courseCode = enrollBtn.dataset.course;
      if (courseSelect && courseCode) {
        courseSelect.value = courseCode;
        courseSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
      closeModal(courseSelect || opener);
    });
  }

  // Khởi chạy khi DOM sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRoadmapModal);
  } else {
    initRoadmapModal();
  }
})();
