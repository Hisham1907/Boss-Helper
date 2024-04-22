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

  observer.observe(document.querySelector('.home'));
});
// Why Section Accordion
let whyAccordion=document.querySelector('.why-accordion')
let whyAccordionSelection=document.querySelectorAll('.why-acc-selection')

whyAccordionSelection.forEach(function(acc){
  acc.addEventListener('click',function(){
    acc.parentElement.classList.toggle('acc-active')
  })
})




const storiesData = [
  {
    title: "TechNova — Shaping Tomorrow",
    boss: `<strong>Boss :</strong> Jennifer Smith`,
    imageUrl: "img/Sucess/sucess-1.webp",
    story: [
      `Empowered by Boss Helper, Jennifer Smith led a tech revolution at TechNova.`,
      `Utilizing advanced tools and strategies, her team enhanced project management, increasing productivity, reducing errors, and fostering collaboration.`,
      `Notably, TechNova improved efficiency by 30%, optimizing workflow.`,
      `Today, TechNova pioneers innovation, shaping tomorrow's tech landscape.`,
    ],
  },
  {
    title: "InnovateX — Redefining Innovation",
    boss: `<strong>Boss :</strong> Mark Johnson`,
    imageUrl: "img/Sucess/sucess-2.webp",
    story: [
      `Mark Johnson, the innovative CEO of InnovateX, redefined innovation in the industry.`,
      `Through efficient communication and streamlined project coordination, InnovateX achieved remarkable milestones, setting new standards for innovation and excellence.`,
      `Notably, InnovateX improved efficiency by 30%, optimizing workflow.`,
      `Today, InnovateX pioneers innovation, shaping tomorrow's tech landscape.`,
    ],
  },
  {
    title: "AgileTech — Mastering Efficiency",
    boss: `<strong>Boss :</strong> Sarah Lee`,
    imageUrl: "img/Sucess/sucess-3.webp",
    story: [
      `Sarah Lee, the dynamic leader of AgileTech, mastered efficiency with Boss Helper.`,
      `Optimizing task delegation and improving workflow processes, AgileTech surpassed project goals.`,
      `Utilizing Boss Helper, AgileTech improved collaboration, productivity, and reduced errors.`,
      `Today, AgileTech leads the industry in mastering efficiency.`,
    ],
  },
  {
    title: "TechSwift — Fostering Collaboration",
    boss: `<strong>Boss :</strong> Michael Smith`,
    imageUrl: "img/Sucess/sucess-4.webp",
    story: [
      `Michael Smith fostered collaboration and boosted team morale at TechSwift with Boss Helper.`,
      `Enhanced transparency and project tracking solutions led to remarkable success.`,
      `Utilizing Boss Helper, TechSwift optimized workflows, resulting in improved efficiency.`,
      `Today, TechSwift stands as a pioneer of collaborative innovation.`,
    ],
  },
  {
    title: "SparkTech — Accelerating Growth",
    boss: `<strong>Boss :</strong> Emily Johnson`,
    imageUrl: "img/Sucess/sucess-5.webp",
    story: [
      `Emily Johnson accelerated growth at SparkTech with streamlined workflows and real-time analytics.`,
      `Leveraging Boss Helper, SparkTech achieved faster project execution and solidified its position as a leader.`,
      `Improved project execution speed and decision-making enabled rapid growth and success.`,
      `Today, SparkTech continues to accelerate growth and shape the future of technology.`,
    ],
  },
  {
    title: "Apex Solutions — Achieving Seamlessness",
    boss: `<strong>Boss :</strong> Sara & Jane`,
    imageUrl: "img/Sucess/sucess-6.webp",
    story: [
      `Sara & Jane seamlessly integrated Boss Helper at Apex Solutions, achieving unparalleled success.`,
      `Improved efficiency and reduced costs enabled Apex Solutions to deliver seamless experiences.`,
      `Through the seamless integration of Boss Helper, Apex Solutions drives innovation and success.`,
      `Today, Apex Solutions leads in achieving seamlessness and setting new standards.`,
    ],
  },
];
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal-close");
let modalLayer = document.querySelector(".modal-layer");
let allImgLayers = document.querySelectorAll(".img-layer");
let modalTitle = document.querySelector(".modal-title");
let bossName = document.querySelector(".boss-name");
let modalImg = document.querySelector(".modal-img");
let p1 = document.querySelector(".p-1");
let p2 = document.querySelector(".p-2");
let p3 = document.querySelector(".p-3");
let p4 = document.querySelector(".p-4");
let nextBtn = document.querySelector(".next-btn ");
let prevBtn = document.querySelector(".prev-btn ");
let allStoryBtns = document.querySelectorAll(".read-more-btn");
let currentIndex = 0;
for (let i = 0; i < allImgLayers.length; i++) {
  allImgLayers[i].addEventListener("click", function () {
    currentIndex = i;
    displayModal(i);
  });
}
for (let i = 0; i < allStoryBtns.length; i++) {
  allStoryBtns[i].addEventListener("click", function () {
    currentIndex = i;
    displayModal(i);
  });
}
function closeModal() {
  modalLayer.classList.remove("view-modal-layer");
  modal.classList.remove("view-modal");
}
function getNext() {
  // currentIndex++;
  // if(currentIndex==allImgLayers.length)
  // currentIndex=0;
  currentIndex = (currentIndex + 1) % allImgLayers.length;
  displayModal(currentIndex);
}
function getPrev() {
  currentIndex = (currentIndex - 1 + allImgLayers.length) % allImgLayers.length;
  displayModal(currentIndex);
}
document.addEventListener("keydown", function (e) {
  if (modal.classList.contains("view-modal")) {
    if (e.key == "ArrowRight") getNext();
    if (e.key == "ArrowLeft") getPrev();
    if (e.key == "Escape") closeModal();
  }
});
function displayModal(i) {
  modalLayer.classList.add("view-modal-layer");
  modal.classList.add("view-modal");

  modalTitle.innerHTML = storiesData[i].title;
  bossName.innerHTML = storiesData[i].boss;
  modalImg.src = storiesData[i].imageUrl;
  p1.innerHTML = storiesData[i].story[0];
  p2.innerHTML = storiesData[i].story[1];
  p3.innerHTML = storiesData[i].story[2];
  p4.innerHTML = storiesData[i].story[3];
}
modalClose.addEventListener("click", function () {
  closeModal();
});
nextBtn.addEventListener("click", function () {
  getNext();
});
prevBtn.addEventListener("click", function () {
  getPrev();
});
document.addEventListener("keydown", function (e) {
  console.log(e);
});
modalLayer.addEventListener("click", function (e) {
  if (e.target == modalLayer) closeModal();
});

const heroImages=['img/hero-1.jpg','img/hero-2.jpg','img/hero-3.jpeg']
let heroImg=document.querySelector('.hero-img')
let heroPrev=document.querySelector('.hero-prev')
let heroNext=document.querySelector('.hero-next')
let currIndex=0;
heroNext.addEventListener('click',function(){
currIndex=(currIndex+1)%heroImages.length;
 heroImg.setAttribute('src',heroImages[currIndex])
})
heroPrev.addEventListener('click',function(){
currIndex=((currIndex-1)+heroImages.length)%heroImages.length;
heroImg.setAttribute('src',heroImages[currIndex])

})








