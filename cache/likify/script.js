function openMenu() {
var menu = document.querySelector(".navbar");
    var menuBtn = document.querySelector(".ri-menu-3-line");
    var menuBtn1 = document.querySelector(".ri-menu-2-line");
    menuBtn.classList="menu-1 ri-menu-3-line";
    menuBtn1.classList="menu ri-menu-2-line";
    menu.classList="navbar nav_active"
}
function closeMenu() {
var menu = document.querySelector(".navbar");
    var menuBtn = document.querySelector(".ri-menu-3-line");
    var menuBtn1 = document.querySelector(".ri-menu-2-line");
    menuBtn.classList="menu ri-menu-3-line";
    menuBtn1.classList="menu-1 ri-menu-2-line";
    menu.classList="navbar"
}
