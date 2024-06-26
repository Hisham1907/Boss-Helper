document.addEventListener("DOMContentLoaded", function () {
  // Sticky navigation
  const headerEl = document.querySelector(".header");

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) {
        headerEl.classList.add("sticky");
      } else {
        headerEl.classList.remove("sticky");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "0px",
    }
  );
  observer.observe(document.querySelector(".founder"));

  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
  });

  // new WOW().init();
});

const hireMeBtn = document.querySelector("#hire-me-btn");
const senderName = document.querySelector("#sender-name");
const senderEmail = document.querySelector("#sender-email");
const senderMessage = document.querySelector("#sender-message");

function validateContactForm() {
  let isValid = true;
  if (senderName.value.trim() === "") {
    isValid = false;
    setError(senderName, "Name cannot be empty");
  } else {
    setSuccess(senderName);
  }
  if (!validateEmail(senderEmail.value.trim())) {
    isValid = false;
    setError(senderEmail, "Please enter a valid email address");
  } else {
    setSuccess(senderEmail);
  }
  if (senderMessage.value.trim() === "") {
    isValid = false;
    setError(senderMessage, "Message cannot be empty");
  } else {
    setSuccess(senderMessage);
  }
  return isValid;
}

function setError(element, message) {
  element.classList.add("error");
  tippy(element, {
    content: message,
    trigger: "manual",
    placement: "bottom",
    theme: "errorTooltip",
  }).show();
}

function setSuccess(element) {
  element.classList.remove("error");
  tippy(element).hide();
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

hireMeBtn.addEventListener("click", function () {
  if (validateContactForm()) {
    emailjs.init("zwhD-oYnIoGdqKG4Q");
    const senderData = {
      from_name: senderName.value,
      from_email: senderEmail.value,
      message: senderMessage.value,
    };
    const serviceId = "service_87lbcgc";
    const templateId = "template_cawi0xo";
    emailjs
      .send(serviceId, templateId, senderData)
      .then((res) => {
        Swal.fire({
          text: "Email sent successfully",
          icon: "success",
        });
        clear();
      })
      .catch((err) => {
        Swal.fire({
          text: "Something went wrong, please try again later!",
          icon: "error",
        });
      });
  } else {
    Swal.fire({
      text: "Please fix all the errors to proceed!",
      icon: "error",
    }).then(() => validateContactForm());
  }
});
function clear() {
  senderName.value = "";
  senderEmail.value = "";
  senderMessage.value = "";
}
