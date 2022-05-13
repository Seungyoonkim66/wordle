"use strict";
const answer = "hello";
const wordCnt = 5;
let activeRound = 1;
const getBoxContainerId = (round) => "round-" + round;
const getInputBoxId = (index) => "box-" + index;
const checkAnswer = (answer) => {
    console.log(answer);
};
const addRound = (playBoard, round) => {
    if (playBoard != null) {
        const boxContainer = document.createElement("div");
        boxContainer.id = getBoxContainerId(round);
        boxContainer.className = "box-container";
        playBoard === null || playBoard === void 0 ? void 0 : playBoard.append(boxContainer);
        for (let i = 1; i <= wordCnt; i++) {
            const inputBox = document.createElement("input");
            inputBox.id = getInputBoxId(i);
            inputBox.maxLength = 1;
            inputBox.className = "input-box basic";
            inputBox === null || inputBox === void 0 ? void 0 : inputBox.addEventListener("keyup", (e) => {
                const box = e.target;
                const answer = box === null || box === void 0 ? void 0 : box.value;
                if (answer != null && answer.length == inputBox.maxLength) {
                    const nextBox = box === null || box === void 0 ? void 0 : box.nextElementSibling;
                    if (nextBox != null) {
                        nextBox.focus();
                    }
                    else {
                        console.log("정답 제출");
                    }
                }
            });
            boxContainer.append(inputBox);
        }
        const firstBox = boxContainer.firstChild;
        firstBox.focus();
    }
};
const play = () => {
    const playBoard = document.getElementById("play-board");
    addRound(playBoard, activeRound);
};
play();
//# sourceMappingURL=index.js.map