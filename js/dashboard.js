"use strict";

// Select DOM Elements
const totalEmployeesElem = document.getElementById("total-employees");
const totalProductsElem = document.getElementById("total-products");
const totalTasksElem = document.getElementById("total-tasks");
const employeeNoDataMessage = document.getElementById("employee-no-data");
const productNoDataMessage = document.getElementById("product-no-data");
const taskContainer = document.querySelector("#task-container");
const userDashName = document.querySelector("#user-dash-name");

 
// Initialize the dashboard
function initializeDashboard() {
  if (!currentUser || !currentUser.name) {
    console.error("currentUser is not defined or missing required properties.");
    return;
  }
  userDashName.textContent = currentUser.name;

  handleEmployeeData();
  handleProductData();
  handleTaskData();

  if (currentUser.tasks) {
    displayTasks(currentUser.tasks);
  }

  initializeCharts();
}

// Handle employee data
function handleEmployeeData() {
  if (!currentUser.employees || currentUser.employees.length === 0) {
    employeeNoDataMessage.style.display = "block";
    totalEmployeesElem.textContent = "0";
  } else {
    employeeNoDataMessage.style.display = "none";
    totalEmployeesElem.textContent = currentUser.employees.length;
  }
}

// Handle product data
function handleProductData() {
  if (!currentUser.products || currentUser.products.length === 0) {
    productNoDataMessage.style.display = "block";
    totalProductsElem.textContent = "0";
    document.querySelector('.product-chart').style.height = '150px';
  } else {
    productNoDataMessage.style.display = "none";
    totalProductsElem.textContent = currentUser.products.length;
    document.querySelector('.product-chart').style.height = '500px';
  }
}

// Handle task data
function handleTaskData() {
  if (!currentUser.tasks || currentUser.tasks.length === 0) {
    document.getElementById("tasks-no-data").style.display = "block";
    document.getElementById("view-all-btn").style.display = "none";
    document.querySelector('#tasks').style.height = '150px';
    totalTasksElem.textContent = "0";
  } else {
    document.getElementById("tasks-no-data").style.display = "none";
    document.getElementById("view-all-btn").style.display = "inline-block";
    document.querySelector('#tasks').style.height = '500px';
    totalTasksElem.textContent = currentUser.tasks.length;
  }
}

// Get unique positions of employees
function getEmployeesPositions() {
  if (!currentUser.employees || currentUser.employees.length === 0) return [];
  return [...new Set(currentUser.employees.map((employee) => employee.position))];
}

// Get average salary by position
function getAverageSalaryByPosition() {
  const positions = getEmployeesPositions();
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

  return positions.map((position) => (totals[position] / counts[position]).toFixed(2));
}

// Get unique product categories
function getProductCategories() {
  if (!currentUser.products || currentUser.products.length === 0) return [];
  return [...new Set(currentUser.products.map((product) => product.category))];
}

// Get product counts by category
function getProductCountsByCategory() {
  const categories = getProductCategories();
  const counts = {};

  currentUser.products.forEach((product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });

  return categories.map((category) => counts[category]);
}

// Category Icons
const categoryIcons = {
  personal: "fas fa-user",
  work: "fas fa-briefcase",
  shopping: "fas fa-shopping-cart",
  coding: "fas fa-laptop-code",
  fitness: "fas fa-dumbbell",
  education: "fas fa-graduation-cap",
};

// Display tasks
function displayTasks(tasks) {
  // Check if tasks is an array
  if (!Array.isArray(tasks)) {
    console.error("Tasks should be an array.");
    return;
  }

  tasks.sort((a, b) => a.priority - b.priority); // Sort by priority
  let content = "";
  if (tasks.length > 0) {
    document.getElementById("tasks-no-data").style.display = "none";
    tasks.forEach((task) => {
      // Check if task and task.category are not null or undefined
      if (!task || !task.category) {
        console.error("Task or task category is null or undefined.");
        return;
      }

      let isCompleted = currentUser.completedTasks.some(
        (completedTask) =>
          completedTask &&
          completedTask.category === task.category &&
          completedTask.id === task.id
      );

      content += `
        <div class="task-box priority-${task.priority} ${
        isCompleted ? "task-completed" : ""
      }">
          <div class="checkbox-wrapper">
            <div class="cbx">
              <input id="cbx-${task.id}" type="checkbox" onclick="done(this, ${
        task.id
      })" ${isCompleted ? "checked" : ""}>
              <label for="cbx-${task.id}"></label>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M2 8.36364L6.23077 12L13 2"></path>
              </svg>
            </div>
            <div>
              <i class="task-cat ${categoryIcons[task.category] || 'fas fa-question-circle'}"></i>
              <span class="task-name"> ${task.name}</span>
            </div>
          </div>
           
        </div>`;
    });
  } else {
    document.getElementById("tasks-no-data").style.display = "block";
  }
  taskContainer.innerHTML = content;
 }


// Mark task as done
function done(currentElement, taskId) {
  const taskBox = currentElement.closest(".task-box");
  const task = currentUser.tasks.find((task) => task.id === taskId);

  if (!task) {
    console.error("Task not found.");
    return;
  }

  if (currentElement.checked) {
    taskBox.classList.add("task-completed");
    if (!currentUser.completedTasks) {
      currentUser.completedTasks = [];
    }
    currentUser.completedTasks.push(task);
  } else {
    taskBox.classList.remove("task-completed");
    const index = currentUser.completedTasks.findIndex(
      (t) => t.category === task.category && t.id === task.id
    );
    if (index !== -1) currentUser.completedTasks.splice(index, 1);
  }

  localStorage.setItem("users", JSON.stringify(users));
}

// Initialize charts
function initializeCharts() {
  if (currentUser.employees && currentUser.employees.length > 0) {
    new Chart(document.getElementById("employeeChart").getContext("2d"), {
      type: "bar",
      data: {
        labels: getEmployeesPositions(),
        datasets: [
          {
            label: "Average Salary by Position",
            data: getAverageSalaryByPosition(),
            backgroundColor: ["#c03f3f", "#6b5b95", "#ab7e4e", "#008080", "#f87171", "#d79614"],
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
    employeeNoDataMessage.style.display = "block";
  }

  if (currentUser.products && currentUser.products.length > 0) {
    new Chart(document.getElementById("productChart").getContext("2d"), {
      type: "doughnut",
      data: {
        labels: getProductCategories(),
        datasets: [
          {
            label: "Products by Category",
            data: getProductCountsByCategory(),
            backgroundColor: ["#c03f3f", "#6b5b95", "#ab7e4e", "#008080", "#f87171", "#d79614"],
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
      },
    });
  } else {
    productNoDataMessage.style.display = "block";
  }
}

// Initial call to initialize the dashboard
document.addEventListener("DOMContentLoaded", initializeDashboard);
