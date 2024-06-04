const users = JSON.parse(localStorage.getItem('users'));
const userName = localStorage.getItem('name');
const userEmail = localStorage.getItem('email');
const currentUser = users.find(user => user.name === userName && user.email === userEmail);
function displayProfile(){
    const profileContent = document.querySelector('#profile-name');
profileContent.textContent = currentUser.name;
const profileImg = document.querySelector('.profile-img img');
profileImg.src = currentUser.img?currentUser.img:'img/user.jpg';
}
displayProfile()
// Aside toggle btn Large Screen
const toggleBtn = document.querySelector('#toggle-btn');
const aside = document.querySelector('aside');
let isAsideActive = false;

if (localStorage.getItem('isAsideActive') !== null) {
    isAsideActive = JSON.parse(localStorage.getItem('isAsideActive'));
     if (isAsideActive) {
        aside.classList.add('aside-closed');
    } else {
        aside.classList.remove('aside-closed');
    }
}
 toggleBtn.addEventListener('click', function () {
     isAsideActive = !isAsideActive;
    localStorage.setItem('isAsideActive', JSON.stringify(isAsideActive)); // Store the updated value
     aside.classList.toggle('aside-closed');
});
// Aside toggle btn Small Screen
const body = document.querySelector('body');
const overlay=document.querySelector('.overlay')
const asideToggle=document.querySelector('.aside-toggle')
asideToggle.addEventListener('click',function(){
  aside.classList.add('aside-closed');
  body.classList.toggle('aside-open');
})
overlay.addEventListener('click',function(){
   body.classList.remove('aside-open');
})


// Dark & Light Mode

const modeToggle = document.getElementById("mode-toggle");
const modeText = document.querySelector(".mode-text");
const loader = document.getElementById('loader');

let isChecked = false;
 
if(localStorage.getItem('isChecked')!=null){
  isChecked=JSON.parse(localStorage.getItem('isChecked'))
   modeToggle.checked=isChecked;
  if(isChecked){
    loader.classList.add("loader-light-theme");
    document.body.classList.add("light-theme");
    modeText.textContent = "Light Mode";
    document.querySelector(".fa-sun").style.display = "block";
    document.querySelector(".fa-moon").style.display = "none";
  }
  else{
    loader.classList.remove("loader-light-theme");
    document.body.classList.remove("light-theme");
    modeText.textContent = "Dark Mode";
    document.querySelector(".fa-sun").style.display = "none";
    document.querySelector(".fa-moon").style.display = "block";
  }
}
modeToggle.addEventListener("change", function () {
  if (this.checked) {
    isChecked = true;
    localStorage.setItem('isChecked',JSON.stringify(isChecked))
    document.body.classList.add("light-theme");
    modeText.textContent = "Light Mode";
    document.querySelector(".fa-sun").style.display = "block";
    document.querySelector(".fa-moon").style.display = "none";
  } else {
    isChecked = false;
    localStorage.setItem('isChecked',JSON.stringify(isChecked))

    document.body.classList.remove("light-theme");
    modeText.textContent = "Dark Mode";
    document.querySelector(".fa-sun").style.display = "none";
    document.querySelector(".fa-moon").style.display = "block";
  }
});


toastr.options = {
  "closeButton": true,
  } 

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