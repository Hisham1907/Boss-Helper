const totalEmployeesElem = document.getElementById("total-employees");
const totalProductsElem = document.getElementById("total-products");
const totalTasksElem = document.getElementById("total-tasks");
const employeeNoDataMessage = document.getElementById("employee-no-data");
const productNoDataMessage = document.getElementById("product-no-data");
const taskContainer = document.querySelector("#task-container");
const userDashName = document.querySelector("#user-dash-name");
userDashName.textContent=currentUser.name;
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
  document.getElementById("update-profile-btn").style.display = "none";} 
  else {
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
            "#f59e0b",  
            "#10b981",  
            "#3b82f6",   
            "#ef4444",   
            "#6366f1",   
            "#ec4899",   
            "#34d399", 
            "#f87171"    
        ]
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
            "#ec4899",   
            "#10b981",  
            "#3b82f6",   
            "#6366f1",   
            "#f59e0b",  
            "#ef4444",   
             "#f87171"    
        ]
        
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
     document.getElementById("update-profile-btn").style.display = "inline-block";
  for (let i = 0; i < 2 && i < currentUser.tasks.length; i++) {
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
