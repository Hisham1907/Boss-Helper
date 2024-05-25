// CRUD
const addNewMemberBtn = document.getElementById("add-new-member");
const formContainer = document.querySelector(".form-container");
const employeesForm = document.querySelector(".employees-form");
const closeBtn = document.querySelector(".close-btn");
const employeeImg = document.getElementById("employee-img");
const fileInput = document.getElementById("file-input");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const age = document.getElementById("age");
const position = document.getElementById("position");
const salary = document.getElementById("salary");
const phone = document.getElementById("phone");
const mainBtn = document.getElementById("main-btn");
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const popUpModal = document.querySelector(".pop-up");
const cancelModalBtn = document.querySelector(".cancel-modal-btn");
const deleteModalBtn = document.querySelector(".delete-modal-btn");
const tableSize=document.querySelector('#table-size')
let currentImgSrc;
let currentIndex;
 if(!currentUser.employees){
    currentUser.employees=[]
  }
// Define variables to control pagination
let currentPage = 1;
let entriesPerPage = 5;

addNewMemberBtn.addEventListener("click", function () {
formContainer.classList.add("appear");
employeesForm.classList.add("appear");
});

closeBtn.addEventListener("click", function () {
formContainer.classList.remove("appear");
employeesForm.classList.remove("appear");
clear();
});
fileInput.addEventListener("change", function (e) {
const file = fileInput.files[0];
if (file.size < 1000000) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    currentImgSrc = reader.result;
    employeeImg.src = currentImgSrc;
  };
} else {
  toastr["info"]("The file must be less than 1 MB");
  setTimeout(function () {
    toastr.clear();
  }, 5000);
}
});
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
mainBtn.addEventListener("click", function () {
if (mainBtn.innerHTML === "Add Employee") {
  if (validateInputs()) {
    addEmployee();
     formContainer.classList.remove("appear");
    employeesForm.classList.remove("appear");
    clear();
    displayCurrentPageData()
updatePaginationButtons();
  }
  else{
    toastr["error"]("Please fix all the errors to be able to add the employee", " ");
  
  }

} else {
   if (validateInputs()) {
    updateData(currentIndex);
    formContainer.classList.remove("appear");
    employeesForm.classList.remove("appear");
    mainBtn.innerHTML = "Add Employee";
    clear();
  }
  else{
    toastr["error"]("Please fix all the errors to be able to update the employee");
  
  }
  displayCurrentPageData()

}
});

function addEmployee() {
  let employee = {
    img: currentImgSrc || "img/user.jpg",
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
    position: position.value,
    salary: salary.value,
    phone: phone.value,
  };
 
  currentUser.employees.push(employee);
  localStorage.setItem("users", JSON.stringify(users));
  toastr["success"]("Product added successfully!", " ");

 
    // Check if the current page is full
    let totalPages = Math.ceil(currentUser.employees.length / entriesPerPage);
    let currentPageEmployees = currentUser.employees.slice(
      (currentPage - 1) * entriesPerPage,
      currentPage * entriesPerPage
    );
  
    if (currentPageEmployees.length === entriesPerPage) {
      // Navigate to the next page
      goToPage(currentPage + 1);
    }
 
}

function clear() {
fileInput.value = "";
employeeImg.src = "img/user.jpg";
firstName.value = "";
lastName.value = "";
age.value = "";
position.value = "";
salary.value = "";
phone.value = "";
let errorInputs = Array.from(document.querySelectorAll('input.error'));
errorInputs.forEach((input) => input.classList.remove("error"));
}


function deleteEmployee(index) {
  popUpModal.classList.add("pop-up-active");
  deleteModalBtn.addEventListener("click", function handleDelete() {
    currentUser.employees.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    displayCurrentPageData();
    updatePaginationButtons();

    // Check if the current page is empty and navigate to the previous page if necessary
    let startIndex = (currentPage - 1) * entriesPerPage;
    let endIndex = startIndex + entriesPerPage;
    let paginatedEmployees = currentUser.employees.slice(startIndex, endIndex);
    if (paginatedEmployees.length === 0 && currentPage > 1) {
      goToPage(currentPage - 1);
    }

    deleteModalBtn.removeEventListener("click", handleDelete);
    popUpModal.classList.remove("pop-up-active");
  });
  cancelModalBtn.addEventListener("click", function () {
    popUpModal.classList.remove("pop-up-active");
  });
  updateFooterText()
}


function getData(i) {
currentIndex = i;
formContainer.classList.add("appear");
employeesForm.classList.add("appear");
employeeImg.src = currentUser.employees[i].img;
currentImgSrc=currentUser.employees[i].img;
firstName.value = currentUser.employees[i].firstName;
lastName.value = currentUser.employees[i].lastName;
age.value = currentUser.employees[i].age;
position.value = currentUser.employees[i].position;
salary.value = currentUser.employees[i].salary;
phone.value = currentUser.employees[i].phone;
mainBtn.innerHTML = "Update Employee";
}

function updateData(i) {
  currentUser.employees[i].img = currentImgSrc || "img/user.jpg" ; 
 currentUser.employees[i].firstName = firstName.value;
currentUser.employees[i].lastName = lastName.value;
currentUser.employees[i].age = age.value;
currentUser.employees[i].position = position.value;
currentUser.employees[i].salary = salary.value;
currentUser.employees[i].phone = phone.value;
localStorage.setItem("users", JSON.stringify(users));
toastr["success"]("Product updated successfully!", " ");

 }

search.addEventListener("keyup", function () {
  // let filteredEmployees=employees.filter(employee=>employee.firstName.toLowerCase().includes(search.value.trim().toLowerCase()))
  // console.log(filteredEmployees);

let content = "";
for (let i = 0; i < currentUser.employees.length; i++) {
  if (
currentUser.employees[i].firstName.toLowerCase().includes(search.value.trim().toLowerCase())
  ) {
    content += `
  <tr>
  <td>${i + 1}</td>
  <td class="user-img"><img src="${currentUser.employees[i].img}" alt=""></td>
  <td>${currentUser.employees[i].firstName + " " + currentUser.employees[i].lastName}</td>
  <td>${currentUser.employees[i].age}</td>
  <td>${currentUser.employees[i].position}</td>
  <td>${currentUser.employees[i].salary}</td>
  <td>${currentUser.employees[i].phone}</td>
  <td class="action">
   <button onclick="getData(${i})" class="update"><i class="fas fa-edit"></i></button>
   <button onclick="deleteEmployee(${i})" class="delete"><i class="fas fa-trash-alt" ></i></button>

   </td>
   
  </tr>
  `;
  }
}
tableBody.innerHTML = content;
 });


// Validation functions 
// Validation function for First Name
function validateFirstName() {
const firstNameValue = firstName.value.trim();
const nameRegex = /^[A-Za-z]+$/;

if (firstNameValue === "") {
  setError(firstName, "First Name cannot be empty");
  return false;
} else if (!nameRegex.test(firstNameValue)) {
  setError(firstName, "First Name can only contain letters");
  return false;
} else if (firstNameValue.length < 3) {
  setError(firstName, "Name must be at least 3 characters long");
  return false;
} else if (firstNameValue.length >= 30) {
  setError(firstName, "Name can't be more than 30 characters long");
  return false;
} else {
  setSuccess(firstName);
  return true;
}
}

// Validation function for Last Name
function validateLastName() {
const lastNameValue = lastName.value.trim();
const nameRegex = /^[A-Za-z]+$/;

if (lastNameValue === "") {
  setError(lastName, "Last Name cannot be empty");
  return false;
} else if (!nameRegex.test(lastNameValue)) {
  setError(lastName, "Last Name can only contain letters");
  return false;
} else if (lastNameValue.length < 3) {
  setError(lastName, "Name must be at least 3 characters long");
  return false;
} else if (lastNameValue.length >= 30) {
  setError(lastName, "Name can't be more than 30 characters long");
  return false;
} else {
  setSuccess(lastName);
  return true;
}
}

// Validation function for Age
function validateAge() {
const ageValue = age.value.trim();
if (ageValue === "") {
  setError(age, "Age cannot be empty");
  return false;
} else if (isNaN(ageValue) || Number(ageValue) <= 0 || Number(ageValue) > 150) {
  setError(age, "Please enter a valid age");
  return false;
} else {
  setSuccess(age);
  return true;
}
}

// Validation function for Position
function validatePosition() {
const positionValue = position.value.trim();
const positionRegex = /^[A-Za-z\s]+$/; // Regular expression allowing letters and spaces

if (positionValue === "") {
  setError(position, "Position cannot be empty");
  return false;
} else if (!positionRegex.test(positionValue)) {
  setError(position, "Position can only contain letters and spaces");
  return false;
} else {
  setSuccess(position);
  return true;
}
}

// Validation function for Salary
function validateSalary() {
const salaryValue = salary.value.trim();
if (salaryValue === "") {
  setError(salary, "Salary cannot be empty");
  return false;
} else if (isNaN(salaryValue) || Number(salaryValue) <= 0) {
  setError(salary, "Please enter a valid salary");
  return false;
} else {
  setSuccess(salary);
  return true;
}
}

// Validation function for Phone
function validatePhone() {
const phoneValue = phone.value.trim();
if (phoneValue === "") {
  setError(phone, "Phone cannot be empty");
  return false;
} else if (!/^(\+\d{1,3})?(\d{9,15})$/.test(phoneValue)) {
  setError(phone, "Please enter a valid phone number");
  return false;
} else {
  setSuccess(phone);
  return true;
}
}

function validateInputs() {
const validationFunctions = [
  validateFirstName,
  validateLastName,
  validateAge,
  validatePosition,
  validateSalary,
  validatePhone
];
let isValid = true;
validationFunctions.forEach(function (func) {
  if (func() === false) {
    isValid = false;
  }
  });
return isValid;
}


tableSize.addEventListener('change', function() {
  entriesPerPage = Number(tableSize.value);
  displayCurrentPageData()
  updatePaginationButtons()
})
// Function to display data for the current page
function displayCurrentPageData() {
  let startIndex = (currentPage - 1) * entriesPerPage;
  let endIndex = startIndex + entriesPerPage;
  let paginatedEmployees = currentUser.employees.slice(startIndex, endIndex);

  let content = "";
  if (paginatedEmployees.length > 0) {
    paginatedEmployees.forEach(function (employee, i) {
      content += `
        <tr>
          <td>${startIndex + i + 1}</td>
          <td class="user-img"><img src="${employee.img}" alt=""></td>
          <td>${employee.firstName + " " + employee.lastName}</td>
          <td>${employee.age}</td>
          <td>${employee.position}</td>
          <td>${employee.salary}</td>
          <td>${employee.phone}</td>
          <td class="action">
            <button onclick="getData(${startIndex + i})" class="update"><i class="fa-solid fa-pen-to-square"></i></button>
            <button onclick="deleteEmployee(${startIndex + i})" class="delete"><i class="fa-solid fa-trash" ></i></button>
          </td>
        </tr>
      `;
    });
  } else {
    content = `
      <tr>
        <td colspan="11" class="empty">No Data Available</td>
      </tr>
    `;
  }
  tableBody.innerHTML = content;
  updateFooterText()
}

// Function to update pagination buttons
function updatePaginationButtons() {
  let totalPages = Math.ceil(currentUser.employees.length / entriesPerPage);

  let paginationButtons = "";
  paginationButtons += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Prev</button>`;
  for(let i = 1; i <= totalPages; i++) {
    paginationButtons += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
  }
  paginationButtons += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

  let paginationDiv = document.querySelector('.pagination');
  paginationDiv.innerHTML = paginationButtons;
}

// Function to navigate to a specific page
function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayCurrentPageData();
  updatePaginationButtons();
}

// Initial display
displayCurrentPageData();
updatePaginationButtons();
updateFooterText();






// Function to update the footer text
function updateFooterText() {
  let startIndex = (currentPage - 1) * entriesPerPage + 1;
  let endIndex = Math.min(startIndex + entriesPerPage - 1, currentUser.employees.length);
  let footerText = `Showing ${startIndex} to ${endIndex} from ${currentUser.employees.length} entries`;
  document.querySelector('footer p').textContent = footerText;
}

 











search.addEventListener("keyup", function () {
  let filteredEmployees = currentUser.employees.filter((employee, index) => {
    if (employee.firstName.toLowerCase().includes(search.value.trim().toLowerCase())) {
      employee.originalIndex = index; // Store the original index
      return true;
    }
    return false;
  });

  // Update the pagination based on the filtered employees
  let totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);
  currentPage = 1; // Reset to the first page

   
  // Function to update the footer text
  function updateFooterText() {
    let startIndex = (currentPage - 1) * entriesPerPage + 1;
    let endIndex = Math.min(startIndex + entriesPerPage - 1, filteredEmployees.length);
    let footerText = `Showing ${startIndex} to ${endIndex} from ${filteredEmployees.length} entries`;
    document.querySelector('footer p').textContent = footerText;
  }
// Function to update pagination buttons
function updatePaginationButtons() {
  let totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);

  let paginationButtons = "";
  paginationButtons += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Prev</button>`;
  for(let i = 1; i <= totalPages; i++) {
    paginationButtons += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
  }
  paginationButtons += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

  let paginationDiv = document.querySelector('.pagination');
  paginationDiv.innerHTML = paginationButtons;
}
// Function to display data for the current page
function displayFilteredData() {
  let filteredEmployees = currentUser.employees.filter((employee, index) => {
    if (employee.firstName.toLowerCase().includes(search.value.trim().toLowerCase())) {
      employee.originalIndex = index; // Store the original index
      return true;
    }
    return false;
  });

  let startIndex = (currentPage - 1) * entriesPerPage;
  let endIndex = startIndex + entriesPerPage;
  let paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  let content = "";
  if (paginatedEmployees.length > 0) {
    paginatedEmployees.forEach(function (employee, i) {
      content += `
        <tr>
          <td>${employee.originalIndex + 1}</td> <!-- Use the original index here -->
          <td class="user-img"><img src="${employee.img}" alt=""></td>
          <td>${employee.firstName + " " + employee.lastName}</td>
          <td>${employee.age}</td>
          <td>${employee.position}</td>
          <td>${employee.salary}</td>
          <td>${employee.phone}</td>
          <td class="action">
            <button onclick="getData(${employee.originalIndex})" class="update"><i class="fa-solid fa-pen-to-square"></i></button> <!-- Use the original index here -->
            <button onclick="deleteEmployee(${employee.originalIndex})" class="delete"><i class="fa-solid fa-trash" ></i></button> <!-- Use the original index here -->
          </td>
        </tr>
      `;
    });
  } else {
    content = `
      <tr>
        <td colspan="11" class="empty">No Data Available</td>
      </tr>
    `;
  }
  tableBody.innerHTML = content;
  updateFooterText()
}
  // Display the filtered data and update the footer text
  displayFilteredData();
  updateFooterText();
  updatePaginationButtons()
});


// Function to navigate to a specific page
function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayCurrentPageData(); // Corrected function name
  updatePaginationButtons();
}


