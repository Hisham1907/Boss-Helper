const totalEmployeesElem = document.getElementById('total-employees');
const totalProductsElem = document.getElementById('total-products');
const totalTasksElem = document.getElementById('total-tasks');

totalEmployeesElem.textContent = currentUser.employees.length;
totalProductsElem.textContent = currentUser.products.length;
totalTasksElem.textContent = currentUser.tasks.length;

const employeeChartCtx = document.getElementById('employeeChart').getContext('2d');
const productChartCtx = document.getElementById('productChart').getContext('2d');
 
const userNameElem = document.getElementById('user-name');
const userEmailElem = document.getElementById('user-email');
const userPhoneElem = document.getElementById('user-phone');
const userCompanyElem = document.getElementById('user-company');
const welcomeBoss = document.querySelector('.welcome-boss');

  welcomeBoss.textContent=`Welcome Back, ${currentUser.name}`
userNameElem.textContent = `Name: ${currentUser.name}`;
userEmailElem.textContent = `Email: ${currentUser.email}`;
userPhoneElem.textContent = `Phone: ${currentUser.phone || 'N/A'}`;
userCompanyElem.textContent = `Company: ${currentUser.company || 'N/A'}`;

const activitiesListElem = document.getElementById('activities-list');


if (currentUser.employees.length > 0) {
  document.getElementById('employee-no-data').style.display = 'none';
  new Chart(employeeChartCtx, {
    type: 'bar',
    data: {
      labels: getEmployeesPositions(),
      datasets: [{
        label: 'Average Salary by Position',
        data: getAverageSalaryByPosition(),
        backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Average Salary'
          }
        }
      },
      maintainAspectRatio:true

    }
  });
} else {
   document.getElementById('employee-no-data').style.display = 'block';

}

function getEmployeesPositions() {
  let positions = [...new Set(currentUser.employees.map(employee => employee.position))];
  return positions;
}

function getAverageSalaryByPosition() {
  const counts = {};
  const totals = {};
  currentUser.employees.forEach(employee => {
    if (!counts[employee.position]) {
      counts[employee.position] = 0;
      totals[employee.position] = 0;
    }
    counts[employee.position]++;
    totals[employee.position] += parseFloat(employee.salary);
  });
  return getEmployeesPositions().map(position => (totals[position] / counts[position]).toFixed(2));
}

if (currentUser.products.length > 0) {
  document.getElementById('product-no-data').style.display = 'none';
  new Chart(productChartCtx, {
    type: 'doughnut',
    data: {
      labels: getProductCategories(),
      datasets: [{
        label: 'Products by Category',
        data: getProductCountsByCategory(),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1']
      }]
    },
    options :{
maintainAspectRatio:true
    }
  });
} else {
  document.getElementById('product-no-data').style.display = 'block';
}

function getProductCategories() {
  const categories = [...new Set(currentUser.products.map(product => product.category))];
  return categories;
}

function getProductCountsByCategory() {
  const counts = {};
  currentUser.products.forEach(product => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(entry => entry[1]);
}
 
