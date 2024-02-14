'use strict';
const mainBtn = document.getElementById('mainBtn');
let employeeName = document.getElementById('employeeName');
let phoneNumber = document.getElementById('phoneNumber');
let salary = document.getElementById('salary');
let employeeDescription = document.getElementById('employeeDescription');
const tableBody = document.getElementById('tableBody');
const inputs = document.querySelectorAll('.form-control');
const searchBar = document.getElementById('searchBar');
const nameAlert = document.getElementById('nameAlert');
let currentIndex = 0;
let employees = [];
if (localStorage.getItem('employees') !== null) {
  employees = JSON.parse(localStorage.getItem('employees'));
  displayData();
}
const clearInput = function () {
  for (let i = 0; i < inputs.length; i++) inputs[i].value = '';
};
const addEmployee = function () {
  let employee = {
    name: employeeName.value,
    number: phoneNumber.value,
    salary: salary.value,
    description:employeeDescription.value,
  };
  employees.push(employee);
  console.log(employees);
  localStorage.setItem('employees', JSON.stringify(employees));
};
function displayData() {
  let tableItems = '';
  for (let i = 0; i < employees.length; i++) {
    tableItems += `<tr>
    <td>${i + 1}</td>
    <td>${employees[i].name}</td>
    <td>${employees[i].number}</td>
    <td>${employees[i].salary}</td>
    <td>${employees[i].description}</td>
    <td><button class="btn btn-warning"onclick="getEmployeeInfo(${i})">Update</button></td>
    <td><button class="btn btn-danger "onclick="deleteEmployee(${i})">Delete</button></td>
   </tr>`;
  }
  tableBody.innerHTML = tableItems;
}
mainBtn.addEventListener('click', function () {
  if (mainBtn.innerHTML === 'Add Employee') {
    if(employeeName.value==''||phoneNumber.value==''||salary.value==''||employeeDescription.value==''){
      alert('All fields are required')
    }
    else{
      addEmployee();
      displayData();
      clearInput();
    }
  } else {
    updateEmployee();
    displayData();
    clearInput();
  }
  
});
const deleteEmployee = function (i) {
  employees.splice(i, 1);
  localStorage.setItem('employees', JSON.stringify(employees));
  displayData();
};
const getEmployeeInfo = function (i) {
  currentIndex = i;
  employeeName.value = employees[i].name;
  phoneNumber.value = employees[i].number;
  salary.value = employees[i].salary;
  employeeDescription.value = employees[i].description;
  mainBtn.innerHTML = 'Update Employee';
};
function updateEmployee() {
  employees[currentIndex].name = employeeName.value;
  employees[currentIndex].number = phoneNumber.value;
  employees[currentIndex].salary = salary.value;
  employees[currentIndex].description = employeeDescription.value;
  localStorage.setItem('employees', JSON.stringify(employees));
  mainBtn.innerHTML = 'Add Employee';
}
searchBar.addEventListener('keyup', function () {
  for (let i = 0; i < employees.length; i++) {
    let tableItems = '';
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].name.toLowerCase().includes(this.value.toLowerCase())) {
        tableItems += `<tr>
    <td>${i + 1}</td>
    <td>${employees[i].name}</td>
    <td>${employees[i].number}</td>
    <td>${employees[i].salary}</td>
    <td>${employees[i].description}</td>
    <td><button class="btn btn-warning"onclick="getEmployeeInfo(${i})">Update</button></td>
    <td><button class="btn btn-danger "onclick="deleteEmployee(${i})"   >Delete</button></td>
   </tr>`;
      }
      tableBody.innerHTML = tableItems;
    }
  }
});


