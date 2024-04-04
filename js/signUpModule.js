const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const inputField = document.querySelector(".input-field");
const errorMessage = document.querySelector(".input-field small");
const signUpBtn = document.getElementById("signUp");
let isError = false;

let users = [];
if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}
function setError(element,message){
let inputControl=element.parentElement.parentElement;
let ErrorMessage=inputControl.querySelector('small');
ErrorMessage.innerHTML=message;
inputControl.classList.add("error");
inputControl.classList.remove("success");
}
function setSuccess(element){
let inputControl=element.parentElement.parentElement;
let ErrorMessage=inputControl.querySelector('small');
ErrorMessage.innerHTML='';
inputControl.classList.remove("error");
inputControl.classList.add("success");
}
function validation(){
  let nameValue = nameInput.value.trim();
  let emailValue = emailInput.value.trim();
  let passwordValue = passwordInput.value.trim();
  let confirmPasswordValue = confirmPasswordInput.value.trim();
  if (nameValue == "") {
     setError(nameInput,'This field cannot be empty')
   }
   else{
    setSuccess(nameInput)
   }
   if (!validateEmail(emailValue)) {
    setError(emailInput, 'Please enter a valid email address');
  } else {
    setSuccess(emailInput);
  }
  else
  // if (passwordValue == "") {
  //   passwordInput.parentElement.parentElement.classList.add("error");
  //   isError = true;
  // }
  // if (confirmPasswordValue == "") {
  //   confirmPasswordInput.parentElement.parentElement.classList.add("error");
  //   isError = true;
  // }
  // if (isError) {
  //   return;
  // }
}
function addUser() {
  validation()
  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  // window.location.href = "signIn.html";
}

function clear() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}
function signUpHandler() {
  signUpBtn.addEventListener("click", function () {
    addUser();
    clear();
  });
}
signUpHandler();
