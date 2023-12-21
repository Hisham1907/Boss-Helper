'use strict';
const mainBtn = document.querySelector('#main-btn');
const inputField = document.querySelector('#input-field');
const taskContainer = document.querySelector('#task-container');
const tasksCount = document.querySelector('#tasks-count');
const error = document.querySelector('#error');
const deleteBtn = document.querySelector('#delete');
const checkIcon = document.querySelector('#check-icon');
let currentIndex = 0;

let counter = 0;
let tasks = [];
if (localStorage.getItem('tasks') !== null) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  counter = localStorage.getItem('counter');
  displayTasks();
  displayCount(counter);
}
function displayCount(counter) {
  tasksCount.innerHTML = counter;
}
mainBtn.addEventListener('click', function () {
  if (mainBtn.innerHTML == 'Add') {
    if (inputField.value == '') {
      error.classList.remove('d-none');
    } else {
      error.classList.add('d-none');
      addTask();
      displayTasks();
      clearInput();
    }
  } else {
    updateTask();
    displayTasks();
    updateReset();
  }
});
function addTask() {
  let task = {
    name: inputField.value,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  counter++;
  localStorage.setItem('counter', counter);
  displayCount(counter);
}
function displayTasks() {
  let content = '';
  for (let i = 0; i < tasks.length; i++) {
    content += `
      <div class="shadow bg-white mb-3 p-2 rounded-2 d-flex justify-content-between  ">
                      <div class="d-flex justify-content-center align-items-center">
                       <i onclick="done(this)" id="check-icon" class="fa-regular fa-circle-check me-3 fa-lg"></i>
                        <span>${tasks[i].name}</span>
                      </div>
                      <div class="task-btns">
                          <button id="edit" onclick="getTaskinfo(${i})" class=" btn btn-primary me-2 ">
                              <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button id="delete" onclick="deleteTask(${i})" class=" btn btn-danger">
                              <i class="fa-solid fa-trash"></i> 
                          </button>
                      </div>
                   </div>
      `;
  }
  taskContainer.innerHTML = content;
}
function clearInput() {
  inputField.value = '';
}
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  counter--;
  localStorage.setItem('counter', counter);
  displayCount(counter);
  displayTasks();
}
function getTaskinfo(index) {
  currentIndex = index;
  inputField.value = tasks[currentIndex].name;
  mainBtn.innerHTML = 'Update';
  mainBtn.classList.add('bg-warning');
  mainBtn.style.color = 'black';
}
function updateTask() {
  tasks[currentIndex].name = inputField.value;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function updateReset() {
  clearInput();
  mainBtn.innerHTML = 'Add';
  mainBtn.classList.remove('bg-warning');
  mainBtn.style.color = 'white';
}
function done(checkIcon) {
  checkIcon.classList.toggle('fa-regular');
  checkIcon.classList.toggle('fa-solid');
  checkIcon.nextElementSibling.classList.toggle('checked');
}
