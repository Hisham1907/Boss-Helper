const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const inputField = document.querySelector(".input-field");
const errorMessage = document.querySelector(".input-field small");
const signUpBtn = document.getElementById("signUp");
                     
let users = [];
if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
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
  let errorMessage = inputControl.querySelector("small");
  errorMessage.innerHTML = "";
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
  
}
function validateName() {
  let nameValue = nameInput.value.trim();
  if (nameValue == "") {
    setError(nameInput, "Name field cannot be empty");
  }
   else if (nameValue.length < 3) {
    setError(nameInput, "Name must be at least 3 characters long");
  }
   else if (nameValue.length > 30) {
    setError(nameInput, "Name cannot exceed 30 characters");
   }
  else {
    setSuccess(nameInput);
  }
}
function validateEmail() {
  let emailValue = emailInput.value.trim();
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (emailValue == "") {
    setError(emailInput, "Email field cannot be empty");
  } else if (!emailRegex.test(emailValue)) {
    setError(emailInput, "Please enter a valid email address");
  } else {
    let emailExists = false;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email.trim().toLowerCase().includes(emailValue.toLowerCase())
      ) {
        emailExists = true;
        break;
      }
    }
    if (emailExists)
      setError(
        emailInput,
        "This Email already exists. Please choose another one"
      );
    else setSuccess(emailInput);
  }
}
function validatePassword() {
  let passwordValue = passwordInput.value.trim();

  if (passwordValue == "") {
    setError(passwordInput, "Password field cannot be empty");
  } else if (passwordValue.length < 8) {
    setError(passwordInput, " Password must be at least 8 characters long");
  } else {
    setSuccess(passwordInput);
  }
}
function validatePasswordConfirmation(passwordValue) {
  let confirmPasswordValue = confirmPasswordInput.value.trim();
  if (confirmPasswordValue == "") {
    setError(confirmPasswordInput, "This field cannot be empty");
  } else if (confirmPasswordValue != passwordValue) {
    setError(confirmPasswordInput, "Passwords do not match. Please re-enter.");
  } else {
    setSuccess(confirmPasswordInput);
  }
}
function addUser() {
  validateName();
  validateEmail();
  validatePassword();
  validatePasswordConfirmation(passwordInput.value);
  if (document.querySelectorAll(".error").length == 0) {
    const userData = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    console.log(document.querySelectorAll(".error").length);
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "signIn.html";
    clear();
  }
}
function clear() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  let inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput];
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].parentElement.parentElement.classList.remove("error");
    inputs[i].parentElement.parentElement.classList.remove("success");
  }
}
function signUpHandler() {
  signUpBtn.addEventListener("click", function () {
    addUser();
  });
}
signUpHandler();
// Attach event listeners for real-time validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", function() {
  validatePasswordConfirmation(passwordInput.value);
});