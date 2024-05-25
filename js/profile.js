// Select each input element
const fullNameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const websiteInput = document.querySelector("#website");
const companyNameInput = document.querySelector("#company");
const jobTitleInput = document.querySelector("#job-title");
const newPasswordInput = document.querySelector("#passwordPhone");
const confirmPasswordInput = document.querySelector("#confirm-passwordPhone");
const updateBtn = document.querySelector("#update-btn");
const proName = document.querySelector("#pro-name");
const accountImgFile = document.querySelector("#account-img-file");
const accountImg = document.querySelector("#account-img");
const deleteImg = document.querySelector("#delete");
const changePasswordBtn = document.querySelector("#change-password-btn");
const deleteAccount = document.querySelector("#delete-account");
const popUpModal = document.querySelector(".pop-up");
const canceModallBtn = document.querySelector(".cancel-modal-btn");
const deleteModalBtn = document.querySelector(".delete-modal-btn");
function displayInputs() {
  proName.textContent = currentUser.name;
  accountImg.src = currentUser.img ? currentUser.img : "img/user.jpg";
  fullNameInput.value = currentUser.name;
  emailInput.value = currentUser.email;
  if (currentUser.phone !== undefined) phoneInput.value = currentUser.phone;
  if (currentUser.website !== undefined)
    websiteInput.value = currentUser.website;
  if (currentUser.company !== undefined)
    companyNameInput.value = currentUser.company;
  if (currentUser.jobTitle !== undefined)
    jobTitleInput.value = currentUser.jobTitle;
}

displayInputs();
function emailHover() {
  toastr.clear();

  toastr["warning"]("Email cannot be changed", " ");
  setTimeout(function () {
    toastr.clear();
  }, 5000);
}
updateBtn.addEventListener("click", function () {
  if (updateBtn.textContent === "Update Info") {
    updateBtn.textContent = "Save Changes";
    [
      fullNameInput,
      emailInput,
      phoneInput,
      websiteInput,
      companyNameInput,
      jobTitleInput,
    ].forEach((input) => { 
      input.style.backgroundColor = "var(--input-enabled-color)";   
      input.disabled = false;
    });
    emailInput.disabled = true;
    emailInput.style.backgroundColor = "var(--input-disabled-color)";
    // Inside the code where you set up your email input element
    emailInput.addEventListener("mouseenter", emailHover);
  } else {
    emailInput.removeEventListener("mouseenter", emailHover);
    validateInputs();
    displayProfile();
  }
});
changePasswordBtn.addEventListener("click", function () {
  if (changePasswordBtn.textContent === "Change Password") {
    changePasswordBtn.textContent = "Save New Password";
    [newPasswordInput, confirmPasswordInput].forEach((input) => {
      input.style.backgroundColor = "var(--input-enabled-color)";
      input.disabled = false;
    });
  } else {
    validatePasswords();
  }
});
function validateInputs() {
  const validationFunctions = [
    validateFullName,
    validatePhone,
    validateWebsite,
    validateCompanyName,
    validateJobTitle,
  ];

  let isValid = true;

  validationFunctions.forEach((func) => {
    const result = func();
    if (result !== true) {
      isValid = false;
    }
  });

  if (isValid) {
    updateUser();
  } else {
    toastr["error"]("Please fix all the errors to be able to save", " ");
    setTimeout(function () {
      toastr.clear();
    }, 5000);
  }
}
function updateUser() {
  currentUser.name = fullNameInput.value;
  localStorage.setItem("name", fullNameInput.value);

  if (phoneInput.value !== "") {
    currentUser.phone = phoneInput.value;
  }
  if (websiteInput.value !== "") {
    currentUser.website = websiteInput.value;
  }
  if (companyNameInput.value !== "") {
    currentUser.company = companyNameInput.value;
  }
  if (jobTitleInput.value !== "") {
    currentUser.jobTitle = jobTitleInput.value;
  }

  localStorage.setItem("users", JSON.stringify(users));
  if (
    currentUser.name != fullNameInput.value ||
    currentUser.phone != phoneInput.value ||
    currentUser.website != websiteInput.value||
    currentUser.company != companyNameInput.value||
    currentUser.jobTitle != jobTitleInput.value
  ){
    toastr["success"]("Profile info updated successfully!", " ");
  setTimeout(function () {
    toastr.clear();
  }, 5000);
  }
    
  displayInputs();
  updateBtn.textContent = "Update Info";
  document.querySelectorAll(".form-group input").forEach((input) => {
    input.style.backgroundColor = "var(--input-disabled-color)";
    input.disabled = true;
  });
}
function validatePasswords() {
  const validationFunctions = [validateNewPassword, validateConfirmPassword];
  let isValid = true;

  validationFunctions.forEach((func) => {
    const result = func();
    if (result !== true) {
      isValid = false;
    }
  });

  if (isValid) {
    updatePassword();
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";
  } else {
    toastr["error"]("Please fix all the errors add the new password", " ");
    setTimeout(function () {
      toastr.clear();
    }, 5000);
  }
}
function updatePassword() {
  if (newPasswordInput.value !== "") {
    currentUser.password = newPasswordInput.value;
    toastr["success"]("Password updated successfully!", " ");
    setTimeout(function () {
      toastr.clear();
    }, 5000);
  }
  localStorage.setItem("users", JSON.stringify(users));

  changePasswordBtn.textContent = "Change Password";
  [newPasswordInput, confirmPasswordInput].forEach((input) => {
    input.style.backgroundColor = "var(--input-disabled-color)";
    input.disabled = true;
  });
}
function setError(element, message) {
  element.classList.add("error");
  tippy(element, {
    content: message,
    trigger: "manual",
    placement: "bottom",
    theme: "errorTooltip",
    arrow: true,
 
  }).show();
}

function setSuccess(element) {
  element.classList.remove("error");
}

function validateFullName() {
  const nameValue = fullNameInput.value.trim();
  if (nameValue === "") {
    setError(fullNameInput, `Name can't be empty`);
    return false;
  } else if (nameValue.length < 3) {
    setError(fullNameInput, `Name must be at least 3 characters long`);
    return false;
  } else if (nameValue.length >= 30) {
    setError(fullNameInput, `Name can't be more than 30 characters long`);
    return false;
  } else {
    setSuccess(fullNameInput);
    return true;
  }
}

function validatePhone() {
  const phoneValue = phoneInput.value.trim();
  if (phoneValue !== "" && !/^(\+\d{1,3})?(\d{9,15})$/.test(phoneValue)) {
    setError(phoneInput, `Please enter a valid phone number`);
    return false;
  } else {
    setSuccess(phoneInput);
    return true;
  }
}

function validateWebsite() {
  const websiteValue = websiteInput.value.trim();
  if (websiteValue !== "" && !/^(http|https):\/\/[^ "]+$/.test(websiteValue)) {
    setError(websiteInput, `Please enter a valid website URL`);
    return false;
  } else {
    setSuccess(websiteInput);
    return true;
  }
}

function validateCompanyName() {
  const companyNameValue = companyNameInput.value.trim();
  if (companyNameValue !== "" && companyNameValue.length >= 30) {
    setError(companyNameInput, `Company name can't be more than 30 characters`);
    return false;
  } else {
    setSuccess(companyNameInput);
    return true;
  }
}

function validateJobTitle() {
  const jobTitleValue = jobTitleInput.value.trim();
  if (jobTitleValue !== "" && jobTitleValue.length >= 30) {
    setError(jobTitleInput, `Job title can't be more than 30 characters`);
    return false;
  } else {
    setSuccess(jobTitleInput);
    return true;
  }
}

function validateNewPassword() {
  const newPasswordValue = newPasswordInput.value.trim();
  if (newPasswordValue !== "" && newPasswordValue.length < 8) {
    setError(newPasswordInput, `Password must be at least 8 characters long`);
    return false;
  } else if (currentUser.password == newPasswordValue)
    setError(
      newPasswordInput,
      `This is the same password please enter a new one`
    );
  else {
    setSuccess(newPasswordInput);
    return true;
  }
}

function validateConfirmPassword() {
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const newPasswordValue = newPasswordInput.value.trim();
  if (
    confirmPasswordValue !== "" &&
    confirmPasswordValue !== newPasswordValue
  ) {
    setError(confirmPasswordInput, `Passwords don't match`);
    return false;
  } else {
    setSuccess(confirmPasswordInput);
    return true;
  }
}

accountImgFile.addEventListener("change", () => {
  let file = accountImgFile.files[0];
  console.log(file);
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", function () {
    accountImg.src = reader.result;
    currentUser.img = reader.result;
    localStorage.setItem("users", JSON.stringify(users));
    displayProfile();
  });
});

deleteImg.addEventListener("click", function () {
  // Check if the currentUser object exists
  if (currentUser) {
    // Check if the currentUser has an image
    if (currentUser.img) {
      // Set the image URL to an empty string or null
      currentUser.img = ""; // or currentUser.img = null;
      // Save the updated user data to localStorage
      localStorage.setItem("users", JSON.stringify(users));
      // Update the profile and inputs display
      displayProfile();
      displayInputs();
    } else {
      console.log("Current user does not have an image to delete.");
    }
  } else {
    console.log("Current user not found.");
  }
});

deleteAccount.addEventListener("click", function () {
  popUpModal.classList.add("pop-up-active");
  deleteModalBtn.addEventListener("click", function handleDelete() {
    let index = users.findIndex(
      (user) => user.name === userName && user.email === userEmail
    );
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    deleteModalBtn.removeEventListener("click", handleDelete);
    popUpModal.classList.remove("pop-up-active");
    toastr["success"]("Account Deleted Succesfully", "");
    setTimeout(function () {
      toastr.clear();
      window.location.href = "signUp.html";
    }, 3000);
  });
  canceModallBtn.addEventListener("click", function () {
    popUpModal.classList.remove("pop-up-active");
  });
});
