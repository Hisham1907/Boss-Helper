const profileContent = document.querySelector('#profile-name');
profileContent.innerHTML = `${localStorage.getItem('name')}  `;
 
// Aside toggle btn
let toggleBtn=document.querySelector('#toggle-btn');
let aside=document.querySelector('aside')
toggleBtn.addEventListener('click',function(){
    aside.classList.toggle('aside-active')
 })
// Dark Mode

const modeToggle = document.getElementById('mode-toggle');
const modeText = document.querySelector('.mode-text');

modeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('light-theme');
        modeText.textContent = 'Light Mode';
        document.querySelector('.fa-sun').style.display='block'
        document.querySelector('.fa-moon').style.display='none'
    } else {
        document.body.classList.remove('light-theme');
        modeText.textContent = 'Dark Mode';
        document.querySelector('.fa-sun').style.display='none'
        document.querySelector('.fa-moon').style.display='block'
    }
});