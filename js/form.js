/* Admissions lead form. Never put private API keys or secrets in frontend JavaScript. */
(() => {
  "use strict";

  const form = document.querySelector("#admissions-form");
  if (!form) return;

  const status = document.querySelector("#form-status");
  const submitButton = form.querySelector('button[type="submit"]');
  const fields = {
    name: form.querySelector('[name="name"]'),
    phone: form.querySelector('[name="phone"]'),
    course: form.querySelector('[name="course"]'),
    learningGoal: form.querySelector('[name="learning_goal"]'),
    consent: form.querySelector('[name="consent"]')
  };
  const consentError = form.querySelector(".consent-error");

  const API_ENDPOINT = "https://model-academy.cun09062.workers.dev/api/leads";

  function setError(field, message) {
    if (!field) return;
    const wrapper = field.closest(".form-field");
    const error = wrapper ? wrapper.querySelector(".field-error") : null;
    if (error) error.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function clearStatus() {
    if (status) {
      status.textContent = "";
      status.className = "form-status";
    }
  }

  /**
   * Ngăn chặn người dùng nhập 2 dấu cách liên tiếp và dấu cách ở đầu chuỗi
   */
  function applyNoConsecutiveSpaces(field) {
    if (!field) return;

    // Ngăn chặn phím Space nếu con trỏ ở vị trí 0 hoặc ký tự trước đó là Space
    field.addEventListener("keydown", (e) => {
      if (e.key === " " || e.code === "Space") {
        const pos = field.selectionStart;
        const val = field.value;
        if (pos === 0 || (pos > 0 && val[pos - 1] === " ")) {
          e.preventDefault();
        }
      }
    });

    // Xử lý sự kiện input (cho paste, autofill, bộ gõ tiếng Việt)
    field.addEventListener("input", () => {
      const oldVal = field.value;
      const start = field.selectionStart;
      // Không cho dấu cách ở đầu và không cho 2 dấu cách liên tiếp
      const newVal = oldVal.replace(/^\s+/, "").replace(/ {2,}/g, " ");
      if (oldVal !== newVal) {
        field.value = newVal;
        const diff = oldVal.length - newVal.length;
        const newPos = Math.max(0, start - diff);
        field.setSelectionRange(newPos, newPos);
      }
      setError(field, "");
      clearStatus();
    });

    // Khi người dùng rời khỏi ô input, loại bỏ dấu cách thừa ở cuối chuỗi
    field.addEventListener("blur", () => {
      field.value = field.value.trim();
    });
  }

  /**
   * Chỉ cho phép nhập số (0-9) vào ô Số điện thoại
   */
  function applyDigitsOnly(field) {
    if (!field) return;

    // Chặn phím không phải chữ số (cho phép các phím điều hướng & thao tác hệ thống)
    field.addEventListener("keydown", (e) => {
      if (
        [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
          "Enter",
          "Home",
          "End"
        ].includes(e.key) ||
        e.ctrlKey ||
        e.metaKey
      ) {
        return;
      }

      // Chặn dấu cách (Space)
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        return;
      }

      // Chặn mọi ký tự không phải số 0-9
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });

    // Xử lý sự kiện input (chặn paste chữ, ký tự lạ, dấu cách)
    field.addEventListener("input", () => {
      const oldVal = field.value;
      const start = field.selectionStart;
      // Chỉ giữ lại chữ số 0-9 và giới hạn tối đa 10 chữ số
      let newVal = oldVal.replace(/\D/g, "");
      if (newVal.length > 10) {
        newVal = newVal.slice(0, 10);
      }
      if (oldVal !== newVal) {
        field.value = newVal;
        const diff = oldVal.length - newVal.length;
        const newPos = Math.max(0, start - diff);
        field.setSelectionRange(newPos, newPos);
      }
      setError(field, "");
      clearStatus();
    });
  }

  // Áp dụng ràng buộc cho các trường
  applyNoConsecutiveSpaces(fields.name);
  applyNoConsecutiveSpaces(fields.learningGoal);
  applyDigitsOnly(fields.phone);

  if (fields.course) {
    fields.course.addEventListener("change", () => {
      setError(fields.course, "");
      clearStatus();
    });
  }

  if (fields.consent) {
    fields.consent.addEventListener("change", () => {
      consentError.textContent = "";
      fields.consent.setAttribute("aria-invalid", "false");
      clearStatus();
    });
  }

  function validate() {
    let valid = true;
    const name = fields.name.value.trim();
    const phone = fields.phone.value.trim();
    const course = fields.course.value;

    setError(fields.name, "");
    setError(fields.phone, "");
    setError(fields.course, "");
    if (fields.learningGoal) setError(fields.learningGoal, "");
    consentError.textContent = "";
    fields.consent.setAttribute("aria-invalid", "false");

    // 1. Kiểm tra Họ và tên
    if (name.length < 2) {
      setError(fields.name, "Vui lòng nhập họ và tên (ít nhất 2 ký tự).");
      valid = false;
    } else if (/\s{2,}/.test(fields.name.value)) {
      setError(fields.name, "Họ và tên không được chứa 2 dấu cách liên tiếp.");
      valid = false;
    }

    // 2. Kiểm tra Số điện thoại (chỉ số, 10 chữ số, bắt đầu bằng số 0)
    if (!phone) {
      setError(fields.phone, "Vui lòng nhập số điện thoại.");
      valid = false;
    } else if (!/^\d+$/.test(phone)) {
      setError(fields.phone, "Số điện thoại chỉ được chứa các chữ số.");
      valid = false;
    } else if (!/^0\d{9}$/.test(phone)) {
      setError(fields.phone, "Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số (bắt đầu bằng số 0).");
      valid = false;
    }

    // 3. Kiểm tra Mục tiêu / nhu cầu học tập (nếu có nhập)
    if (fields.learningGoal && /\s{2,}/.test(fields.learningGoal.value)) {
      setError(fields.learningGoal, "Mục tiêu học tập không được chứa 2 dấu cách liên tiếp.");
      valid = false;
    }

    // 4. Kiểm tra Khóa học
    if (!course) {
      setError(fields.course, "Vui lòng chọn chương trình quan tâm.");
      valid = false;
    }

    // 5. Kiểm tra Xác nhận đồng ý
    if (!fields.consent.checked) {
      consentError.textContent =
        "Vui lòng xác nhận đồng ý để học viện liên hệ tư vấn.";
      fields.consent.setAttribute("aria-invalid", "true");
      valid = false;
    }

    return valid;
  }

  function getPayload() {
    return {
      name: fields.name.value.trim(),
      phone: fields.phone.value.trim(),
      course: fields.course.value,
      learning_goal: fields.learningGoal ? fields.learningGoal.value.trim() : "",
      contact_time: form.elements.contact_time ? form.elements.contact_time.value : "any",
      consent: fields.consent.checked,
      source: "model-academy-landing-page",
      submitted_at: new Date().toISOString()
    };
  }

  // Nhận diện môi trường local / dev / preview nội bộ
  const isLocalEnv = Boolean(
    !window.location.hostname ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.protocol === "file:" ||
    /^192\.168\./.test(window.location.hostname) ||
    /^10\./.test(window.location.hostname) ||
    window.location.hostname.endsWith(".local")
  );

  async function submitLead(payload) {
    // 1. Khi chạy ở môi trường local / Live Server hoặc mở file trực tiếp:
    // Do Cloudflare Worker chỉ chấp nhận origin https://adaacademy.tech (CORS 403),
    // ta sẽ mô phỏng gửi thành công để kiểm tra đầy đủ UI/UX và logic form.
    if (isLocalEnv && !window.__API_ENDPOINT__) {
      console.info(
        "%c[ADA Talent Academy - Thử nghiệm Local]%c Đang chạy trên môi trường nội bộ. Đã giả lập gửi yêu cầu thành công:\n",
        "color: #c59b27; font-weight: bold;",
        "color: inherit;",
        payload
      );
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { ok: true, simulated: true };
    }

    // 2. Gửi request lên API Worker
    let response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // 3. Cơ chế tương thích ngược (Fallback):
    // Nếu Worker trên Cloudflare chưa deploy bản cập nhật khóa học mới và trả về HTTP 400,
    // tự động ánh xạ sang schema cũ để gửi lead thành công mà không làm gián đoạn người dùng.
    if (
      !response.ok &&
      response.status === 400 &&
      [
        "kol_koc",
        "branding_model",
        "personal_image",
        "kol_branding",
        "model_image",
        "undetermined"
      ].includes(payload.course)
    ) {
      const legacyCourseMap = {
        kol_koc: "skills",
        branding_model: "skills",
        personal_image: "foundation",
        kol_branding: "skills",
        model_image: "foundation",
        undetermined: "unknown"
      };
      const fallbackPayload = {
        ...payload,
        course: legacyCourseMap[payload.course] || "unknown",
        learning_goal: ""
      };
      response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fallbackPayload)
      });
    }

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      throw new Error(result?.error || "Không thể gửi thông tin lúc này. Vui lòng thử lại sau.");
    }

    return await response.json().catch(() => ({ ok: true }));
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearStatus();

    if (!validate()) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = "Đang xử lý...";

    try {
      await submitLead(getPayload());
      status.classList.add("is-success");
      status.textContent = "Cảm ơn bạn! Yêu cầu tư vấn đã được gửi thành công.";
      form.reset();
      form.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
        field.removeAttribute("aria-invalid");
      });
    } catch (error) {
      status.classList.add("is-error");
      if (error.name === "TypeError" || error.message === "Failed to fetch") {
        if (isLocalEnv) {
          status.classList.remove("is-error");
          status.classList.add("is-success");
          status.textContent = "Cảm ơn bạn! Yêu cầu tư vấn đã được gửi thành công.";
          form.reset();
          return;
        }
        status.textContent =
          "Không thể kết nối đến máy chủ tiếp nhận. Vui lòng kiểm tra lại kết nối mạng hoặc liên hệ qua Hotline/Zalo: 088 629 1909.";
      } else {
        status.textContent = error.message || "Có lỗi xảy ra. Vui lòng thử lại.";
      }
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
})();
