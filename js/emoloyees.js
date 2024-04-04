// CRUD
let addNewMemberBtn = document.getElementById("add-new-member");
let formContainer = document.querySelector(".form-container");
let employeesForm = document.querySelector(".employees-form");
let closeBtn = document.querySelector(".close-btn");
let employeeImg = document.getElementById("employee-img");
let fileInput = document.getElementById("file-input");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let age = document.getElementById("age");
let position = document.getElementById("position");
let salary = document.getElementById("salary");
let startDate = document.getElementById("start-date");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let mainBtn = document.getElementById("main-btn");
let tableBody = document.getElementById("tableBody");
let search = document.getElementById("search");
let currentImgSrc;
let currentIndex;
let employees = [];
if (localStorage.getItem('employees')!=null){
  employees=JSON.parse(localStorage.getItem('employees'))
  displayData()
}
addNewMemberBtn.addEventListener("click", function () {
  formContainer.classList.add("appear");
  employeesForm.classList.add("appear");
});
closeBtn.addEventListener("click", function () {
  formContainer.classList.remove("appear");
  employeesForm.classList.remove("appear");
  
});
fileInput.addEventListener("change", function (e) {
  let file = e.target.files[0];
  if (file.size < 1000000) {
    let src = URL.createObjectURL(file);
    employeeImg.src = src;
    currentImgSrc=src;
  } else {
    alert("The file is too long");
  }
});
mainBtn.addEventListener("click", function () {
if (mainBtn.innerHTML=='Add Employee'){
  addEmployee();
  clear();
  displayData();
}
else{
  updateData(currentIndex)
  displayData()
  clear()
  mainBtn.innerHTML="Add Employee" 
}
  formContainer.classList.remove("appear");
  employeesForm.classList.remove("appear");
});
function addEmployee() {
  let employee = {
    img: currentImgSrc || 'images/user.jpg',
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
    position: position.value,
    salary: salary.value,
    startDate: startDate.value,
    email: email.value,
    phone: phone.value,
  };
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

}
function clear() {
  fileInput.value = "";
  firstName.value = "";
  lastName.value = "";
  age.value = "";
  position.value = "";
  salary.value = "";
  startDate.value = "";
  email.value = "";
  phone.value = "";
  employeeImg.src ='images/user.jpg';
}
function displayData() {
  let content = "";
  for (let i = 0; i < employees.length; i++) {
    content += `
    <tr>
    <td>${i + 1}</td>
    <td class="user-img"><img src="${employees[i].img}" alt=""></td>
    <td>${employees[i].firstName + " " + employees[i].lastName}</td>
    <td>${employees[i].age}</td>
     <td>${employees[i].position}</td>
    <td>${employees[i].salary}</td>
     <td>${employees[i].email}</td>
    <td>${employees[i].phone}</td>
    <td class="action">
        <button><i class="fa-regular fa-eye"></i></button>
        <button onclick="getData(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
        <button onclick="deleteEmployee(${i})"><i class="fa-regular fa-trash-can" ></i></button>
    </td>
</tr>
    `;
  }
  tableBody.innerHTML = content;
}
function deleteEmployee(index){
employees.splice(index,1)
localStorage.setItem("employees", JSON.stringify(employees));
displayData()
}
function getData(i){
  currentIndex=i;
  formContainer.classList.add("appear");
  employeesForm.classList.add("appear");
  // fileInput.value = employees[i].img;
  firstName.value = employees[i].firstName;
  lastName.value = employees[i].lastName;
  age.value = employees[i].age;
  position.value = employees[i].position;
  salary.value = employees[i].salary;
  startDate.value = employees[i].startDate;
  email.value = employees[i].email;
  phone.value = employees[i].phone;
mainBtn.innerHTML="Update Employee" 
 }
function updateData(i){
   employees[i].firstName=firstName.value;
  employees[i].lastName=lastName.value 
  employees[i].age=age.value
  employees[i].position=position.value
  employees[i].salary=salary.value
  employees[i].email=email.value
  employees[i].phone=phone.value

}


search.addEventListener('keyup',function(){
  let content='';
for(let i=0;i<employees.length;i++){
  if(employees[i].firstName.toLowerCase().includes(search.value.trim().toLowerCase()))
  {
    content += `
    <tr>
    <td>${i + 1}</td>
    <td class="user-img"><img src="${employees[i].img}" alt=""></td>
    <td>${employees[i].firstName + " " + employees[i].lastName}</td>
    <td>${employees[i].age}</td>
     <td>${employees[i].position}</td>
    <td>${employees[i].salary}</td>
     <td>${employees[i].email}</td>
    <td>${employees[i].phone}</td>
    <td class="action">
        <button><i class="fa-regular fa-eye"></i></button>
        <button onclick="getData(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
        <button onclick="deleteEmployee(${i})"><i class="fa-regular fa-trash-can" ></i></button>
    </td>
</tr>
    `;
  
  }
}
tableBody.innerHTML = content;

})








// Aside toggle btn
let toggleBtn=document.querySelector('#toggle-btn');
let aside=document.querySelector('aside')
toggleBtn.addEventListener('click',function(){
    aside.classList.toggle('aside-active')
 })
// Dark Mode

const modeToggle = document.getElementById('mode-toggle');
const modeText = document.querySelector('.mode-text');

modeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('light-theme');
        modeText.textContent = 'Light Mode';
        document.querySelector('.fa-sun').style.display='block'
        document.querySelector('.fa-moon').style.display='none'
    } else {
        document.body.classList.remove('light-theme');
        modeText.textContent = 'Dark Mode';
        document.querySelector('.fa-sun').style.display='none'
        document.querySelector('.fa-moon').style.display='block'
    }
});