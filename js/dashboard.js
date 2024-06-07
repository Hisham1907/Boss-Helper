const totalEmployeesElem = document.getElementById("total-employees");
const totalProductsElem = document.getElementById("total-products");
const totalTasksElem = document.getElementById("total-tasks");
const employeeNoDataMessage = document.getElementById("employee-no-data");
const productNoDataMessage = document.getElementById("product-no-data");
const taskContainer = document.querySelector("#task-container");
const userDashName = document.querySelector("#user-dash-name");
userDashName.textContent = currentUser.name;
if (!currentUser.employees || currentUser.employees.length === 0) {
  employeeNoDataMessage.style.display = "block";
} else {
  totalEmployeesElem.textContent = currentUser.employees.length;
}

if (!currentUser.products || currentUser.products.length === 0) {
  productNoDataMessage.style.display = "block";
} else {
  totalProductsElem.textContent = currentUser.products.length;
}

if (!currentUser.tasks || currentUser.tasks.length === 0) {
  document.getElementById("tasks-no-data").style.display = "block";
  document.getElementById("view-all-btn").style.display = "none";
} else {
  totalTasksElem.textContent = currentUser.tasks.length;
  document.getElementById("tasks-no-data").style.display = "none";
}

const employeeChartCtx = document
  .getElementById("employeeChart")
  .getContext("2d");
const productChartCtx = document
  .getElementById("productChart")
  .getContext("2d");

if (currentUser.employees) {
  document.getElementById("employee-no-data").style.display = "none";
  new Chart(employeeChartCtx, {
    type: "bar",
    data: {
      labels: getEmployeesPositions(),
      datasets: [
        {
          label: "Average Salary by Position",
          data: getAverageSalaryByPosition(),
          backgroundColor: [
            "#c03f3f",
            "#6b5b95",
            "#ab7e4e",
            "#008080",
            "#f87171",
            "#d79614",
          ],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Average Salary",
          },
        },
      },
      maintainAspectRatio: true,
    },
  });
} else {
  document.getElementById("employee-no-data").style.display = "block";
}

function getEmployeesPositions() {
  let positions = [
    ...new Set(currentUser.employees.map((employee) => employee.position)),
  ];
  return positions;
}

function getAverageSalaryByPosition() {
  const counts = {};
  const totals = {};
  currentUser.employees.forEach((employee) => {
    if (!counts[employee.position]) {
      counts[employee.position] = 0;
      totals[employee.position] = 0;
    }
    counts[employee.position]++;
    totals[employee.position] += parseFloat(employee.salary);
  });
  return getEmployeesPositions().map((position) =>
    (totals[position] / counts[position]).toFixed(2)
  );
}

if (currentUser.products) {
  document.getElementById("product-no-data").style.display = "none";
  new Chart(productChartCtx, {
    type: "doughnut",
    data: {
      labels: getProductCategories(),
      datasets: [
        {
          label: "Products by Category",
          data: getProductCountsByCategory(),
          backgroundColor: [
            "#c03f3f",
            "#6b5b95",
            "#ab7e4e",
            "#008080",
            "#f87171",
            "#d79614",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
    },
  });
} else {
  document.getElementById("product-no-data").style.display = "block";
}

function getProductCategories() {
  const categories = [
    ...new Set(currentUser.products.map((product) => product.category)),
  ];
  return categories;
}

function getProductCountsByCategory() {
  const counts = {};
  currentUser.products.forEach((product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[1]);
}

const categoryIcons = {
  Personal: "fas fa-user",
  Work: "fas fa-briefcase",
  Shopping: "fas fa-shopping-cart",
  Coding: "fas fa-laptop-code",
  Fitness: "fas fa-dumbbell",
  Education: "fas fa-graduation-cap",
};
function displayTasks() {
  currentUser.tasks.sort((a, b) => a.priority - b.priority); // Sort by priority
  let content = "";
  document.getElementById("view-all-btn").style.display = "inline-block";
  for (let i = 0; i < 4 && i < currentUser.tasks.length; i++) {
    let task = currentUser.tasks[i];
    if (task) {
      let isCompleted =
        currentUser.completedTasks.findIndex(
          (t) => t.category === task.category && t.name === task.name
        ) !== -1;
      content += `
      <div class="task-box priority-${task.priority} ${
        isCompleted ? "task-completed" : ""
      }">
        <div class="checkbox-wrapper">
          <div class="cbx">
            <input id="cbx-${i}" type="checkbox" onclick="done(this,${i})" ${
        isCompleted ? "checked" : ""
      }>
            <label for="cbx-${i}"></label>
            <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
              <path d="M2 8.36364L6.23077 12L13 2"></path>
            </svg>
          </div>
          <div>
            <i class="task-cat ${categoryIcons[task.category]}"></i>
            <span class="task-name"> ${task.name}</span>
          </div>
        </div>
      </div>`;
    }
  }

  taskContainer.innerHTML = content;
}
if (currentUser.tasks) {
  displayTasks();
}

function done(currentElement, currentIndex) {
  const taskBox = currentElement.closest(".task-box");
  if (currentElement.checked) {
    taskBox.classList.add("task-completed");
    currentUser.completedTasks.push(currentUser.tasks[currentIndex]);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    taskBox.classList.remove("task-completed");
    let uncomindex = currentUser.completedTasks.findIndex(
      (task) =>
        task.category === currentUser.tasks[currentIndex].category &&
        task.name === currentUser.tasks[currentIndex].name
    );
    currentUser.completedTasks.splice(uncomindex, 1);
    console.log(currentUser.completedTasks);
    localStorage.setItem("users", JSON.stringify(users));
  }
}
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
"use strict";

// Select DOM Elements
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
const tableSize = document.querySelector('#table-size');

let currentImgSrc;
let currentIndex;
let currentPage = 1;
let entriesPerPage = 5;

if (!currentUser.employees) {
    currentUser.employees = [];
}

function initializeEventListeners() {
    addNewMemberBtn.addEventListener("click", openForm);
    closeBtn.addEventListener("click", closeForm);
    fileInput.addEventListener("change", handleFileInput);
    mainBtn.addEventListener("click", handleFormSubmit);
    tableSize.addEventListener('change', updateEntriesPerPage);
    cancelModalBtn.addEventListener("click", closeModal);
    popUpModal.addEventListener("click", closeModal);
    search.addEventListener("keyup", filterEmployees);
}

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
            employeeImg.src = currentImgSrc;
        };
    } else {
        toastr["info"]("The file must be less than 1 MB");
        setTimeout(toastr.clear, 3000);
    }
}

function handleFormSubmit() {
    if (validateInputs()) {
        if (mainBtn.innerHTML === "Add Employee") {
            addEmployee();
        } else {
            updateEmployee(currentIndex);
            mainBtn.innerHTML = "Add Employee";
        }
        closeForm();
        displayCurrentPageData();
        updatePaginationButtons();
    } else {
        toastr["error"]("Please fix all the errors to proceed.");
    }
}

function addEmployee() {
    const employee = {
        img: currentImgSrc || "img/user.png",
        firstName: firstName.value,
        lastName: lastName.value,
        age: age.value,
        position: position.value,
        salary: salary.value,
        phone: phone.value,
    };

    currentUser.employees.push(employee);
    localStorage.setItem("users", JSON.stringify(users));
    toastr["success"]("Employee added successfully!");

    if (currentUser.employees.length % entriesPerPage === 1) {
        goToPage(currentPage + 1);
    }
}

function updateEmployee(index) {
    currentUser.employees[index] = {
        img: currentImgSrc || "img/user.png",
        firstName: firstName.value,
        lastName: lastName.value,
        age: age.value,
        position: position.value,
        salary: salary.value,
        phone: phone.value,
    };
    localStorage.setItem("users", JSON.stringify(users));
    toastr["success"]("Employee updated successfully!");
}

function clearForm() {
    fileInput.value = "";
    employeeImg.src = "img/user.png";
    firstName.value = "";
    lastName.value = "";
    age.value = "";
    position.value = "";
    salary.value = "";
    phone.value = "";
    document.querySelectorAll('input.error').forEach(input => input.classList.remove("error"));
}

function deleteEmployee(index) {
    popUpModal.classList.add("pop-up-active");
    deleteModalBtn.onclick = function () {
        currentUser.employees.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        displayCurrentPageData();
        updatePaginationButtons();

        // Check if the current page is empty and navigate to the previous page if necessary
        let startIndex = (currentPage - 1) * entriesPerPage;
        let paginatedEmployees = currentUser.employees.slice(startIndex, startIndex + entriesPerPage);
        if (paginatedEmployees.length === 0 && currentPage > 1) {
            goToPage(currentPage - 1);
        }

        closeModal();
    };
}

function closeModal() {
    popUpModal.classList.remove("pop-up-active");
}

function getData(index) {
    currentIndex = index;
    const employee = currentUser.employees[index];
    formContainer.classList.add("appear");
    employeesForm.classList.add("appear");
    employeeImg.src = employee.img;
    currentImgSrc = employee.img;
    firstName.value = employee.firstName;
    lastName.value = employee.lastName;
    age.value = employee.age;
    position.value = employee.position;
    salary.value = employee.salary;
    phone.value = employee.phone;
    mainBtn.innerHTML = "Update Employee";
}

function filterEmployees() {
    const filteredEmployees = currentUser.employees.filter(employee =>
        employee.firstName.toLowerCase().includes(search.value.trim().toLowerCase())
    );

    displayFilteredData(filteredEmployees);
    updateFilteredPaginationButtons(filteredEmployees);
}

function displayFilteredData(filteredEmployees) {
    let content = "";
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + entriesPerPage);

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
                            <i class="fa-solid fa-pen-to-square update" onclick="getData(${startIndex + i})"></i>
                            <i class="fa-solid fa-trash delete" onclick="deleteEmployee(${startIndex + i})"></i>
                        </div>
                    </td>
                </tr>
            `;
        });
    } else {
        content = `<tr><td colspan="11" class="empty">No Data Available</td></tr>`;
    }
    tableBody.innerHTML = content;
    updateFooterText(filteredEmployees.length);
}

function updateEntriesPerPage() {
    entriesPerPage = Number(tableSize.value);
    displayCurrentPageData();
    updatePaginationButtons();
}

function displayCurrentPageData() {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedEmployees = currentUser.employees.slice(startIndex, startIndex + entriesPerPage);

    let content = "";
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
                            <i class="fa-solid fa-pen-to-square update" onclick="getData(${startIndex + i})"></i>
                            <i class="fa-solid fa-trash delete" onclick="deleteEmployee(${startIndex + i})"></i>
                        </div>
                    </td>
                </tr>
            `;
        });
    } else {
        content = `<tr><td colspan="11" class="empty">No Data Available</td></tr>`;
    }
    tableBody.innerHTML = content;
    updateFooterText(currentUser.employees.length);
}

function updateFooterText(totalEntries) {
    const startIndex = (currentPage - 1) * entriesPerPage + 1;
    const endIndex = Math.min(startIndex + entriesPerPage - 1, totalEntries);
    const footerText = `Showing ${startIndex} to ${endIndex} from ${totalEntries} entries`;
    document.querySelector('footer p').textContent = footerText;
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(currentUser.employees.length / entriesPerPage);

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
    displayCurrentPageData();
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
    }).show();
    return false;
}

function setSuccess(element) {
    element.classList.remove("error");
    return true;
}

// Initialize event listeners and initial display
initializeEventListeners();
displayCurrentPageData();
updatePaginationButtons();
updateFooterText(currentUser.employees.length);
