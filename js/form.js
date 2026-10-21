/* Admissions lead form.
 * Demo mode is enabled until a real backend endpoint is configured.
 * Never put private API keys or secrets in frontend JavaScript.
 */
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
    consent: form.querySelector('[name="consent"]')
  };

  // Replace with your own backend endpoint, for example:
  // const API_ENDPOINT = "https://your-domain.vn/api/leads";
  const API_ENDPOINT = "";

  function setError(field, message) {
    const wrapper = field.closest(".form-field");
    const error = wrapper ? wrapper.querySelector(".field-error") : null;
    if (error) error.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function clearStatus() {
    status.textContent = "";
    status.className = "form-status";
  }

  function validate() {
    let valid = true;
    const name = fields.name.value.trim();
    const phone = fields.phone.value.trim();
    const course = fields.course.value;

    setError(fields.name, "");
    setError(fields.phone, "");
    setError(fields.course, "");
    document.querySelector(".consent-error").textContent = "";

    if (name.length < 2) {
      setError(fields.name, "Vui lòng nhập họ tên (ít nhất 2 ký tự).");
      valid = false;
    }

    // Accept common Vietnamese phone formats with optional spaces/dashes.
    const normalizedPhone = phone.replace(/[\s.-]/g, "");
    if (!/^(?:\+84|84|0)(?:\d){8,10}$/.test(normalizedPhone)) {
      setError(fields.phone, "Vui lòng nhập số điện thoại hợp lệ.");
      valid = false;
    }

    if (!course) {
      setError(fields.course, "Vui lòng chọn khóa học hoặc chọn cần tư vấn.");
      valid = false;
    }

    if (!fields.consent.checked) {
      document.querySelector(".consent-error").textContent =
        "Vui lòng xác nhận đồng ý để học viện liên hệ tư vấn.";
      valid = false;
    }

    return valid;
  }

  function getPayload() {
    return {
      name: fields.name.value.trim(),
      phone: fields.phone.value.trim(),
      course: fields.course.value,
      contact_time: form.elements.contact_time.value,
      consent: fields.consent.checked,
      source: "model-academy-landing-page",
      submitted_at: new Date().toISOString()
    };
  }

  async function submitLead(payload) {
    if (!API_ENDPOINT) {
      // Demo mode: do not pretend data has been saved or sent.
      console.info("[Model Academy demo] Form payload (not sent):", payload);
      return { demo: true };
    }

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Không thể gửi thông tin lúc này. Vui lòng thử lại sau.");
    }

    return { demo: false };
  }

  form.addEventListener("input", clearStatus);
  form.addEventListener("change", clearStatus);

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
      const result = await submitLead(getPayload());
      status.classList.add(result.demo ? "is-error" : "is-success");

      if (result.demo) {
        status.textContent =
          "Form đang ở chế độ demo: dữ liệu chưa được gửi hoặc lưu. Hãy cấu hình API_ENDPOINT trong js/form.js để nhận lead thực tế.";
      } else {
        status.textContent = "Cảm ơn bạn! Yêu cầu tư vấn đã được gửi thành công.";
        form.reset();
        form.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
          field.removeAttribute("aria-invalid");
        });
      }
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = error.message || "Có lỗi xảy ra. Vui lòng thử lại.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
})();
