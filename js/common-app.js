const users = JSON.parse(localStorage.getItem("users"));
const userName = localStorage.getItem("name");
const userEmail = localStorage.getItem("email");
const currentUser = users.find(
  (user) => user.name === userName && user.email === userEmail
);

function displayProfile() {
  const profileContent = document.querySelector("#profile-name");
  profileContent.textContent = currentUser.name;
  const profileImg = document.querySelector(".profile-img img");
  profileImg.src = currentUser.img ? currentUser.img : "img/user.png";
}
displayProfile();

// Aside toggle btn Large Screen
const toggleBtn = document.querySelector("#toggle-btn");
const aside = document.querySelector("aside");
let isAsideActive = false;

if (localStorage.getItem("isAsideActive") !== null) {
  isAsideActive = JSON.parse(localStorage.getItem("isAsideActive"));
  if (isAsideActive) {
    aside.classList.add("aside-closed");
  } else {
    aside.classList.remove("aside-closed");
  }
}

toggleBtn.addEventListener("click", function () {
  isAsideActive = !isAsideActive;
  localStorage.setItem("isAsideActive", JSON.stringify(isAsideActive));
  aside.classList.toggle("aside-closed");
  handleTooltips(); // Update tooltips based on aside state
});

// Aside toggle btn Small Screen
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const asideToggle = document.querySelector(".aside-toggle");

asideToggle.addEventListener("click", function () {
  aside.classList.add("aside-closed");
  body.classList.toggle("aside-open");
  handleTooltips(); // Update tooltips based on aside state
});

overlay.addEventListener("click", function () {
  body.classList.remove("aside-open");
  handleTooltips(); // Update tooltips based on aside state
});

// Dark & Light Mode
const modeToggle = document.getElementById("mode-toggle");
const modeText = document.querySelector(".mode-text");
const loader = document.getElementById("loader");
let isChecked = false;

if (localStorage.getItem("isChecked") != null) {
  isChecked = JSON.parse(localStorage.getItem("isChecked"));
  modeToggle.checked = isChecked;
  updateTheme(isChecked);
}

modeToggle.addEventListener("change", function () {
  isChecked = this.checked;
  localStorage.setItem("isChecked", JSON.stringify(isChecked));
  updateTheme(isChecked);
});

function updateTheme(isLightMode) {
  if (isLightMode) {
    loader.classList.add("loader-light-theme");
    document.body.classList.add("light-theme");
    modeText.textContent = "Light Mode";
    document.querySelector(".fa-sun").style.display = "block";
    document.querySelector(".fa-moon").style.display = "none";
  } else {
    loader.classList.remove("loader-light-theme");
    document.body.classList.remove("light-theme");
    modeText.textContent = "Dark Mode";
    document.querySelector(".fa-sun").style.display = "none";
    document.querySelector(".fa-moon").style.display = "block";
  }
}

// Loader functions
function showLoader() {
  if (loader) {
    loader.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}
showLoader();

function hideLoader() {
  if (loader) {
    loader.style.display = "none";
    document.body.style.overflow = "visible";
  }
}
setTimeout(hideLoader, 2500);

// Function to handle tooltips based on aside state
function handleTooltips() {
  document.querySelectorAll(".menu-item a").forEach((item) => {
    if (aside.classList.contains("aside-closed")) {
      tippy(item, {
        content: item.querySelector("span").textContent,
        placement: "right",
        zIndex: 9999999,
        theme: "navTips",
      });
    } else {
      if (item._tippy) {
        // Check if tooltip is already initialized
        item._tippy.destroy();
      }
    }
  });
}
tippy("#toggle-btn", {
  content: "Toggle Menu",
  placement: "bottom",
  zIndex: 9999999,
  theme: "modes",
});

// Initial tooltips setup based on the aside state
handleTooltips();

// Logout
const logout = document.querySelector("#logout-icon");
logout.addEventListener("click", logoutHandler);

function logoutHandler() {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to logout from your account?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Logged out!",
        text: "Come back soon, we will miss you",
        icon: "success",
      }).then(() => {
        window.location.href = "signIn.html";
      });
    }
  });
}
