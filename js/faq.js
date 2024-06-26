document.addEventListener('DOMContentLoaded', function() {
// ///////////////////////////////////////////////////////////////
// Sticky navigation
window.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.querySelector('.header');

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) {
        headerEl.classList.add('sticky');
      } else {
        headerEl.classList.remove('sticky');
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: '0px'  
    }
  );

  observer.observe(document.querySelector('.faq-hero'));
});

// Accordiooon

let allItemIcons = document.querySelectorAll(".item-icon");
for (let i = 0; i < allItemIcons.length; i++) {
  allItemIcons[i].addEventListener("click", function () {
    allItemIcons[i].parentElement.parentElement.classList.toggle(
      "accordion-item-open"
    );
  });
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});  
// new WOW().init();
 });


