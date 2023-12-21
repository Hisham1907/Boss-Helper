const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const signUpBtn = document.getElementById('signUp');
let users = [];
if (localStorage.getItem('users') !== null) {
  users = JSON.parse(localStorage.getItem('users'));
}
function addUser() {
  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
}
function clear() {
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
}
function signUpHandler() {
  signUpBtn.addEventListener('click', function () {
    addUser();
    clear();
    window.location.href = 'signIn.html';
  });
}
signUpHandler();
