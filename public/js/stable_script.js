let navBtn = document.getElementById("navBtn");
let closeBtn = document.getElementById("closeBtn");
let navBar = document.getElementById("navBar");

navBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
});