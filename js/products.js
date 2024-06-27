"use strict";
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
const search = document.getElementById("search");
const popUpModal = document.querySelector(".pop-up");
const popUpTitle = document.querySelector(".pop-up-title");
const popUpText = document.querySelector(".pop-up-text");
const popUpImg = document.querySelector(".pop-up-img");
const cancelModalBtn = document.querySelector(".cancel-modal-btn");
const deleteModalBtn = document.querySelector(".delete-modal-btn");
const tableSize = document.querySelector('#table-size');

// Store the current productIndex for update and delete operations
let currentId;
let currentPage = 1;
let entriesPerPage = 5;

if (!currentUser.products) {
  currentUser.products = [];
}
let formMode = "add"; // "add" or "update"

// Event listeners
[price, taxes, ads, discount].forEach((input) =>
  input.addEventListener("keyup", calcTotal)
);
mainBtn.addEventListener("click", handleFormSubmit);
tableSize.addEventListener('change', updateEntriesPerPage);
search.addEventListener("keyup", searchProducts);
cancelModalBtn.addEventListener("click", cancelModal);

function calcTotal() {
  if (price.value !== "") {
    let total =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    totalBox.innerHTML = total;
    totalBox.classList.add('total-active');
  } else {
    totalBox.innerHTML = "";
    totalBox.classList.remove('total-active');
    totalBox.classList.add('total-default');
  }
}

function handleFormSubmit() {
  if (validateInputs()) {
    if (formMode == "add") {
      addProduct();
    } else {
      updateProduct(currentId);
      mainBtn.innerHTML = "Add Product";
    }
    clearInputs();
    displayData(currentUser.products);
    updatePaginationButtons();
  } else {
    Swal.fire({
      text: "Please fix all the errors to proceed!",
      icon: "error"
    }).then(() => {
      validateInputs();
    });
  }
}

function addProduct() {
  let product = {
    id: Date.now(),
    name: productName.value,
    category: category.value,
    price: Number(price.value),
    taxes: Number(taxes.value),
    ads: Number(ads.value),
    discount: Number(discount.value),
    total: totalBox.innerHTML,
  };
  if (count.value > 1) {
    for (let i = 0; i < count.value; i++) {
      currentUser.products.push({ ...product });
    }
  } else {
    currentUser.products.push(product);
  }

  localStorage.setItem("users", JSON.stringify(users));
  Swal.fire({
    title:'Added !'  ,
    text: "Product has been added successfully!",
    icon: "success"
  });

  goToPage(Math.ceil(currentUser.products.length / entriesPerPage));
}

function updateProduct(id) {
  let product = currentUser.products.find(product => product.id === currentId);
  if (isProductChanged(product)){
    product.name = productName.value;
    product.category = category.value;
    product.price = Number(price.value);
    product.taxes = Number(taxes.value);
    product.ads = Number(ads.value);
    product.discount = Number(discount.value);
    product.total = totalBox.innerHTML;
    localStorage.setItem("users", JSON.stringify(users));
    Swal.fire({
      title:'Updated !'  ,
      text: "Product has been updated successfully!",
      icon: "success"
    });
   
  }else{
    Swal.fire({
      title: 'No changes detected',
      text: "No updates were made as no changes were detected.",
      icon: "info"
  });
  }
  formMode == "add";
  mainBtn.classList.remove('form-btn-update');
  mainBtn.classList.add('form-btn-default');
}

function isProductChanged(product){
return(
  product.name != productName.value||
  product.category != category.value||
  product.price != Number(price.value)||
  product.taxes != Number(taxes.value)||
  product.ads != Number(ads.value)||
  product.discount != Number(discount.value)
)
}
function clearInputs() {
  productName.value = "";
  category.value = "";
  count.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  totalBox.innerHTML = "";
  totalBox.classList.add('total-default');
  totalBox.classList.remove('total-active');
  search.value=""

}

function displayData(productsArr) {
  let content = "";
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedProducts = productsArr.slice(startIndex, startIndex + entriesPerPage);

  if (paginatedProducts.length > 0) {
    paginatedProducts.forEach((product, i) => {
      content += `
        <tr>
          <td>${startIndex + i + 1}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.taxes}</td>
          <td>${product.ads}</td>
          <td>${product.discount}</td>
          <td>${product.total}</td>
          <td>
            <div class="table-btns">
              <i class="fa-solid fa-pen-to-square update" onclick="getData(${product.id})"></i>
              <i class="fa-solid fa-trash delete" onclick="confirmDelete(${product.id})"></i>
            </div>
          </td>
        </tr>
      `;
    });
  } else {
    content = `
      <tr>
        <td colspan="9" class="empty">No Data Available</td>
      </tr>
    `;
  }

  if(paginatedProducts.length > 1){
    deleteAllBox.innerHTML = `
    <button id="delete-all-btn" onclick="confirmDeleteAll()" class="form-btn form-btn-default">Delete All &rAarr; ${currentUser.products.length} &lAarr;</button>
  `;
  }
  else{
    deleteAllBox.innerHTML = "";

  }

  tableBody.innerHTML = content;
  updateFooterText(productsArr.length);
}

function confirmDelete(id) {
  popUpModal.classList.add("pop-up-active");
  popUpTitle.textContent = "You are about to delete a product";
  popUpText.textContent = "This will delete the product from your table. Are you sure?";
  popUpImg.src = "img/svgs/delete-product.svg";

  deleteModalBtn.onclick = function () {
    deleteProduct(id);
  };
}

function confirmDeleteAll() {
  popUpModal.classList.add("pop-up-active");
  popUpTitle.textContent = "Dude Are you sane? You will delete everything!";
  popUpText.textContent = "I warned you, You will delete all the products from your table.";
  popUpImg.src = "img/svgs/delete-all-tasks.svg";

  deleteModalBtn.onclick = function () {
    deleteAll();
  };
}

function deleteProduct(id) {
  const productIndex = currentUser.products.findIndex(product => product.id === id);
  currentUser.products.splice(productIndex, 1);
  localStorage.setItem("users", JSON.stringify(users));
  Swal.fire({
    title:'Deleted !'  ,
    text: "Product has been deleted successfully!",
    icon: "success"
  });
  displayData(currentUser.products);
  updatePaginationButtons();
  updateFooterText(currentUser.products.length);
  search.value="";

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedProducts = currentUser.products.slice(startIndex, startIndex + entriesPerPage);
  if (paginatedProducts.length === 0 && currentPage > 1) {
    goToPage(currentPage - 1);
  }
  closeModal();
}

function deleteAll() {
  currentUser.products.splice(0);
  localStorage.setItem("users", JSON.stringify(users));
  displayData(currentUser.products);
  updatePaginationButtons();
  updateFooterText(currentUser.products.length);

  closeModal();
  search.value="";
  Swal.fire({
    title:'Clear !'  ,
    text: "All Products have been deleted successfully!",
    icon: "success"
  });
}

function closeModal() {
  popUpModal.classList.remove("pop-up-active");
}

function cancelModal() {
  popUpModal.classList.remove("pop-up-active");
  Swal.fire({
    text: "Cancelled Successfully",
    icon: "success",
  });
}
popUpModal.addEventListener('click',function(e){
  if(e.target==popUpModal)closeModal();
})
function getData(id) {
  formMode = "update";
  currentId = id;
  let product = currentUser.products.find(product => product.id === currentId);
  console.log(product);
  productName.value = product.name;
  category.value = product.category;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  totalBox.innerHTML = product.total;
  calcTotal();
  count.style.display = "none";
  mainBtn.innerHTML = "Update Product";
  mainBtn.classList.remove('form-btn-default');
  mainBtn.classList.add('form-btn-update');
  window.scrollTo(0, 0);
}

function searchProducts() {
  const filteredProducts = currentUser.products.filter(product =>
    product.name.toLowerCase().includes(search.value.trim().toLowerCase()) ||
    product.category.toLowerCase().includes(search.value.trim().toLowerCase())
  );
  currentPage = 1; // Reset to the first page
  displayData(filteredProducts);
  updateFilteredPaginationButtons(filteredProducts);
}

function updateEntriesPerPage() {
  entriesPerPage = Number(tableSize.value);
  currentPage = Math.ceil(currentUser.products.length / entriesPerPage); // Navigate to the last page
  displayData(currentUser.products);
  updatePaginationButtons();
}

function updateFooterText(totalEntries) {
  const startIndex = totalEntries === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
  const endIndex = totalEntries === 0 ? 0 : Math.min(startIndex + entriesPerPage - 1, totalEntries);
  const footerText = `Showing ${startIndex} to ${endIndex} from ${totalEntries} entries`;
  document.querySelector('footer p').textContent = footerText;
}

function updatePaginationButtons(filteredProducts = null) {
  const totalPages = Math.ceil((filteredProducts || currentUser.products).length / entriesPerPage);

  let paginationButtons = `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
  }
  paginationButtons += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

  document.querySelector('.pagination').innerHTML = paginationButtons;
}

function updateFilteredPaginationButtons(filteredProducts) {
  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);

  let paginationButtons = `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
  }
  paginationButtons += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

  document.querySelector('.pagination').innerHTML = paginationButtons;
}

function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayData(currentUser.products);
  updatePaginationButtons();
}

// Validation Functions
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

function validateInputs() {
  const validationFunctions = [
    validateName,
    validateCategory,
    validatePrice,
    validateTaxes,
    validateDiscount,
    validateAds
  ];
  let isValid = true;
  validationFunctions.forEach((func) => {
    if (!func()) isValid = false;
  });
  return isValid;
}

// Initial display
displayData(currentUser.products);
updatePaginationButtons();
updateFooterText(currentUser.products.length);
