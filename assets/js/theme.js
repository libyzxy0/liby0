//Colors
function greenColor() {
    setCssRootVal("--primary: #2bffab;");
    toastShow("Color change into Green.");
}
function blueColor() {
    setCssRootVal("--primary: #4281f5;");
    toastShow("Color change into Blue.");
}
function pinkColor() {
    setCssRootVal("--primary: #fa7fdb;");
    toastShow("Color change into Pink.");
}
function redColor() {
    setCssRootVal("--primary: #f53b3b;");
    toastShow("Color change into Red.");
}

//Theme
function darkTheme() {
    setCssRootVal(`
        --bg-gradient-onyx: linear-gradient(
    to bottom right, 
    hsl(240, 1%, 25%) 3%, 
    hsl(0, 0%, 19%) 97%);
        --bg-gradient-jet: linear-gradient(
    to bottom right, 
    hsla(240, 1%, 18%, 0.251) 0%, 
    hsla(240, 2%, 11%, 0) 100%
  ), hsl(240, 2%, 13%);
        --bg-gradient-yellow-1: linear-gradient(
    to bottom right, 
    hsl(45, 100%, 71%) 0%, 
    hsla(36, 100%, 69%, 0) 50%
  );
        --border-gradient-onyx: linear-gradient(
    to bottom right, 
    hsl(0, 0%, 25%) 0%, 
    hsla(0, 0%, 25%, 0) 50%
  );
        --jet: hsl(0, 0%, 22%);
        --onyx: hsl(240, 1%, 17%);
        --white-1: hsl(0, 0%, 100%);
        --white-2: hsl(0, 0%, 98%);
        --light-gray: hsl(0, 0%, 84%);
        --light-gray-70: hsla(0, 0%, 84%, 0.7);
        --bittersweet-shimmer: hsl(0, 43%, 51%);
        --smoky-black: hsl(0, 0%, 7%);
        --eerie-black-2: hsl(240, 2%, 12%);
        --eerie-black-1: hsl(240, 2%, 13%);
  
`);
    toastShow("Theme set to Dark Mode.");
}
function lightTheme() {
    setCssRootVal(`
        --bg-gradient-onyx: linear-gradient(
    to bottom right, 
    hsl(240, 1%, 25%) 3%, 
    hsl(0, 0%, 19%) 97%);
        --bg-gradient-jet: linear-gradient(
    to bottom right, 
    hsla(240, 1%, 18%, 0.251) 0%, 
    hsla(240, 2%, 11%, 0) 100%
  ), hsl(240, 2%, 13%);
        --bg-gradient-yellow-1: linear-gradient(
    to bottom right, 
    hsl(45, 100%, 71%) 0%, 
    hsla(36, 100%, 69%, 0) 50%
  );
        --border-gradient-onyx: linear-gradient(
    to bottom right, 
    hsl(0, 0%, 25%) 0%, 
    hsla(0, 0%, 25%, 0) 50%
  );
        --jet: hsl(0, 0%, 22%);
        --onyx: hsl(240, 1%, 17%);
        --white-1: hsl(0, 0%, 100%);
        --white-2: hsl(0, 0%, 98%);
        --light-gray: hsl(0, 0%, 84%);
        --light-gray-70: hsla(0, 0%, 84%, 0.7);
        --bittersweet-shimmer: hsl(0, 43%, 51%);
        --smoky-black: #FBFBFB;
        --eerie-black-2: hsl(240, 2%, 12%);
        --eerie-black-1: hsl(240, 2%, 13%);
`);
    
    toastShow("Theme set to Light Mode");
}
