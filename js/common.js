
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

  // Show the loader
  function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'flex';
       document.body.style.overflow = 'hidden';
     }
  }
  showLoader()
  // Hide the loader
  function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'none';
          document.body.style.overflow = 'visible';
  
    }
  }
  setTimeout(hideLoader,2500)

  // Arrow
  const arrow=document.querySelector('.arrow')
  arrow.addEventListener('click',()=>{
    arrow.classList.add('jump')
    setTimeout(function(){
      scroll(0,0)
      arrow.classList.remove('jump')

    },1000)

  })
  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  const arrow = document.querySelector(".arrow");
  if (document.body.scrollTop > window.innerHeight/2  || document.documentElement.scrollTop > window.innerHeight/2 ) {
    arrow.classList.add('arrow-show')
  } else {
    arrow.classList.remove('arrow-show')
  }
}
