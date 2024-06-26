"use strict";

// Select DOM Elements
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.getElementById("login");

let users = [];
if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

// Event listeners
loginBtn.addEventListener("click", handleSignIn);
emailInput.addEventListener("input", () => validateInput(emailInput, validateEmail));
passwordInput.addEventListener("input", () => validateInput(passwordInput, validatePassword));

// Sign-in handler
function handleSignIn(event) {
  event.preventDefault();
  if (validateForm()) {
    let isValid = false;
    users.forEach(user => {
      if (
        emailInput.value.toLowerCase() === user.email.toLowerCase() &&
        passwordInput.value === user.password
      ) {
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        isValid = true;
      }
    });

    if (isValid) {
      Swal.fire({
        text: "Login Successfully",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 1000);
        }
      });
    } else {
      Swal.fire({
        text: "Incorrect email or password. Please check and try again.",
        icon: "error"
      }).then(() => {
        validateForm();
      });
    }
  } else {
    Swal.fire({
      text: "Sign in failed! Please check the form for errors.",
      icon: "error",
    }).then(() => {
      validateForm();
    });
  }
}

// Validate form
function validateForm() {
  const validations = [validateEmail, validatePassword];
  let isValid = true;
  validations.forEach(func => {
    if (!func()) isValid = false;
  });
  return isValid;
}

// Validate individual input
function validateInput(input, validationFunction) {
  if (input.value.trim() === "") {
    clearValidation(input);
  } else {
    validationFunction();
  }
}

// Validate email
function validateEmail() {
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (emailValue === "") {
    setError(emailInput, "Email field cannot be empty");
    return false;
  } else if (!emailRegex.test(emailValue)) {
    setError(emailInput, "Please enter a valid email address");
    return false;
  } else {
    setSuccess(emailInput);
    return true;
  }
}

// Validate password
function validatePassword() {
  const passwordValue = passwordInput.value.trim();

  if (passwordValue === "") {
    setError(passwordInput, "Password field cannot be empty");
    return false;
  } else if (passwordValue.length < 8) {
    setError(passwordInput, "Password must be at least 8 characters long");
    return false;
  } else {
    setSuccess(passwordInput);
    return true;
  }
}

// Set error
function setError(element, message) {
  const inputControl = element.parentElement.parentElement;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
  if (element._tippy) {
    element._tippy.destroy();
  }
  tippy(element, {
    content: message,
    trigger: "manual",
    placement: "bottom",
    theme: "errorTooltip",
    arrow: true,
  }).show();
}

// Set success
function setSuccess(element) {
  if (element._tippy) {
    element._tippy.destroy();
  }
  const inputControl = element.parentElement.parentElement;
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
}

// Clear validation
function clearValidation(inputElement) {
  if (inputElement._tippy) {
    inputElement._tippy.destroy();
  }
  const inputControl = inputElement.parentElement.parentElement;
  inputControl.classList.remove("error", "success");
}

// Loader
const loader = document.querySelector("#loader");
function showLoader() {
  if (loader) {
    loader.style.display = "flex";
  }
}
showLoader();
function removeLoader() {
  if (loader) {
    loader.style.display = "none";
  }
}
setTimeout(removeLoader, 2500);
