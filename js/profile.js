// Select each input element
const fullNameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const websiteInput = document.querySelector("#website");
const companyNameInput = document.querySelector("#company");
const jobTitleInput = document.querySelector("#job-title");
const newPasswordInput = document.querySelector("#passwordPhone");
const confirmPasswordInput = document.querySelector("#confirm-passwordPhone");
const mainBtn = document.querySelector("#main-btn");
const proName = document.querySelector("#pro-name");
const accountImgFile = document.querySelector("#account-img-file");
const accountImg = document.querySelector("#account-img");
const deleteImg = document.querySelector("#delete");
const changePasswordBtn = document.querySelector("#change-password-btn");
const deleteAccount = document.querySelector("#delete-account");
const popUpModal = document.querySelector(".pop-up");
const cancelModalBtn = document.querySelector(".cancel-modal-btn");
const deleteModalBtn = document.querySelector(".delete-modal-btn");

// function to display user data
function displayInputs() {
  proName.textContent = currentUser.name;
  accountImg.src = currentUser.img ? currentUser.img : "img/user.png";
  fullNameInput.value = currentUser.name;
  emailInput.value = currentUser.email;
  if (currentUser.phone) phoneInput.value = currentUser.phone;
  if (currentUser.website) websiteInput.value = currentUser.website;
  if (currentUser.company) companyNameInput.value = currentUser.company;
  if (currentUser.jobTitle) jobTitleInput.value = currentUser.jobTitle;
}
displayInputs();

// function tells the user that email is disabled
function emailDisable() {
  Swal.fire({
    text: "Email cannot be changed",
    icon: "info",
  });
}

// Update or Save user's info based on the button's current text
mainBtn.addEventListener("click", function () {
  if (mainBtn.textContent === "Update Info") {
    mainBtn.textContent = "Save Changes";
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
    emailInput.addEventListener("mouseenter", emailDisable);
  } else {
    emailInput.removeEventListener("mouseenter", emailDisable);
    validateInputs();
    displayProfile();
  }
});

// Change password
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

// Function to update user data
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
    currentUser.website != websiteInput.value ||
    currentUser.company != companyNameInput.value ||
    currentUser.jobTitle != jobTitleInput.value
  ) {
    Swal.fire({
      text: "Profile info updated successfully!",
      icon: "success",
    });
  }

  displayInputs();
  mainBtn.textContent = "Update Info";
  document.querySelectorAll(".form-group input").forEach((input) => {
    input.style.backgroundColor = "var(--input-disabled-color)";
    input.disabled = true;
  });
}

// Function to update user password
function updatePassword() {
  if (newPasswordInput.value !== "") {
    currentUser.password = newPasswordInput.value;
    Swal.fire({
      text: "Password updated successfully!",
      icon: "success",
    });
  }
  localStorage.setItem("users", JSON.stringify(users));

  changePasswordBtn.textContent = "Change Password";
  [newPasswordInput, confirmPasswordInput].forEach((input) => {
    input.style.backgroundColor = "var(--input-disabled-color)";
    input.disabled = true;
  });
}

// Function to set error to input
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

// Function to set success to input
function setSuccess(element) {
  element.classList.remove("error");
}

// validation functions
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
    Swal.fire({
      text: "Please fix all the errors to be able to save",
      icon: "error",
    });
  }
}

// Validate passwords
function validateNewPassword() {
  const newPasswordValue = newPasswordInput.value.trim();
  if (newPasswordValue !== "" && newPasswordValue.length < 8) {
    setError(newPasswordInput, `Password must be at least 8 characters long`);
    return false;
  } else if (currentUser.password == newPasswordValue) {
    setError(newPasswordInput, `This is the same password, please enter a new one`);
    return false;
  } else {
    setSuccess(newPasswordInput);
    return true;
  }
}

function validateConfirmPassword() {
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const newPasswordValue = newPasswordInput.value.trim();
  if (newPasswordValue !== "" && confirmPasswordValue == "") {
    setError(confirmPasswordInput, `Please confirm your new password`);
    return false;
  } else if (
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

function validatePasswords() {
  const validationFunctions = [validateNewPassword, validateConfirmPassword];
  let isValid = true;
  validationFunctions.forEach((func) => {
    if (func() === false) isValid = false;
  });

  if (isValid) {
    updatePassword();
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";
  } else {
    Swal.fire({
      text: "Please fix all the errors add the new password",
      icon: "error",
    });
  }
}

// handle file input for img
accountImgFile.addEventListener("change", () => {
  let file = accountImgFile.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", function () {
    Swal.fire({
      title: 'This will be your profile photo',
      imageUrl: reader.result,
      imageAlt: 'User Image',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        accountImg.src = reader.result;
        currentUser.img = reader.result;
        localStorage.setItem("users", JSON.stringify(users));
        Swal.fire({
          text: "Profile photo has been added successfully",
          icon: "success",
        });
        displayProfile();
      }
    });
  });
});

deleteImg.addEventListener("click", function () {
  if (currentUser) {
    if (currentUser.img) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove your profile photo?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          currentUser.img = "";
          localStorage.setItem("users", JSON.stringify(users));
          displayProfile();
          displayInputs();
          Swal.fire({
            text: "Profile photo has been removed successfully",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        text: "There is no photo to remove",
        icon: "error",
      });
    }
  }
});

deleteAccount.addEventListener("click", function () {
  popUpModal.classList.add("pop-up-active");
  deleteModalBtn.addEventListener("click", function handleDelete() {
    Swal.fire({
      title: 'Confirm the deletion',
       html:
        '<input type="email" id="swal-email" class="swal2-input" placeholder="Email">' +
        '<input type="password" id="swal-password" class="swal2-input" placeholder="Password">',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#swal-email').value;
        const password = Swal.getPopup().querySelector('#swal-password').value;
        if (!email || !password) {
          Swal.showValidationMessage(`Please enter email and password`);
        }
        return { email: email, password: password }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { email, password } = result.value;
        if (email === currentUser.email && password === currentUser.password) {
          let index = users.findIndex(user => user.email === email);
          users.splice(index, 1);
          localStorage.setItem("users", JSON.stringify(users));
          deleteModalBtn.removeEventListener("click", handleDelete);
          popUpModal.classList.remove("pop-up-active");
          Swal.fire({
            text: "Account Deleted Successfully",
            icon: "success",
          });
          setTimeout(function () {
            window.location.href = "signUp.html";
          }, 3000);
        } else {
          Swal.fire({
            text: "Incorrect email or password",
            icon: "error",
          });
        }
      }
    });
  });

  cancelModalBtn.addEventListener("click", function () {
    popUpModal.classList.remove("pop-up-active");
    deleteModalBtn.removeEventListener("click", handleDelete);
  });
  popUpModal.addEventListener("click", function () {
    popUpModal.classList.remove("pop-up-active");
    deleteModalBtn.removeEventListener("click", handleDelete);
  });
});