const profileContent = document.querySelector('#profile-name');
profileContent.innerHTML = `${localStorage.getItem('name')}  `;
// Aside toggle btn
const toggleBtn = document.querySelector('#toggle-btn');
const aside = document.querySelector('aside');
let isAsideActive = false;

 if (localStorage.getItem('isAsideActive') !== null) {
     isAsideActive = JSON.parse(localStorage.getItem('isAsideActive'));
    console.log(isAsideActive);
     if (isAsideActive) {
        aside.classList.add('aside-active');
    } else {
        aside.classList.remove('aside-active');
    }
}

 toggleBtn.addEventListener('click', function () {
    isAsideActive = !isAsideActive;  
    localStorage.setItem('isAsideActive', JSON.stringify(isAsideActive)); // Store the updated value
    console.log(isAsideActive);
     aside.classList.toggle('aside-active');
});


// Dark & Light Mode

const modeToggle = document.getElementById("mode-toggle");
const modeText = document.querySelector(".mode-text");
let isChecked = false;
 
if(localStorage.getItem('isChecked')!=null){
  isChecked=JSON.parse(localStorage.getItem('isChecked'))
  console.log(isChecked)
  modeToggle.checked=isChecked;
  if(isChecked){
    document.body.classList.add("light-theme");
    modeText.textContent = "Light Mode";
    document.querySelector(".fa-sun").style.display = "block";
    document.querySelector(".fa-moon").style.display = "none";
  }
  else{
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

