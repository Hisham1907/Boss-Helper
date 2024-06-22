"use strict"; 
// Select DOM Elements
const addNewMemberBtn = document.getElementById("add-new-member");
const formContainer = document.querySelector(".form-container");
const employeesForm = document.querySelector(".employees-form");
const closeBtn = document.querySelector(".close-btn");
const employeeFormImg = document.getElementById("employee-form-img");
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
const tableSize = document.querySelector('#table-size');

// Store the current img selected by user using file input
let currentImgSrc = "img/user.png"; // Initialize with default image
let currentEmployeeId = null; // Store the current employee id for update/delete

// Initialize employees array if not already initialized in currentUser object
if (!currentUser.employees) {
    currentUser.employees = [];
}
// pagination Initializations
let currentPage = 1;
let entriesPerPage = 5;

// Event listeners
addNewMemberBtn.addEventListener("click", openForm);
closeBtn.addEventListener("click", closeForm);
fileInput.addEventListener("change", handleFileInput);
mainBtn.addEventListener("click", handleFormSubmit);
tableSize.addEventListener('change', updateEntriesPerPage);
search.addEventListener("keyup", searchEmployees);
cancelModalBtn.addEventListener("click", cancelModal);
popUpModal.addEventListener("click", closeModal);

function openForm() {
    formContainer.classList.add("appear");
    employeesForm.classList.add("appear");
}

function closeForm() {
    formContainer.classList.remove("appear");
    employeesForm.classList.remove("appear");
    clearForm();
}

function handleFileInput(e) {
    const file = fileInput.files[0];
    if (file.size < 1000000) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            currentImgSrc = reader.result;
            employeeFormImg.src = currentImgSrc;
        };
    } else {
         Swal.fire({
            text: "The file must be less than 1 MB",
           icon: "info"
         })
    }
}
// Validates form inputs and either adds or updates an employee based on the form's Button text.
function handleFormSubmit() {
    if (validateInputs()) {
        if (mainBtn.innerHTML === "Add Employee") {
            addEmployee();
        } else {
            updateEmployee(currentEmployeeId);
            mainBtn.innerHTML = "Add Employee";
        }
        closeForm();
        displayData(currentUser.employees)
        updatePaginationButtons();
    } else {
         Swal.fire({
            text: "Please fix all the errors to proceed !",
           icon: "error"
         }).then(() => {
            validateInputs() 
        });
      
    }
}

function addEmployee() {
  const employee = {
      id: Date.now(), // Unique ID for each employee
      img: currentImgSrc,
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      position: position.value,
      salary: salary.value,
      phone: phone.value,
  };

  currentUser.employees.push(employee);
  localStorage.setItem("users", JSON.stringify(users));
   Swal.fire({
     text: "Employee added successfully!",
    icon: "success"
  });
  // Calculate the total pages and the page where the new employee should be displayed
  const totalPages = Math.ceil(currentUser.employees.length / entriesPerPage);
  const targetPage = totalPages;
  goToPage(targetPage); // Navigate to the last page
}

function updateEmployee(id) {
  const employee = currentUser.employees.find(emp => emp.id === id);
  if (employee) {
      employee.img = currentImgSrc;
      employee.firstName = firstName.value; 
      employee.lastName = lastName.value;
      employee.age = age.value;
      employee.position = position.value;
      employee.salary = salary.value;
      employee.phone = phone.value;
      localStorage.setItem("users", JSON.stringify(users));
      mainBtn.innerHTML = "Add Employee";
       Swal.fire({
        text: "Employee updated successfully!",
       icon: "success"
     });
  }
}

function clearForm() {
    fileInput.value = "";
    employeeFormImg.src = "img/user.png";
    currentImgSrc = "img/user.png";
    firstName.value = "";
    lastName.value = "";
    age.value = "";
    position.value = "";
    salary.value = "";
    phone.value = "";
    document.querySelectorAll('input.error').forEach(input => input.classList.remove("error"));
    search.value=""

}

function deleteEmployee(id) {
    popUpModal.classList.add("pop-up-active");
    deleteModalBtn.onclick = function () {
        const employeeIndex = currentUser.employees.findIndex(emp => emp.id === id);
        if (employeeIndex !== -1) {
            currentUser.employees.splice(employeeIndex, 1);
            localStorage.setItem("users", JSON.stringify(users));
            Swal.fire({
                text: "Employee deleted Succesfully",
                icon: "success",
              });
             displayData(currentUser.employees)
            updatePaginationButtons();

            // Check if the current page is empty and navigate to the previous page if necessary
            const startIndex = (currentPage - 1) * entriesPerPage;
            const paginatedEmployees = currentUser.employees.slice(startIndex, startIndex + entriesPerPage);
            if (paginatedEmployees.length === 0 && currentPage > 1) {
                goToPage(currentPage - 1);
            }

            closeModal();
            updateFooterText(currentUser.employees.length);
            search.value="";

        }
    };
}

function closeModal() {
    popUpModal.classList.remove("pop-up-active");
}
function cancelModal() {
    popUpModal.classList.remove("pop-up-active");
    Swal.fire({
        text: "Cancelled Succesfully",
        icon: "success",
      });
}

function getData(id) {
    currentEmployeeId = id;
    const employee = currentUser.employees.find(emp => emp.id === id);
    if (employee) {
        formContainer.classList.add("appear");
        employeesForm.classList.add("appear");
        employeeFormImg.src = employee.img;
        currentImgSrc = employee.img;
        firstName.value = employee.firstName;
        lastName.value = employee.lastName;
        age.value = employee.age;
        position.value = employee.position;
        salary.value = employee.salary;
        phone.value = employee.phone;
        mainBtn.innerHTML = "Update Employee";
    }
}

function searchEmployees() {
    const filteredEmployees = currentUser.employees.filter(employee =>
        employee.firstName.toLowerCase().includes(search.value.trim().toLowerCase())
    );
    currentPage = 1; // Reset to the first page
    displayData(filteredEmployees);
    updateFilteredPaginationButtons(filteredEmployees);
}
 function displayData(employeesArr) {
    let content = "";
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedEmployees = employeesArr.slice(startIndex, startIndex + entriesPerPage);

    if (paginatedEmployees.length > 0) {
        paginatedEmployees.forEach((employee, i) => {
            content += `
                <tr>
                    <td>${startIndex + i + 1}</td>
                    <td class="user-img"><img src="${employee.img}" alt=""></td>
                    <td>${employee.firstName + " " + employee.lastName}</td>
                    <td>${employee.age}</td>
                    <td>${employee.position}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.phone}</td>
                    <td>
                        <div class="table-btns">
                            <i class="fa-solid fa-pen-to-square update" onclick="getData(${employee.id})"></i>
                            <i class="fa-solid fa-trash delete" onclick="deleteEmployee(${employee.id})"></i>
                        </div>
                    </td>
                </tr>
            `;
        });
    } else {
        content = `<tr><td colspan="11" class="empty">No Data Available</td></tr>`;
    }
    tableBody.innerHTML = content;
    updateFooterText(employeesArr.length);
}
function updateEntriesPerPage() {
    entriesPerPage = Number(tableSize.value);
    currentPage = Math.ceil(currentUser.employees.length / entriesPerPage); // Navigate to the last page
    displayData(currentUser.employees)
    updatePaginationButtons();
}

function updateFooterText(totalEntries) {
    const startIndex = totalEntries === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
    const endIndex = totalEntries === 0 ? 0 : Math.min(startIndex + entriesPerPage - 1, totalEntries);
    const footerText = `Showing ${startIndex} to ${endIndex} from ${totalEntries} entries`;
    document.querySelector('footer p').textContent = footerText;
  }

function updatePaginationButtons(filteredEmployees = null) {
    const totalPages = Math.ceil((filteredEmployees || currentUser.employees).length / entriesPerPage);

    let paginationButtons = `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Prev</button>`;
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
    }
    paginationButtons += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

    document.querySelector('.pagination').innerHTML = paginationButtons;
}

function updateFilteredPaginationButtons(filteredEmployees) {
    const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);

    let paginationButtons = `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Prev</button>`;
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
    }
    paginationButtons += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

    document.querySelector('.pagination').innerHTML = paginationButtons;
}

function goToPage(pageNumber) {
    currentPage = pageNumber;
    displayData(currentUser.employees)
    updatePaginationButtons();
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
    validationFunctions.forEach(func => {
        if (!func()) isValid = false;
    });
    return isValid;
}

function validateFirstName() {
    const firstNameValue = firstName.value.trim();
    const nameRegex = /^[A-Za-z]+$/;
    if (!firstNameValue) return setError(firstName, "First Name cannot be empty");
    if (!nameRegex.test(firstNameValue)) return setError(firstName, "First Name can only contain letters");
    if (firstNameValue.length < 3) return setError(firstName, "Name must be at least 3 characters long");
    if (firstNameValue.length >= 30) return setError(firstName, "Name can't be more than 30 characters long");
    return setSuccess(firstName);
}

function validateLastName() {
    const lastNameValue = lastName.value.trim();
    const nameRegex = /^[A-Za-z]+$/;
    if (!lastNameValue) return setError(lastName, "Last Name cannot be empty");
    if (!nameRegex.test(lastNameValue)) return setError(lastName, "Last Name can only contain letters");
    if (lastNameValue.length < 3) return setError(lastName, "Name must be at least 3 characters long");
    if (lastNameValue.length >= 30) return setError(lastName, "Name can't be more than 30 characters long");
    return setSuccess(lastName);
}

function validateAge() {
    const ageValue = age.value.trim();
    if (!ageValue) return setError(age, "Age cannot be empty");
    if (isNaN(ageValue) || Number(ageValue) <= 0 || Number(ageValue) > 150) return setError(age, "Please enter a valid age");
    return setSuccess(age);
}

function validatePosition() {
    const positionValue = position.value.trim();
    const positionRegex = /^[A-Za-z\s]+$/;
    if (!positionValue) return setError(position, "Position cannot be empty");
    if (!positionRegex.test(positionValue)) return setError(position, "Position can only contain letters and spaces");
    return setSuccess(position);
}

function validateSalary() {
    const salaryValue = salary.value.trim();
    if (!salaryValue) return setError(salary, "Salary cannot be empty");
    if (isNaN(salaryValue) || Number(salaryValue) <= 0) return setError(salary, "Please enter a valid salary");
    return setSuccess(salary);
}

function validatePhone() {
    const phoneValue = phone.value.trim();
    if (!phoneValue) return setError(phone, "Phone cannot be empty");
    if (!/^(\+\d{1,3})?(\d{9,15})$/.test(phoneValue)) return setError(phone, "Please enter a valid phone number");
    return setSuccess(phone);
}

function setError(element, message) {
   element.classList.add("error");
  tippy(element, {
    content: message,
    trigger: "manual",
    placement: "bottom",
    theme: "errorTooltip",
    arrow: true,
 zIndex: 9999999,
  }).show();
    return false;
}

function setSuccess(element) {
    element.classList.remove("error");
    return true;
}

// Function to add tooltips for better user guidance
function addTooltips() {
    tippy("#table-size", { content: "Select number of entries to show", placement: "top", zIndex: 9999999, theme: 'modes' });
    tippy("#search", { content: "Search for an employee", placement: "top", zIndex: 9999999, theme: 'modes' });
    tippy(".fa-magnifying-glass", { content: "Click to search", placement: "top", zIndex: 9999999, theme: 'modes' });
    tippy(".close-btn", { content: "Close", placement: "bottom", zIndex: 9999999, theme: 'modes' }); 
}
addTooltips();
 
// Initial display 
displayData(currentUser.employees)
updatePaginationButtons();
updateFooterText(currentUser.employees.length);

 
