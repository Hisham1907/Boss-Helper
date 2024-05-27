document.addEventListener('DOMContentLoaded', function() {
 
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
// Video
     const video = document.getElementById("teamVideo");
    const playPauseBtn = document.getElementById("playPauseBtn");
    video.paused=true;
    playPauseBtn.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause "></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play "></i>';
        }
    });

    video.addEventListener("ended", function() {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play "></i>';
    });
 

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
  
    observer.observe(document.querySelector('.about'));
  });
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });

  
  new WOW().init();
 });

