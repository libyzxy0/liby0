
//Audios

document.querySelector("#play1").addEventListener("click", () => {
    document.getElementById("sound1").play();
    document.getElementById("sound2").pause();
    document.getElementById("sound3").pause();
    document.getElementById("sound4").pause();
    document.getElementById("sound5").pause();
    document.getElementById("sound6").pause();
})

document.querySelector("#play2").addEventListener("click", () => {
    document.getElementById("sound1").pause();
    document.getElementById("sound2").play();
    document.getElementById("sound3").pause();
    document.getElementById("sound6").pause();
    document.getElementById("sound5").pause();
    document.getElementById("sound6").pause();
})

document.querySelector("#play3").addEventListener("click", () => {
    document.getElementById("sound1").pause();
    document.getElementById("sound2").pause();
    document.getElementById("sound3").play();
    document.getElementById("sound4").pause();
    document.getElementById("sound5").pause();
    document.getElementById("sound6").pause();
})

document.querySelector("#play4").addEventListener("click", () => {
    document.getElementById("sound1").pause();
    document.getElementById("sound2").pause();
    document.getElementById("sound3").pause();
    document.getElementById("sound4").play();
    document.getElementById("sound5").pause();
    document.getElementById("sound6").pause();
})

document.querySelector("#play5").addEventListener("click", () => {
    document.getElementById("sound1").pause();
    document.getElementById("sound2").pause();
    document.getElementById("sound3").pause();
    document.getElementById("sound6").pause();
    document.getElementById("sound5").play();
    document.getElementById("sound6").pause();
})

document.querySelector("#play6").addEventListener("click", () => {
    document.getElementById("sound1").pause();
    document.getElementById("sound2").pause();
    document.getElementById("sound3").pause();
    document.getElementById("sound4").pause();
    document.getElementById("sound5").pause();
    document.getElementById("sound6").play();
})
