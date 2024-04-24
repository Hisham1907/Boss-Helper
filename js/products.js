// SELECT INPUTS
let productName = document.getElementById("name");
let category = document.getElementById("category");
let count = document.getElementById("count");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let mainBtn = document.getElementById("main-btn");
let totalBox = document.getElementById("total");
let tableBody = document.getElementById("table-body");
let deleteAllBox = document.getElementById("delete-all-box");
let deleteAllBtn = document.getElementById("delete-all-btn");
let search = document.getElementById("search");
let currentIndex;

let calcTotal = () => {
  if (price.value != "") {
    let total =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    totalBox.innerHTML = total;
    totalBox.style.backgroundColor = "#0369a1";
    totalBox.style.color = "var(--light-color)";
  } else {
    totalBox.innerHTML = "";
    totalBox.style.backgroundColor = "var(--input-focus-color)";
    totalBox.style.color = "var(--main-color)";

  }
};
let products = [];
if (localStorage.getItem("products") != null) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}
mainBtn.addEventListener("click", function () {
  if (mainBtn.innerHTML == "Add Product") {
    addproduct();
    clearInputs();
    displayProducts();
  } else {
    UpdateData(currentIndex);
    clearInputs();
    displayProducts();
  }
});
function addproduct() {
  let product = {
    name: productName.value,
    category: category.value,
    count: Number(count.value),
    price: Number(price.value),
    taxes: Number(taxes.value),
    ads: Number(ads.value),
    discount: Number(discount.value),
    total: totalBox.innerHTML,
  };

  // Create a new object for each product
  if (product.count > 1) {
    for (let i = 0; i < product.count; i++) {
      let newProduct = { ...product }; // Create a copy of the product object
      products.push(newProduct); // Push the copy into the products array
    }
  } else {
    products.push(product);
  }

  localStorage.setItem("products", JSON.stringify(products));
}

function clearInputs() {
  productName.value = "";
  category.value = "";
  count.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  totalBox.innerHTML = "";
  totalBox.style.backgroundColor = "var(--input-focus-color)";
}
function displayProducts() {
  let content = "";
  for (let i = 0; i < products.length; i++) {
    content += `
    <tr>
    <td>${i + 1}</td>
    <td>${products[i].name}</td>
    <td>${products[i].category}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].ads}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>
        <div class="table-btns">
            <i class="fas fa-edit" onclick="getData(${i})" style="background-color: #f59e0b"></i>
            <i class="fas fa-trash-alt" onclick="deleteProduct(${i})" style="background-color: #ef4444"></i>
        </div>

    </td>

</tr>
    
    `;
  }
  tableBody.innerHTML = content;
  if (products.length > 0) {
    deleteAllBox.innerHTML = `            
    <button id="delete-all-btn" onclick="deleteAll()" class="form-btn">Delete All &rAarr; ${products.length} &lAarr;</button>  `;
  } else {
    deleteAllBox.innerHTML = "";
  }
}
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}
function deleteAll() {
  products.splice(0);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}
function getData(index) {
  currentIndex = index;
  productName.value = products[index].name;
  category.value = products[index].category;
  price.value = products[index].price;
  taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  totalBox.innerHTML = products[index].total;
   calcTotal()
  count.style.display='none';
  mainBtn.innerHTML = "Update Product";
  mainBtn.style.backgroundColor = "#f59e0b";
  mainBtn.style.color = "#000";
  document.querySelector('main').scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
function UpdateData(index) {
  products[index].name = productName.value;
  products[index].category = category.value;
  products[index].price = price.value;
  products[index].taxes = taxes.value;
  products[index].ads = ads.value;
  products[index].discount = discount.value;
  products[index].total = totalBox.innerHTML;
  localStorage.setItem("products", JSON.stringify(products));
  mainBtn.innerHTML = "Add Product";
  count.style.display='block';
  mainBtn.style.backgroundColor = "#1d4ed8";
  mainBtn.style.color = "#fff";
 
}

search.addEventListener('keyup',function(){
  let content=''
for(let i=0;i<products.length;i++){
if(products[i].name.toLowerCase().includes(search.value.trim().toLowerCase())||products[i].category.toLowerCase().includes(search.value.trim().toLowerCase()))
    content += `
    <tr>
    <td>${i + 1}</td>
    <td>${products[i].name}</td>
    <td>${products[i].category}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].ads}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>
        <div class="table-btns">
            <i class="fas fa-edit update" onclick="getData(${i}) " style="background-color: #f59e0b "></i>
            <i class="fas fa-trash-alt delete" onclick="deleteProduct(${i})" style="background-color: #ef4444 "></i>
        </div>

    </td>

</tr>
    
    `;
  }
  tableBody.innerHTML = content;
}
)
// deleteAllBtn.addEventListener("click", function () {
// });
// price.addEventListener('keyup',function(){
//     calcTotal()
// })


// Aside toggle btn
const toggleBtn = document.querySelector('#toggle-btn');
const aside = document.querySelector('aside');
let isAsideActive = false;

 if (localStorage.getItem('isAsideActive') !== null) {
     isAsideActive = JSON.parse(localStorage.getItem('isAsideActive'));
    console.log(isAsideActive);
     if (isAsideActive) {
        aside.classList.add('aside-active');
    } else {
        aside.classList.remove('aside-active');
    }
}

 toggleBtn.addEventListener('click', function () {
    isAsideActive = !isAsideActive;  
    localStorage.setItem('isAsideActive', JSON.stringify(isAsideActive)); // Store the updated value
    console.log(isAsideActive);
     aside.classList.toggle('aside-active');
});

// Dark & Light Mode

const modeToggle = document.getElementById("mode-toggle");
const modeText = document.querySelector(".mode-text");
let isChecked = false;
 
if(localStorage.getItem('isChecked')!=null){
  isChecked=JSON.parse(localStorage.getItem('isChecked'))
  console.log(isChecked)
  modeToggle.checked=isChecked;
  if(isChecked){
    document.body.classList.add("light-theme");
    modeText.textContent = "Light Mode";
    document.querySelector(".fa-sun").style.display = "block";
    document.querySelector(".fa-moon").style.display = "none";
  }
  else{
    document.body.classList.remove("light-theme");
    modeText.textContent = "Dark Mode";
    document.querySelector(".fa-sun").style.display = "none";
    document.querySelector(".fa-moon").style.display = "block";
  }
}
modeToggle.addEventListener("change", function () {
  if (this.checked) {
    isChecked = true;
    localStorage.setItem('isChecked',JSON.stringify(isChecked))
    document.body.classList.add("light-theme");
    modeText.textContent = "Light Mode";
    document.querySelector(".fa-sun").style.display = "block";
    document.querySelector(".fa-moon").style.display = "none";
  } else {
    isChecked = false;
    localStorage.setItem('isChecked',JSON.stringify(isChecked))

    document.body.classList.remove("light-theme");
    modeText.textContent = "Dark Mode";
    document.querySelector(".fa-sun").style.display = "none";
    document.querySelector(".fa-moon").style.display = "block";
  }
});

