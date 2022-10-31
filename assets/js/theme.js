//Colors
function greenColor() {
    var primaryColor = "#2bffab";
    const headTag = document.getElementsByTagName('head')[0];
const styleTag = document.createElement("style");
styleTag.innerHTML = `:root {--primary: ${primaryColor};`;
headTag.appendChild(styleTag);
}

function blueColor() {
    var primaryColor = "#4281f5";
    const headTag = document.getElementsByTagName('head')[0];
const styleTag = document.createElement("style");
styleTag.innerHTML = `:root {--primary: ${primaryColor};`;
headTag.appendChild(styleTag);

}
function pinkColor() {
    var primaryColor = "#fa7fdb";
    const headTag = document.getElementsByTagName('head')[0];
const styleTag = document.createElement("style");
styleTag.innerHTML = `:root {--primary: ${primaryColor};`;
headTag.appendChild(styleTag);

}
function redColor() {
    var primaryColor = "#f53b3b";
    const headTag = document.getElementsByTagName('head')[0];
const styleTag = document.createElement("style");
styleTag.innerHTML = `:root {--primary: ${primaryColor};`;
headTag.appendChild(styleTag);

}


// Standard Style
const headTag = document.getElementsByTagName('head')[0];
const styleTag = document.createElement("style");
styleTag.innerHTML = `:root { 
--primary: #2bffab;
`;
headTag.appendChild(styleTag);

function lightTheme() {
    alert("Coming Soon!")
}

function darkTheme() {
    alert("Coming Soon!")
}