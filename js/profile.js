'use strict';
const profileContent = document.querySelector('#profile-content');
profileContent.innerHTML = `<h2 class="home-title mb-4">Welcome, Boss !</h2>
     <p class="fs-5"><span class="fw-bold"> Name : </span>${localStorage.getItem(
       'name'
     )}</p>
     <p class="fs-5"><span class="fw-bold"> Email : </span>${localStorage.getItem(
       'email'
     )}</p>
       `;
