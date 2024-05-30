// Select DOM Elements
const productName = document.getElementById("name");
const category = document.getElementById("category");
const count = document.getElementById("count");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const mainBtn = document.getElementById("main-btn");
const totalBox = document.getElementById("total");
const tableBody = document.getElementById("table-body");
const deleteAllBox = document.getElementById("delete-all-box");
const deleteAllBtn = document.getElementById("delete-all-btn");
const search = document.getElementById("search");
const popUpModal = document.querySelector(".pop-up");
const popUpTitle = document.querySelector(".pop-up-title");
const popUpText = document.querySelector(".pop-up-text");
const popUpImg = document.querySelector(".pop-up-img");
const cancelModalBtn = document.querySelector(".cancel-modal-btn");
const deleteModalBtn = document.querySelector(".delete-modal-btn");
// Store the current index for update and delete operations
let currentIndex;
// Initialize product array if not already initialized in currentUser object
if (!currentUser.products) {
  currentUser.products = [];
}
// Display products on page load
displayProducts();
// Calculate and display total price
let calcTotal = () => {
  if (price.value != "") {
    let total =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    totalBox.innerHTML = total;
    totalBox.style.backgroundColor = "var(--main-color)";
    totalBox.style.color = "var(--always-fff)";
  } else {
    totalBox.innerHTML = "";
    totalBox.style.backgroundColor = "var(--main-hover-bg-color)";
    totalBox.style.color = "var(--always-fff)";
  }
};
// Call the calcTotal function on keyup in price,taxes,ads & discount to calculate the total on real time as any change happen
[price, taxes, ads, discount].forEach((input) =>
  input.addEventListener("keyup", calcTotal)
);
// Add or Update product based on the button's current text
mainBtn.addEventListener("click", function () {
  if (mainBtn.innerHTML == "Add Product") {
    if (validateInputs()) {
      addproduct();
      clearInputs();
      displayProducts();
    } else
      toastr["error"](
        "Please fix all the errors to be able to add the product"
      );
    setTimeout(function () {
      toastr.clear();
    }, 3000);
  } else {
    if (validateInputs()) {
      updateData(currentIndex);
      clearInputs();
      displayProducts();
    } else {
      toastr["error"](
        "Please fix all the errors to be able to update add the product"
      );
      setTimeout(function () {
        toastr.clear();
      }, 3000);
    }
  }
});
// Function to add a new product
function addproduct() {
  let product = {
    name: productName.value,
    category: category.value,
    price: Number(price.value),
    taxes: Number(taxes.value),
    ads: Number(ads.value),
    discount: Number(discount.value),
    total: totalBox.innerHTML,
  };
  // Create a new object for each product
  if (count.value > 1) {
    for (let i = 0; i < count.value; i++) {
      // Create a copy of the product object
      let newProduct = { ...product };
      // Push the copy into the currentUser.products array as a new product
      currentUser.products.push(newProduct);
    }
  } else {
    // push the product into the currentUser.products array
    currentUser.products.push(product);
  }
  // Save the users array  to the local storage
  // Users arrays that contains the current user that contain the latest product(s) added
  localStorage.setItem("users", JSON.stringify(users));
  toastr["success"]("Product added successfully!");
}
// Function to clear input fields
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
  totalBox.style.backgroundColor = "var(--main-color)";
}
// Function to display all products in the table
function displayProducts() {
  // Empty variable stores each element in the products array as a row to be displayed in the Table in the DOM
  let content = "";
  if (currentUser.products.length > 0) {
    for (let i = 0; i < currentUser.products.length; i++) {
      content += `
      <tr>
      <td>${i + 1}</td>
      <td>${currentUser.products[i].name}</td>
      <td>${currentUser.products[i].category}</td>
      <td>${currentUser.products[i].price}</td>
      <td>${currentUser.products[i].taxes}</td>
      <td>${currentUser.products[i].ads}</td>
      <td>${currentUser.products[i].discount}</td>
      <td>${currentUser.products[i].total}</td>
      <td>
      <div class="table-btns">
      <i class="fa-solid fa-pen-to-square update" onclick="getData(${i}) " ></i>
      <i class="fa-solid fa-trash delete" onclick="deleteProduct(${i})"></i>
  </div>
      </td>
  </tr>
      `;
    }
    deleteAllBox.innerHTML = `            
    <button id="delete-all-btn" onclick="deleteAll()" class="form-btn">Delete All &rAarr; ${currentUser.products.length} &lAarr;</button>  `;
  } else {
    content = `
  <tr>
    <td colspan="11" class="empty">No Data Available</td>
  </tr>
`;
    deleteAllBox.innerHTML = "";
  }
  // add content inside the table
  tableBody.innerHTML = content;
}
// Function to delete a product with confirmation modal
function deleteProduct(index) {
  // Show Modal & Set it's content
  popUpModal.classList.add("pop-up-active");
  popUpTitle.textContent = "You are about to delete a product";
  popUpText.textContent =
    "This will delete the product from your table. Are you sure ?";
  popUpImg.src = "img/delete.svg";
  // if user clicked the delete btn in the modal
  deleteModalBtn.addEventListener("click", function handleDelete() {
    currentUser.products.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    displayProducts();
    deleteModalBtn.removeEventListener("click", handleDelete);
    popUpModal.classList.remove("pop-up-active");
    toastr["success"]("Product deleted successfully!", " ");
  });
    // if user clicked the cancel btn in the modal
  cancelModalBtn.addEventListener("click", function () {
    popUpModal.classList.remove("pop-up-active");
  });
}
// Function to delete all products with confirmation modal
function deleteAll() {
  popUpModal.classList.add("pop-up-active");
  popUpTitle.textContent = "Dude Are you sane ? You will delete everything !";
  popUpText.textContent =
    "I warned you , You will delete all the products from your table.";
  popUpImg.src = "img/delete-all.svg";
  deleteModalBtn.addEventListener("click", function handleDelete() {
    currentUser.products.splice(0);
    localStorage.setItem("users", JSON.stringify(users));
    displayProducts();
    deleteModalBtn.removeEventListener("click", handleDelete);
    popUpModal.classList.remove("pop-up-active");
    toastr["success"]("All Products deleted successfully!", " ");
  });
  cancelModalBtn.addEventListener("click", function () {
    popUpModal.classList.remove("pop-up-active");
  });
}
// Function to get data of certain product and fill the input fields with it & apply some changes in th UI
function getData(index) {
  currentIndex = index;
  productName.value = currentUser.products[index].name;
  category.value = currentUser.products[index].category;
  price.value = currentUser.products[index].price;
  taxes.value = currentUser.products[index].taxes;
  ads.value = currentUser.products[index].ads;
  discount.value = currentUser.products[index].discount;
  totalBox.innerHTML = currentUser.products[index].total;
  calcTotal();
  count.style.display = "none";
  mainBtn.innerHTML = "Update Product";
  mainBtn.style.backgroundColor = "#a8a234 ";
  window.scrollTo(0, 0);
}
function updateData(index) {
  currentUser.products[index].name = productName.value;
  currentUser.products[index].category = category.value;
  currentUser.products[index].price = Number(price.value);
  currentUser.products[index].taxes = Number(taxes.value);
  currentUser.products[index].ads = Number(ads.value);
  currentUser.products[index].discount = Number(discount.value);
  currentUser.products[index].total = totalBox.innerHTML;
  localStorage.setItem("users", JSON.stringify(users));
  toastr["success"]("Product updated successfully!", " ");
  mainBtn.innerHTML = "Add Product";
  count.style.display = "block";
  mainBtn.style.backgroundColor = "var(--main-color)";
}
search.addEventListener("keyup", function () {
  let content = "";
  for (let i = 0; i < currentUser.products.length; i++) {
    if (
      currentUser.products[i].name
        .toLowerCase()
        .includes(search.value.trim().toLowerCase()) ||
      currentUser.products[i].category
        .toLowerCase()
        .includes(search.value.trim().toLowerCase())
    )
      content += `
    <tr>
    <td>${i + 1}</td>
    <td>${currentUser.products[i].name}</td>
    <td>${currentUser.products[i].category}</td>
    <td>${currentUser.products[i].price}</td>
    <td>${currentUser.products[i].taxes}</td>
    <td>${currentUser.products[i].ads}</td>
    <td>${currentUser.products[i].discount}</td>
    <td>${currentUser.products[i].total}</td>
    <td>
        <div class="table-btns">
            <i class="fa-solid fa-pen-to-square update" onclick="getData(${i}) " ></i>
            <i class="fa-solid fa-trash delete" onclick="deleteProduct(${i})"></i>
        </div>

    </td>

</tr>
    
    `;
  }
  tableBody.innerHTML = content;
});
// deleteAllBtn.addEventListener("click", function () {
// });
// price.addEventListener('keyup',function(){
//     calcTotal()
// })

//
function setError(element, message) {
  element.classList.add("error");
  tippy(element, {
    content: message,
    trigger: "manual",
    placement: "bottom",
    theme: "errorTooltip",
    arrow: true,
  }).show();
}
function setSuccess(element) {
  element.classList.remove("error");
}
// Validation functions
function validateInputs() {
  const validationFunctions = [
    validateName,
    validateCategory,
    validatePrice,
    validateTaxes,
    validateDiscount,
    validateAds,
  ];
  let isValid = true;
  validationFunctions.forEach((func) => {
    if (func() === false) isValid = false;
  });
  return isValid;
}

function validateName() {
  const nameValue = productName.value.trim();
  if (nameValue === "") {
    setError(productName, "Product name cannot be empty");
    return false;
  } else {
    setSuccess(productName);
    return true;
  }
}
function validateCategory() {
  const categoryValue = category.value.trim();
  const categoryRegex = /^[A-Za-z\s]+$/;
  if (categoryValue === "") {
    setError(category, "Category cannot be empty");
    return false;
  } else if (!categoryRegex.test(categoryValue)) {
    setError(category, "Category can only contain letters and spaces");
    return false;
  } else {
    setSuccess(category);
    return true;
  }
}
function validatePrice() {
  const priceValue = price.value.trim();
  if (priceValue === "") {
    setError(price, "Price cannot be empty");
    return false;
  } else if (Number(priceValue) <= 0) {
    setError(price, "Please enter a valid price");
    return false;
  } else {
    setSuccess(price);
    return true;
  }
}
function validateTaxes() {
  const taxesValue = taxes.value.trim();
  if (Number(taxesValue) < 0) {
    setError(taxes, "Please enter a valid taxes amount");
    return false;
  } else {
    setSuccess(taxes);
    return true;
  }
}

function validateDiscount() {
  const discountValue = discount.value.trim();
  if (Number(discountValue) < 0) {
    setError(discount, "Please enter a valid discount amount");
    return false;
  } else {
    setSuccess(discount);
    return true;
  }
}

function validateAds() {
  const adsValue = ads.value.trim();
  if (Number(adsValue) < 0) {
    setError(ads, "Please enter a valid ads amount");
    return false;
  } else {
    setSuccess(ads);
    return true;
  }
}

// Swal.fire({
//   title: 'Error!',
//   text: 'Do you want to continue',
//   icon: 'error',
//   confirmButtonText: 'Cool'
// })
//
