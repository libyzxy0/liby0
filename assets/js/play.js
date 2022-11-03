var mainSound = document.getElementById("background_music")
var sound = document.getElementById("sound");
var sound1 = document.getElementById("sound1");
var sound2 = document.getElementById("sound2");
var sound3 = document.getElementById("sound3");
var sound4 = document.getElementById("sound4");
var sound5 = document.getElementById("sound5");
var sound6 = document.getElementById("sound6");

    

document.querySelector("#playBG").addEventListener("click", () => {
    toastShow("Playing Background music...");
    p(mainSound);
    s(sound);
    s(sound1);
    s(sound2);
    s(sound3);
    s(sound4);
    s(sound5);
    s(sound6);
})
document.querySelector("#play").addEventListener("click", () => {
    toastShow("Playing Somewhere only we know - Keane...");
    s(mainSound);
    p(sound);
    s(sound1);
    s(sound2);
    s(sound3);
    s(sound4);
    s(sound5);
    s(sound6);
})
document.querySelector("#play1").addEventListener("click", () => {
    toastShow("Playing The Lumineers - Ho Hey...");
    s(mainSound);
    s(sound);
    p(sound1);
    s(sound2);
    s(sound3);
    s(sound4);
    s(sound5);
    s(sound6);
})
document.querySelector("#play2").addEventListener("click", () => {
    toastShow("Playing I wanna be yours - Acrtic Monkeys...");
    s(mainSound);
    s(sound);
    s(sound1);
    p(sound2);
    s(sound3);
    s(sound4);
    s(sound5);
    s(sound6);
})
document.querySelector("#play3").addEventListener("click", () => {
    toastShow("Playing Until i found you - Stephen Sanchez...");
    s(mainSound);
    s(sound);
    s(sound1);
    s(sound2);
    p(sound3);
    s(sound4);
    s(sound5);
    s(sound6);
})
document.querySelector("#play4").addEventListener("click", () => {
    toastShow("Playing Dumb Dumb - Mazie...");
    s(mainSound);
    s(sound);
    s(sound1);
    s(sound2);
    s(sound3);
    p(sound4);
    s(sound5);
    s(sound6);
})
document.querySelector("#play5").addEventListener("click", () => {
    toastShow("Playing Shinunoga - Fujii Kaze...");
    s(mainSound);
    s(sound);
    s(sound1);
    s(sound2);
    s(sound3);
    s(sound4);
    p(sound5);
    s(sound6);
})
document.querySelector("#play6").addEventListener("click", () => {
    toastShow("Playing I Love You So - The Walters...");
    s(mainSound);
    s(sound);
    s(sound1);
    s(sound2);
    s(sound3);
    s(sound4);
    s(sound5);
    p(sound6);
})

