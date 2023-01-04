function playThis(buttonID, source) {
    var msc = document.getElementById("rootPlay");
    msc.src = source;
    var cl = document.getElementById(buttonID);
    cl.addEventListener("click", function () {
        msc.play();
    })
}

playThis("ffeqq2", "cache/allweknow.mp4");
