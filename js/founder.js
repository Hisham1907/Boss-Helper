document.addEventListener("DOMContentLoaded", function () {
  // ///////////////////////////////////////////////////////////////
  // Sticky navigation
  window.addEventListener("DOMContentLoaded", () => {
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
  });
  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
  });

  new WOW().init();
});

const hireMeBtn = document.querySelector("#hire-me-btn");
const senderName = document.querySelector("#sender-name");
const senderEmail = document.querySelector("#sender-email");
const senderMessage = document.querySelector("#sender-message");

hireMeBtn.addEventListener("click", function () {
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
    .then((res) => alert("Email sent successfully"))
    .catch((err) => console.error("Failed to send email:", err));
  });
