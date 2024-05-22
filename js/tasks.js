'use strict';

const mainBtn = document.querySelector('#main-btn');
const inputField = document.querySelector('#input-field');
const categorySelected = document.getElementById("category-select");
const taskContainer = document.querySelector('#task-container');
const tasksCount = document.querySelector('#tasks-count');
const popUpModal = document.querySelector(".pop-up");
const cancelModalBtn = document.querySelector(".cancel-modal-btn");
const deleteModalBtn = document.querySelector(".delete-modal-btn");

const categoryIcons = {
  'personal': 'fas fa-user',
  'work': 'fas fa-briefcase',
  'shopping': 'fas fa-shopping-cart',
  'coding': 'fas fa-laptop-code', 
  'fitness': 'fas fa-dumbbell',
  'education': 'fas fa-graduation-cap'
};

let currentIndex = 0;

if (!currentUser.tasks) {
  currentUser.tasks = [];
}
if (!currentUser.completedTasks) {
  currentUser.completedTasks = [];
}
if (!currentUser.tasksCategories) {
  currentUser.tasksCategories = {};
}

initializeCategories();
displayTasks(currentUser.tasks);
displayCount();

function displayCount() {
  tasksCount.textContent = currentUser.tasks.length;
}

mainBtn.addEventListener('click', function () {
  if (mainBtn.innerHTML === 'Add Task') {
    if (inputField.value === '') {
      toastr.error("Input field cannot be empty");
    } else {
      addTask();
      clearInput();
      displayTasks(currentUser.tasks);
    }
  } else {
    updateTask();
    updateReset();
    displayTasks(currentUser.tasks);
  }
});

function initializeCategories() {
  const categories = ['personal', 'work', 'shopping', 'coding', 'fitness', 'education'];
  categories.forEach(category => {
    if (!currentUser.tasksCategories[category]) {
      currentUser.tasksCategories[category] = [];
    }
  });
}

function addTask() {
  let task = {
    name: inputField.value,
    priority: document.querySelector('input[name="priority"]:checked').value,
    category: categorySelected.value,
  };
  currentUser.tasks.push(task);
  currentUser.tasksCategories[categorySelected.value].push(task);
  localStorage.setItem('users', JSON.stringify(users));
  toastr.success("Task added successfully!");

  displayCount();
  displayTasks(currentUser.tasks);
  updateCatsTasksCount();
}

const personalCount = document.getElementById('personal-count');
const workCount = document.getElementById('work-count');
const shoppingCount = document.getElementById('shopping-count');
const codingCount = document.getElementById('coding-count');
const fitnessCount = document.getElementById('fitness-count');
const educationCount = document.getElementById('education-count');
const allCount = document.getElementById('all-count');

function updateCatsTasksCount() {
  personalCount.textContent = `${currentUser.tasksCategories.personal.length} Tasks`;
  workCount.textContent = `${currentUser.tasksCategories.work.length} Tasks`;
  shoppingCount.textContent = `${currentUser.tasksCategories.shopping.length} Tasks`;
  fitnessCount.textContent = `${currentUser.tasksCategories.fitness.length} Tasks`;
  educationCount.textContent = `${currentUser.tasksCategories.education.length} Tasks`;
  codingCount.textContent = `${currentUser.tasksCategories.coding.length} Tasks`;
  allCount.textContent = `${currentUser.tasks.length} Tasks`;
}
updateCatsTasksCount();

document.querySelectorAll('.category').forEach(category => {
  category.addEventListener('click', function () {
    document.querySelectorAll('.category').forEach(category => {
      category.classList.remove('category-active');
    });
    category.classList.add('category-active');
      const categoryId = category.id;
      if (categoryId === 'all') {
          displayTasks(currentUser.tasks);
      } else {
          const categoryTasks = currentUser.tasksCategories[categoryId];
          displayTasksByCategory(categoryTasks);
      }
  });
});

function displayTasks(tasks) {
  tasks.sort((a, b) => a.priority - b.priority); // Sort by priority
  
  let content = '';
  if(tasks.length>0){
    document.getElementById("tasks-no-data").style.display = "none";
  for (let i = 0; i < tasks.length; i++) {
    let isCompleted = currentUser.completedTasks.findIndex(task => task.category === currentUser.tasks[i].category && task.name === currentUser.tasks[i].name) !== -1;
      content += `
          <div class="task-box priority-${tasks[i].priority} ${isCompleted ? 'task-completed' : ''}">
              <div class="checkbox-wrapper">
                  <div class="cbx">
                      <input id="cbx-${i}" type="checkbox" onclick="done(this,${i})" ${isCompleted ? 'checked' : ''}>
                      <label for="cbx-${i}"></label>
                      <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                          <path d="M2 8.36364L6.23077 12L13 2"></path>
                      </svg>
                  </div>
                  <div>
                      <i class="task-cat ${categoryIcons[tasks[i].category]}"></i>
                      <span class="task-name"> ${tasks[i].name}</span>
                  </div>
              </div>
              <div class="task-btns">
                  <button id="edit" onclick="getTaskinfo(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button id="delete" onclick="deleteTask(${i})"><i class="fa-solid fa-trash"></i></button>
              </div>
          </div>`;
  }
}
  else{
    document.getElementById("tasks-no-data").style.display = "block";
  }
  taskContainer.innerHTML = content;
  displayCount();
}
function displayTasksByCategory(tasks) {
  tasks.sort((a, b) => a.priority - b.priority); // Sort by priority
  let content = '';
  if(tasks.length>0){
    document.getElementById("tasks-no-data").style.display = "none";
    for (let i = 0; i < tasks.length; i++) {
      let isCompleted = currentUser.completedTasks.findIndex(task => task.category === currentUser.tasks[i].category && task.name === currentUser.tasks[i].name) !== -1;
        content += `
            <div class="task-box priority-${tasks[i].priority} ${isCompleted ? 'task-completed' : ''}">
                <div class="checkbox-wrapper">
                    <div class="cbx">
                        <input id="cbx-${i}" type="checkbox" onclick="done(this,${i})" ${isCompleted ? 'checked' : ''}>
                        <label for="cbx-${i}"></label>
                        <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                            <path d="M2 8.36364L6.23077 12L13 2"></path>
                        </svg>
                    </div>
                    <div>
                        <i class="task-cat ${categoryIcons[tasks[i].category]}"></i>
                        <span class="task-name"> ${tasks[i].name}</span>
                    </div>
                    
                </div>
             
            </div>`;
    }
  }
  else{
    document.getElementById("tasks-no-data").style.display = "block";

  }
 
  taskContainer.innerHTML = content;
  displayCount();
}


function clearInput() {
  inputField.value = '';
  document.querySelector('input[name="priority"][value="1"]').checked = true;
}

function getTaskinfo(index) {
  inputField.value = currentUser.tasks[index].name;
  document.querySelector(`input[name="priority"][value="${currentUser.tasks[index].priority}"]`).checked = true;
  categorySelected.value = currentUser.tasks[index].category;
  currentIndex = index;
  mainBtn.innerHTML = 'Update Task';
}

function updateTask() {
  currentUser.tasks[currentIndex].name = inputField.value;
  currentUser.tasks[currentIndex].priority = document.querySelector('input[name="priority"]:checked').value;
  currentUser.tasks[currentIndex].category = categorySelected.value;
  localStorage.setItem('users', JSON.stringify(users));
  toastr.success("Task updated successfully!");
}

function updateReset() {
  clearInput();
  mainBtn.innerHTML = 'Add Task';
}

function deleteTask(index) {
  document.querySelectorAll('#delete').forEach(btn => btn.disabled = true);
  popUpModal.classList.add("pop-up-active");

  function handleDelete() {
    const deletedTask = currentUser.tasks[index];
    const category = deletedTask.category;

    // Remove from currentUser.tasks
    currentUser.tasks.splice(index, 1);

    // Remove from currentUser.completedTasks if exists
    const completedIndex = currentUser.completedTasks.findIndex(task => task.category === deletedTask.category && task.name === deletedTask.name);
    if (completedIndex !== -1) {
      currentUser.completedTasks.splice(completedIndex, 1);
    }

    // Remove from category-specific tasks list
    const categoryTasks = currentUser.tasksCategories[category];
    const taskIndex = categoryTasks.findIndex(task => task.name === deletedTask.name);
    if (taskIndex !== -1) {
      categoryTasks.splice(taskIndex, 1);
    }

    localStorage.setItem('users', JSON.stringify(users));
    toastr.success("Task deleted successfully!");
    displayCount();
    displayTasks(currentUser.tasks);
    updateCatsTasksCount();
    popUpModal.classList.remove("pop-up-active");
    deleteModalBtn.removeEventListener("click", handleDelete);

    document.querySelectorAll('#delete').forEach(btn => btn.disabled = false);
  }

  deleteModalBtn.addEventListener("click", handleDelete);

  cancelModalBtn.addEventListener("click", function () {
    popUpModal.classList.remove("pop-up-active");
    document.querySelectorAll('#delete').forEach(btn => btn.disabled = false);
  });

  displayTasks(currentUser.tasks);
}


function done(currentElement, currentIndex) {
  const taskBox = currentElement.closest('.task-box');
  if (currentElement.checked) {
    taskBox.classList.add('task-completed');
    currentUser.completedTasks.push(currentUser.tasks[currentIndex]);
    localStorage.setItem('users', JSON.stringify(users));
  } else {
    taskBox.classList.remove('task-completed');
    let uncomindex = currentUser.completedTasks.findIndex(task => task.category === currentUser.tasks[currentIndex].category && task.name === currentUser.tasks[currentIndex].name);
    currentUser.completedTasks.splice(uncomindex, 1);
    localStorage.setItem('users', JSON.stringify(users));
  }
}

 
 




