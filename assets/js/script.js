'use strict';


function toastShow(a) {
    var toast = document.getElementById("toast");
    var toastTxt = document.getElementById("toast_text");
    toast.style.display="block";
    toastTxt.innerHTML=a
    toast.style.border="0.5px solid var(--primary)";
    setTimeout(function(){
       toast.style.border="0.5px solid white";
    }, 1000);
    setTimeout(function(){
       toast.style.border="0.5px solid var(--primary)";
    }, 2000);
    setTimeout(function(){
       toast.style.display="none";
    }, 3000);
}
function p(a) {
    a.play();
}
function s(a) {
    a.pause();
}
function setCssRootVal(a) {
const headTag = document.getElementsByTagName('head')[0];
const styleTag = document.createElement("style");
styleTag.innerHTML = `:root { ${a} }`;
headTag.appendChild(styleTag);
}

//Disable Context Menu Chrome
window.oncontextmenu = function() { return false; }
