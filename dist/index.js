"use strict";
const answer = "hello";
const wordCnt = 5;
let activeRound = 1;
const getBoxContainerId = (round) => "round-" + round;
const getInputBoxId = (round, index) => "round-" + round + "box-" + index;
const checkAnswer = (round) => {
    const roundContainer = document.getElementById(getBoxContainerId(round));
    roundContainer === null || roundContainer === void 0 ? void 0 : roundContainer.childNodes.forEach((inputBox, index) => {
        const answerBox = inputBox;
        const currentAlphabet = answerBox.value;
        /* 위치는 다르지만 정답에 포함된 알파벳인 경우 */
        if (answer.includes(currentAlphabet)) {
            answerBox.className = "input-box correct";
        }
        /* 위치와 알파벳이 모두 일치하는 경우 */
        if (answer[index] == currentAlphabet) {
            answerBox.className = "input-box correct-correct";
        }
        /* 위치, 알파벳 모두 틀린 경우 */
        else {
            answerBox.className = "input-box wrong";
        }
    });
};
const addRound = (playBoard, round) => {
    if (playBoard != null) {
        const boxContainer = document.createElement("div");
        boxContainer.id = getBoxContainerId(round);
        boxContainer.className = "box-container";
        playBoard === null || playBoard === void 0 ? void 0 : playBoard.append(boxContainer);
        for (let i = 1; i <= wordCnt; i++) {
            const inputBox = document.createElement("input");
            inputBox.id = getInputBoxId(round, i);
            inputBox.maxLength = 1;
            inputBox.className = "input-box basic";
            inputBox === null || inputBox === void 0 ? void 0 : inputBox.addEventListener("keyup", (e) => {
                const box = e.target;
                const answer = box === null || box === void 0 ? void 0 : box.value;
                /* 한글자 입력후 옆 input으로 포커스 이동 + 마지막엔 채점 메소드 호출 */
                if (answer != null && answer.length == inputBox.maxLength) {
                    const nextBox = box === null || box === void 0 ? void 0 : box.nextElementSibling;
                    if (nextBox != null) {
                        nextBox.focus();
                    }
                    else {
                        checkAnswer(round);
                    }
                }
                /* 백스페이스 누르면 뒤 input으로 포커스 이동 */
                if (e.key == "Backspace") {
                    const prevBox = box === null || box === void 0 ? void 0 : box.previousElementSibling;
                    if (prevBox != null) {
                        prevBox.focus();
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