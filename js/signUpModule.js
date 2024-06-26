"use strict";

// Select DOM Elements
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const signUpBtn = document.getElementById("signUp");
const termsCheckBtn = document.getElementById("terms-check-btn");

let users = [];
if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

// Event listeners
signUpBtn.addEventListener("click", handleFormSubmit);
nameInput.addEventListener("input", () => validateInput(nameInput, validateName));
emailInput.addEventListener("input", () => validateInput(emailInput, validateEmail));
passwordInput.addEventListener("input", () => validateInput(passwordInput, validatePassword));
confirmPasswordInput.addEventListener("input", () => validateInput(confirmPasswordInput, () => validatePasswordConfirmation(passwordInput.value)));

// Form submit handler
function handleFormSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    if (termsCheckBtn.checked) {
      addUser();
      Swal.fire({
        text: "Account created successfully!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "signIn.html";
        }
      });
    } else {
      Swal.fire({
        text: "You must agree to the Terms and Conditions.",
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      text: "Sign up failed! Please check the form for errors.",
      icon: "error",
    }).then(() => {
      validateForm();
    });
  }
}

// Validate form
function validateForm() {
  const validations = [
    validateName,
    validateEmail,
    validatePassword,
  ()=>validatePasswordConfirmation(passwordInput.value),
  ];
  let isValid = true;
  validations.forEach(func => {
      if (!func()) isValid = false;
  });
  return isValid;
}

// Add user
function addUser() {
  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  clearForm();
}

// Clear form
function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  document.querySelectorAll(".input-field").forEach((field) => {
    field.classList.remove("error", "success");
  });
}

// Validate individual input
function validateInput(input, validationFunction) {
  if (input.value.trim() === "") {
    clearValidation(input);
  } else {
    validationFunction();
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

// Validate name
function validateName() {
  const nameValue = nameInput.value.trim();
  if (nameValue === "") {
    setError(nameInput, "Name field cannot be empty");
    return false;
  } else if (nameValue.length < 3) {
    setError(nameInput, "Name must be at least 3 characters long");
    return false;
  } else if (nameValue.length > 30) {
    setError(nameInput, "Name cannot exceed 30 characters");
    return false;
  } else {
    setSuccess(nameInput);
    return true;
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
    const emailExists = users.some(user => user.email.trim().toLowerCase() === emailValue.toLowerCase());
    if (emailExists) {
      setError(emailInput, "This Email already exists. Choose another one");
      return false;
    } else {
      setSuccess(emailInput);
      return true;
    }
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

// Validate password confirmation
function validatePasswordConfirmation(passwordValue) {
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  if (confirmPasswordValue === "") {
    setError(confirmPasswordInput, "This field cannot be empty");
    return false;
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPasswordInput, "Passwords do not match. Please re-enter.");
    return false;
  } else {
    setSuccess(confirmPasswordInput);
    return true;
  }
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
