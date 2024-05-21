'use strict';
const mainBtn = document.querySelector('#main-btn');
const inputField = document.querySelector('#input-field');
 const taskContainer = document.querySelector('#task-container');
const tasksCount = document.querySelector('#tasks-count');
const popUpModal = document.querySelector(".pop-up");
const cancelModalBtn = document.querySelector(".cancel-modal-btn");
const deleteModalBtn = document.querySelector(".delete-modal-btn");
const categoryIcons = {
  'Personal': 'fas fa-user',
  'Work': 'fas fa-briefcase',
  'Shopping': 'fas fa-shopping-cart',
  'Coding': 'fas fa-laptop-code', 
  'Fitness': 'fas fa-dumbbell',
  'Education': 'fas fa-graduation-cap'
};
 let currentIndex = 0;
  if(!currentUser.tasks){
    currentUser.tasks=[]
  }
  if(!currentUser.completedTasks){
    currentUser.completedTasks=[]
  }
  
displayTasks();
displayCount(currentUser.tasks.length);
function displayCount(count) {
    tasksCount.textContent = count;
}

mainBtn.addEventListener('click', function () {
    if (mainBtn.innerHTML === 'Add Task') {
        if (inputField.value === '') {
            toastr.error("Input field cannot be empty");
        } else {
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
const categorySelect = document.getElementById("category-select");

function addTask() {
  
     let task = {
        name: inputField.value,
         priority: document.querySelector('input[name="priority"]:checked').value,
         category:categorySelect.value,
       
   
        };
        currentUser.tasks.push(task);
    localStorage.setItem('users', JSON.stringify(users));
    toastr.success("Task added successfully!");

    displayCount(currentUser.tasks.length);
    displayTasks();
    updateCatsTasksCount(task.category,'add')
 }
function updateCatsTasksCount(categoery,type){
  let selectedEl=document.getElementById(`${categoery}-count`);
  let num=parseInt(selectedEl.innerHTML);
  if(type==='add'){
    num++;
    selectedEl.innerHTML=`${num} Tasks`

   }
   else if(type==='delete'){
    num--;
    selectedEl.innerHTML=`${num} Tasks`
 
   }
   localStorage.setItem(`${categoery}-count`,num)

}

function getCategoeriesCounts() {
  let num;
  if (localStorage.getItem('Personal-count')) {
      num = JSON.parse(localStorage.getItem('Personal-count'));
      document.getElementById('Personal-count').innerHTML = `${num} Tasks`;
  }
  if (localStorage.getItem('Work-count')) {
      num = JSON.parse(localStorage.getItem('Work-count'));
      document.getElementById('Work-count').innerHTML = `${num} Tasks`;
  }
  if (localStorage.getItem('Shopping-count')) {
      num = JSON.parse(localStorage.getItem('Shopping-count'));
      document.getElementById('Shopping-count').innerHTML = `${num} Tasks`;
  }
  if (localStorage.getItem('Coding-count')) {
      num = JSON.parse(localStorage.getItem('Coding-count'));
      document.getElementById('Coding-count').innerHTML = `${num} Tasks`;
  }
  if (localStorage.getItem('Fitness-count')) {
      num = JSON.parse(localStorage.getItem('Fitness-count'));
      document.getElementById('Fitness-count').innerHTML = `${num} Tasks`;
  }
  if (localStorage.getItem('Education-count')) {
      num = JSON.parse(localStorage.getItem('Education-count'));
      document.getElementById('Education-count').innerHTML = `${num} Tasks`;
  }
}

getCategoeriesCounts()

function displayTasks() {
  currentUser.tasks.sort((a, b) => a.priority - b.priority); // Sort by priority
  let content = '';
  for (let i = 0; i < currentUser.tasks.length; i++) {
    let isCompleted = currentUser.completedTasks.findIndex(task => task.category === currentUser.tasks[i].category && task.name === currentUser.tasks[i].name) !== -1;
    content += `
    <div class="task-box priority-${currentUser.tasks[i].priority} ${isCompleted ? 'task-completed' : ''}">
      <div class="checkbox-wrapper">
        <div class="cbx">
          <input id="cbx-${i}" type="checkbox" onclick="done(this,${i})" ${isCompleted ? 'checked' : ''}>
          <label for="cbx-${i}"></label>
          <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>
        <div>
        <i class="task-cat ${categoryIcons[currentUser.tasks[i].category]}"></i>
        <span class="task-name"> ${currentUser.tasks[i].name}</span>
      </div>
      </div>
      <div class="task-btns">
        <button id="edit" onclick="getTaskinfo(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button id="delete" onclick="deleteTask(${i})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
  }
  taskContainer.innerHTML = content;
}



function clearInput() {
    inputField.value = '';
     document.querySelector('input[name="priority"][value="1"]').checked = true;
}

function getTaskinfo(index) {
    inputField.value = currentUser.tasks[index].name;
     document.querySelector(`input[name="priority"][value="${currentUser.tasks[index].priority}"]`).checked = true;
     categorySelect.value=currentUser.tasks[currentIndex].category;
     currentIndex = index;
    mainBtn.innerHTML = 'Update Task';
    
}

function updateTask() {
  currentUser.tasks[currentIndex].name = inputField.value;
  currentUser.tasks[currentIndex].priority = document.querySelector('input[name="priority"]:checked').value;
  currentUser.tasks[currentIndex].category = categorySelect.value; // Add this line
  localStorage.setItem('users', JSON.stringify(users));
  toastr.success("Task updated successfully!");
}


function updateReset() {
    clearInput();
    mainBtn.innerHTML = 'Add Task';
}

// function deleteTask(index) {
//   updateCatsTasksCount(tasks[index].category,'delete')
//     tasks.splice(index, 1);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     toastr.success("Task deleted successfully!");
//     displayCount(tasks.length);
//     displayTasks();
// }

function deleteTask(index) {
  // Disable all delete buttons
  document.querySelectorAll('#delete').forEach(btn => btn.disabled = true);
  popUpModal.classList.add("pop-up-active");
  function handleDelete() {
    updateCatsTasksCount(currentUser.tasks[index].category,'delete')
    currentUser.tasks.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    toastr.success("Task deleted successfully!");
    displayCount(currentUser.tasks.length);
    displayTasks();
    popUpModal.classList.remove("pop-up-active");
    deleteModalBtn.removeEventListener("click", handleDelete);

    // Re-enable all delete buttons
    document.querySelectorAll('#delete').forEach(btn => btn.disabled = false);
  }

  deleteModalBtn.addEventListener("click", handleDelete);

  cancelModalBtn.addEventListener("click", function () {
    popUpModal.classList.remove("pop-up-active");

    // Re-enable all delete buttons
    document.querySelectorAll('#delete').forEach(btn => btn.disabled = false);
  });

  displayTasks();
}

function done(currentElement,currentIndex) {
  const taskBox = currentElement.closest('.task-box');
  if(currentElement.checked){
    taskBox.classList.add('task-completed');
    currentUser.completedTasks.push(currentUser.tasks[currentIndex])
    localStorage.setItem('users', JSON.stringify(users));

  }
  else{
    taskBox.classList.remove('task-completed');
let uncomindex= currentUser.completedTasks.findIndex(task=>task.category===currentUser.tasks[currentIndex].category&&task.name===currentUser.tasks[currentIndex].name)
 currentUser.completedTasks.splice(uncomindex,1)
 console.log(currentUser.completedTasks);
 localStorage.setItem('users', JSON.stringify(users));

 }
   
 
}




document.addEventListener("DOMContentLoaded", function () {
  const categoryElements = document.querySelectorAll(".category");
  const taskElements = document.querySelectorAll(".task-box");

  categoryElements.forEach(categoryElement => {
    categoryElement.addEventListener("click", function () {
      const category = categoryElement.getAttribute("data-category");

      taskElements.forEach(taskElement => {
        if (taskElement.getAttribute("data-category") === category || category === "all") {
          taskElement.style.display = "flex";
        } else {
          taskElement.style.display = "none";
        }
      });
    });
  });

  // Add any other existing JavaScript code below
});

 
// 
// 
// 
// 
// 

