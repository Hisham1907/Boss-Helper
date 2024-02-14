'use strict';
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const loginBtn = document.getElementById('login');
let users = [];
if (localStorage.getItem('users') !== null) {
  users = JSON.parse(localStorage.getItem('users'));
}
 
function signInHandler() {
  loginBtn.addEventListener('click', function () {
    for (let i = 0; i < users.length; i++) {
      if (emailInput.value == users[i].email &&passwordInput.value == users[i].password) {
        localStorage.setItem('name',users[i].name)
        localStorage.setItem('email',users[i].email)
        window.location.href = 'profile.html';
      }
    }
  });
}
signInHandler();



