let btnNav=document.querySelector('.btn-mobile-nav');
let header=document.querySelector('.header');

btnNav.addEventListener('click', function(){
  header.classList.toggle('nav-open');
})


let links=document.querySelectorAll('a');
 links.forEach(link => {
  link.addEventListener('click',function(){
 if(link.classList.contains('main-list-link')){
  header.classList.toggle('nav-open');
  }
  })
});
 
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");
    const headerEl = document.querySelector(".header");

    const obs = new IntersectionObserver(
        function (entries) {
            const ent = entries[0];

            if (ent.isIntersecting === false) {
                headerEl.classList.add("sticky");
            } else {
                headerEl.classList.remove("sticky");
            }
        },
        {
            root: null,
            threshold: 0,
            rootMargin: "-80px",
        }
    );

    obs.observe(sectionHeroEl);

let allItemIcons=document.querySelectorAll('.item-icon');
 for(let i=0;i<allItemIcons.length;i++){
  allItemIcons[i].addEventListener('click',function(){
    allItemIcons[i].parentElement.parentElement.classList.toggle('accordion-item-open')
  })
 }

 