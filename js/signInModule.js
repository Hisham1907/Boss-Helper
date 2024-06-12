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
   if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
      for (let i = 0; i < users.length; i++) {
        if (
          emailInput.value === users[i].email &&
          passwordInput.value === users[i].password
        ) {
          localStorage.setItem("name", users[i].name);
          localStorage.setItem("email", users[i].email);
          isValid = true; 
          break;
        }
      }
      if (isValid) {
         Swal.fire({
          text: "Login Succesfully",
         icon: "success"
       })
        setTimeout(function() {
           window.location.href = "dashboard.html";
        }, 3000); 
      } else {
         Swal.fire({
          text: "Incorrect email or password. Please check and try again.",
         icon: "error"
       }).then(() => {
        validateEmail();
        validatePassword();});
      }
    }
    
  });
 
}

signInHandler();

function validateEmail() {
  let emailValue = emailInput.value.trim();
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (emailValue === "") {
    setError(emailInput, "Email field cannot be empty");
  } else if (!emailRegex.test(emailValue)) {
    setError(emailInput, "Please enter a valid email address");
  } else {
    setSuccess(emailInput);
  }
}

function validatePassword() {
  let passwordValue = passwordInput.value.trim();

  if (passwordValue === "") {
    setError(passwordInput, "Password field cannot be empty");
  } else if (passwordValue.length < 8) {
    setError(passwordInput, "Password can't be less than 8 characters long");
  }
   else {
    setSuccess(passwordInput);
  }
}

function setError(element, message) {
  let inputControl = element.parentElement.parentElement;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
  if (element._tippy) {
    element._tippy.destroy();
  }
  tippy(element, {
    content: message,
    trigger: 'manual',  
    placement: 'bottom',  
    theme: 'errorTooltip',  
    arrow: true
  }).show(); 
}

function setSuccess(element) {
  if (element._tippy) {
    element._tippy.destroy();
  }
  let inputControl = element.parentElement.parentElement;
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
}

emailInput.addEventListener('input', function() {
  if (emailInput.value.trim() === '') {
    clearError(emailInput);
  } else {
    validateEmail();
  }
});

passwordInput.addEventListener('input', function() {
  if (passwordInput.value.trim() === '') {
    clearError(passwordInput);
  } else {
    validatePassword();
  }
});

function clearError(inputElement) {
  inputElement._tippy.destroy();
  let inputControl = inputElement.parentElement.parentElement;
  inputControl.classList.remove("error");
  inputControl.classList.remove("success");
}

 
    // loader
    const loader=document.querySelector('#loader')
    function showLoader(){
      if(loader){
        loader.style.display='flex'
      }
    }
    showLoader()
    function removeLoader(){
      if(loader){
        loader.style.display='none'
      }
    }
    setTimeout(removeLoader,2500)