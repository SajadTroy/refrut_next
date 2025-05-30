let navBtn = document.getElementById("navBtn");
let closeBtn = document.getElementById("closeBtn");
let navBar = document.getElementById("navBar");

navBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
});

const header = document.querySelector(".header-mobile");
const headerDesk = document.querySelector(".header-desktop");
const logoDesk = document.getElementById("logo-desk");
const logoMobi = document.getElementById("logo-mobi");


function handleScroll() {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
        headerDesk.classList.add("scrolled");
        logoDesk.src = '/img/logo/logo.png';
        logoMobi.src = '/img/logo/logo.png';
    } else {
        header.classList.remove("scrolled");
        headerDesk.classList.remove("scrolled");
        logoDesk.src = '/img/logo/logo.png';
        logoMobi.src = '/img/logo/logo.png';
    }
}

window.addEventListener("scroll", handleScroll);
