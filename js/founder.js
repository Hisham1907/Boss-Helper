// Mobile Nav
let btnNav = document.querySelector(".btn-mobile-nav");
let header = document.querySelector(".header");

btnNav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

let links = document.querySelectorAll("a");
links.forEach((link) => {
  link.addEventListener("click", function () {
    if (link.classList.contains("main-list-link")) {
      header.classList.toggle("nav-open");
    }
  });
});
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

  observer.observe(document.querySelector('.founder'));
});