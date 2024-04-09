"use strict";
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.getElementById("login");
let users = [];
if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}
function signInHandler() {
  loginBtn.addEventListener("click", function () {
    validateEmail();
    validatePassword();
    let isValid = false;
    if (emailInput.value.trim() != "" && passwordInput.value.trim() != ""){
      for (let i = 0; i < users.length; i++) {
        if (
          emailInput.value == users[i].email &&
          passwordInput.value == users[i].password
        ) {
          localStorage.setItem("name", users[i].name);
          localStorage.setItem("email", users[i].email);
          window.location.href = "dashboard.html";
          isValid = true;
          break;
        }
      }
    if (!isValid)
      alert("Oops! Incorrect email or password. Please check and try again.");
    }
    });
}
signInHandler();
function validateEmail() {
  let emailValue = emailInput.value;
  let emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
  if (emailValue == "") setError(emailInput, "Email field cannot be empty");
  else if (!emailRegex.test(emailValue))
    setError(emailInput, "Please enter a valid email address");
  else setSuccess(emailInput);
}
function validatePassword() {
  let passwordValue = passwordInput.value;
  if (passwordValue == "")
    setError(passwordInput, "Password field cannot be empty");
  else setSuccess(passwordInput);
}
function setError(element, message) {
  let inputControl = element.parentElement.parentElement;
  let errorMessage = inputControl.querySelector("small");
  errorMessage.innerHTML = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
}
function setSuccess(element) {
  let inputControl = element.parentElement.parentElement;
  let successMessage = inputControl.querySelector("small");
  successMessage.classList.remove("error");
  successMessage.classList.add("success");
}
