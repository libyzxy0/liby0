function badButton() {
    const words = ["Your'e ugly lol haha", "You crush dosen't love you!", "Wth, your face is like a monkey!", "You are noob!", "Did you know that you are ugly?", "Youre ugly at all time!", "Fuck You", "You deserve that ugly face"];
    const random = Math.floor(Math.random() * words.length);
    toastShow(words[random]);
}

function badge_yellow() {
    toastShow("Her badge is beginner!");
}
function badge_green() {
    toastShow("Her badge is beginner!");
}

//Title randomer
const titles = ["Jan Liby", "Liby", "libyzxy0", "Jan Liby Dela Costa", "libylangto"];
const random = Math.floor(Math.random() * titles.length);
var title = document.getElementById("title-randomer")
title.innerHTML = `${titles[random]}`;

function yesButton() {
    toastShow("Yieee, Iloveyousomuchhh❣️❣️");
}
function noButton() {
    toastShow("Ok☹️☹️☹️");
    p(mainSound);
}

