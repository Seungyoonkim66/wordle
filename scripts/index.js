var wordCnt = 5;
var createInputBoxes = function (boxContainer, count) {
    var box = document.createElement("input");
    box.classList;
};
var addRound = function (roundIdx) {
    var round = document.createElement("div");
    round.setAttribute("class", "answer-boxes d-flex flex-row align-items-center justify-content-between");
    round.id = "round_".concat(roundIdx);
    round.innerHTML = '11234142124ss';
    return round;
    // createInputBoxes(answerBoxes, wordCnt);
};
var play = function () {
    var playBoard = document.getElementById("play-board");
    var round = addRound(1);
    playBoard === null || playBoard === void 0 ? void 0 : playBoard.appendChild(round);
};
play();
