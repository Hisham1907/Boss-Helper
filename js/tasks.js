"use strict";

// Select DOM Elements
const mainBtn = document.querySelector("#main-btn");
const inputField = document.querySelector("#input-field");
const categorySelected = document.getElementById("category-select");
const taskContainer = document.querySelector("#task-container");
const tasksCount = document.querySelector("#tasks-count");
const popUpModal = document.querySelector(".pop-up");
const cancelModalBtn = document.querySelector(".cancel-modal-btn");
const deleteModalBtn = document.querySelector(".delete-modal-btn");
const categoryFilterBtn = document.querySelector("#category-filter-btn");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".close-btn");
const personalCount = document.getElementById("personal-count");
const workCount = document.getElementById("work-count");
const shoppingCount = document.getElementById("shopping-count");
const codingCount = document.getElementById("coding-count");
const fitnessCount = document.getElementById("fitness-count");
const educationCount = document.getElementById("education-count");
const allCount = document.getElementById("all-count");
const tableSize = document.querySelector('#table-size');

// Category Icons
const categoryIcons = {
  personal: "fas fa-user",
  work: "fas fa-briefcase",
  shopping: "fas fa-shopping-cart",
  coding: "fas fa-laptop-code",
  fitness: "fas fa-dumbbell",
  education: "fas fa-graduation-cap",
};

// Store the current index for update and delete operations
let currentIndex;

// Initialize tasks array if not already initialized in currentUser object
if (!currentUser.tasks) {
  currentUser.tasks = [];
}

// Initialize completedTasks array if not already initialized in currentUser object
if (!currentUser.completedTasks) {
  currentUser.completedTasks = [];
}

// Initialize tasksCategories object if not already initialized in currentUser object
if (!currentUser.tasksCategories) {
  currentUser.tasksCategories = {};
}

// Pagination Initializations
let currentPage = 1;
let entriesPerPage = 5;

// Event Listeners
mainBtn.addEventListener("click", handleFormSubmit);
categoryFilterBtn.addEventListener("click", () => modal.classList.add("modal-active"));
modalCloseBtn.addEventListener("click", () => modal.classList.remove("modal-active"));
modal.addEventListener("click", (e) => { if (e.target.id == "category-modal") modal.classList.remove("modal-active"); });
tableSize.addEventListener('change', updateEntriesPerPage);
cancelModalBtn.addEventListener("click", cancelModal);

// Initialize categories and display tasks
initializeCategories();
displayTasks(currentUser.tasks);
displayCount();
updateCatsTasksCount();

// Display the total count of tasks
function displayCount() {
  tasksCount.textContent = currentUser.tasks.length;
}

// Add or Update task based on the button's current text
function handleFormSubmit() {
  if (mainBtn.innerHTML === "Add Task") {
    if (inputField.value === "") {
      Swal.fire({ text: "Input field cannot be empty", icon: "error" });
    } else {
      addTask();
      clearInput();
      displayData(currentUser.tasks);
    }
  } else {
    updateTask();
    updateReset();
    displayData(currentUser.tasks);
  }
}

// Initialize task categories
function initializeCategories() {
  const categories = ["personal", "work", "shopping", "coding", "fitness", "education"];
  categories.forEach((category) => {
    if (!currentUser.tasksCategories[category]) {
      currentUser.tasksCategories[category] = [];
    }
  });
}

// Function to add a new task
function addTask() {
  let task = {
    id: Date.now(),
    name: inputField.value,
    priority: document.querySelector('input[name="priority"]:checked').value,
    category: categorySelected.value,
  };

  currentUser.tasks.push(task);
  if (!currentUser.tasksCategories[categorySelected.value]) {
    currentUser.tasksCategories[categorySelected.value] = [];
  }
  currentUser.tasksCategories[categorySelected.value].push(task);
  localStorage.setItem("users", JSON.stringify(users));
   Swal.fire({
    title:'Added !'  ,
    text: "Task has been added successfully",
    icon: "success",
});

  displayCount();
  displayData(currentUser.tasks);
  updateCatsTasksCount();
}

// Function to update task counts for each category
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

document.querySelectorAll(".category-item").forEach((category) => {
  category.addEventListener("click", function () {
    document.querySelectorAll(".category-item").forEach((category) => {
      category.classList.remove("category-active");
    });
    category.classList.add("category-active");
    const categoryId = category.id;
    if (categoryId === "all") {
      displayData(currentUser.tasks);
      categoryFilterBtn.textContent = category.querySelector("h2").textContent;
    } else {
      const categoryTasks = currentUser.tasksCategories[categoryId];
      displayTasks(categoryTasks);
      categoryFilterBtn.textContent = category.querySelector("h2").textContent;
    }
  });
});

// Function to Display tasks
function displayTasks(tasks) {
  tasks.sort((a, b) => a.priority - b.priority); // Sort by priority
  let content = "";
  if (tasks.length > 0) {
    document.getElementById("tasks-no-data").style.display = "none";
    tasks.forEach((task, i) => {
      let isCompleted = currentUser.completedTasks.some(
        (completedTask) => completedTask.category === task.category && completedTask.id === task.id
      );
      content += `
        <div class="task-box priority-${task.priority} ${isCompleted ? "task-completed" : ""}">
          <div class="checkbox-wrapper">
            <div class="cbx">
              <input id="cbx-${task.id}" type="checkbox" onclick="done(this, ${task.id})" ${isCompleted ? "checked" : ""}>
              <label for="cbx-${task.id}"></label>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M2 8.36364L6.23077 12L13 2"></path>
              </svg>
            </div>
            <div>
              <i class="task-cat ${categoryIcons[task.category]}"></i>
              <span class="task-name"> ${task.name}</span>
            </div>
          </div>
          <div class="task-btns">
            <button id="edit" onclick="getTaskinfo(${task.id})"><i class="fa-solid fa-pen-to-square"></i></button>
            <button id="delete" onclick="deleteConfirmation(${task.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
    });
  } else {
    document.getElementById("tasks-no-data").style.display = "block";
  }
  taskContainer.innerHTML = content;
  displayCount();
}

// Function to clear input fields
function clearInput() {
  inputField.value = "";
  document.querySelector('input[name="priority"][value="1"]').checked = true;
}

// Function to Retrieve task information for editing & apply some changes in the UI
function getTaskinfo(id) {
  const taskIndex = currentUser.tasks.findIndex(task => task.id == id);
  inputField.value = currentUser.tasks[taskIndex].name;
  document.querySelector(`input[name="priority"][value="${currentUser.tasks[taskIndex].priority}"]`).checked = true;
  categorySelected.value = currentUser.tasks[taskIndex].category;
  currentIndex = taskIndex;
  mainBtn.innerHTML = "Update Task";
}

// Function to update task data
function updateTask() {
  const task = currentUser.tasks[currentIndex];
  const oldCategory = task.category;

  task.name = inputField.value;
  task.priority = document.querySelector('input[name="priority"]:checked').value;
  const newCategory = categorySelected.value;
  task.category = newCategory;

  // Update categories if the category has changed
  if (oldCategory !== newCategory) {
    currentUser.tasksCategories[oldCategory] = currentUser.tasksCategories[oldCategory].filter(t => t.id !== task.id);
    if (!currentUser.tasksCategories[newCategory]) {
      currentUser.tasksCategories[newCategory] = [];
    }
    currentUser.tasksCategories[newCategory].push(task);
  } else {
    const categoryTasks = currentUser.tasksCategories[oldCategory];
    const taskIndex = categoryTasks.findIndex(t => t.id === task.id);
    categoryTasks[taskIndex] = task;
  }

  localStorage.setItem("users", JSON.stringify(users));
   Swal.fire({
    title:'Updated !'  ,
    text: "Task has been updated successfully",
    icon: "success",
});
  updateCatsTasksCount();
}

// Reset the update task form
function updateReset() {
  clearInput();
  mainBtn.innerHTML = "Add Task";
}

// Function to delete task data
function deleteConfirmation(id) {
  popUpModal.classList.add("pop-up-active");
  deleteModalBtn.onclick = function () {
    deleteTask(id);
  };
}

function deleteTask(id) {
  const deletedTaskIndex = currentUser.tasks.findIndex(task => task.id == id);
  const currentTask = currentUser.tasks[deletedTaskIndex];
  const category = currentTask.category;

  // Remove from currentUser.tasks
  currentUser.tasks.splice(deletedTaskIndex, 1);
  // Remove from currentUser.completedTasks if exists
  const completedIndex = currentUser.completedTasks.findIndex(
    task => task.category === currentTask.category && task.id === currentTask.id
  );
  if (completedIndex !== -1) {
    currentUser.completedTasks.splice(completedIndex, 1);
  }
  // Remove from category-specific tasks list
  const categoryTasks = currentUser.tasksCategories[category];
  const taskIndex = categoryTasks.findIndex(task => task.id === currentTask.id);
  categoryTasks.splice(taskIndex, 1);

  localStorage.setItem("users", JSON.stringify(users));
  Swal.fire({
    title:'Deleted !'  ,
    text: "Task has been deleted successfully",
    icon: "success",
});
  displayCount();
  displayData(currentUser.tasks);
  updateCatsTasksCount();
  popUpModal.classList.remove("pop-up-active");
}

function cancelModal() {
  popUpModal.classList.remove("pop-up-active");
  Swal.fire({
    text: "Cancelled Successfully",
    icon: "success",
  });
}

// Mark a task as done
function done(currentElement, taskId) {
  const task = currentUser.tasks.find(task => task.id === taskId);
  const taskBox = currentElement.closest(".task-box");

  if (currentElement.checked) {
    taskBox.classList.add("task-completed");
    currentUser.completedTasks.push(task);
  } else {
    taskBox.classList.remove("task-completed");
    const uncomIndex = currentUser.completedTasks.findIndex(t => t.id === task.id);
    currentUser.completedTasks.splice(uncomIndex, 1);
  }

  localStorage.setItem("users", JSON.stringify(users));
}

// Pagination Functions
function displayData(tasks) {
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedTasks = tasks.slice(startIndex, startIndex + entriesPerPage);
  displayTasks(paginatedTasks);
  updateFooterText(startIndex, paginatedTasks.length, tasks.length);
  updatePaginationButtons(tasks);
}

function updateEntriesPerPage() {
  entriesPerPage = Number(tableSize.value);
  currentPage = 1; // Reset to the first page
  displayData(currentUser.tasks);
  updatePaginationButtons(currentUser.tasks);
}

function updateFooterText(startIndex, pageEntries, totalEntries) {
  if (totalEntries === 0) {
    const footerText = `Showing 0 to 0 from 0 entries`;
    document.querySelector('footer p').textContent = footerText;
  } else {
    const endIndex = startIndex + pageEntries;
    const footerText = `Showing ${startIndex + 1} to ${endIndex} from ${totalEntries} entries`;
    document.querySelector('footer p').textContent = footerText;
  }
}


function updatePaginationButtons(tasks) {
  const totalPages = Math.ceil(tasks.length / entriesPerPage);

  let paginationButtons = `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
  }
  paginationButtons += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

  document.querySelector('.pagination').innerHTML = paginationButtons;
}

function goToPage(pageNumber) {
  if (pageNumber < 1 || pageNumber > Math.ceil(currentUser.tasks.length / entriesPerPage)) return;
  currentPage = pageNumber;
  displayData(currentUser.tasks);
  updatePaginationButtons(currentUser.tasks);
}

// Initial display
displayData(currentUser.tasks);
updatePaginationButtons(currentUser.tasks);
updateFooterText(0, Math.min(entriesPerPage, currentUser.tasks.length), currentUser.tasks.length);
updateCatsTasksCount();
