"use strict";
const answer = "hello";
const wordCnt = 5;
let activeRound = 1;
const getBoxContainerId = (round) => "round-" + round;
const getInputBoxId = (round, index) => "round-" + round + "box-" + index;
const getSubmitButtonId = (round) => "submit-button-" + round;
/* 입력값 채점 전 다 입력했는지 체크 */
const checkInputValue = (round, rejected) => {
    let result = true;
    const roundContainer = document.getElementById(getBoxContainerId(round));
    roundContainer === null || roundContainer === void 0 ? void 0 : roundContainer.childNodes.forEach((inputBox, index) => {
        if (inputBox.nodeName == "INPUT") {
            const answerBox = inputBox;
            if (answerBox.value.length == 0) {
                result = false;
                if (rejected) {
                    answerBox.focus();
                    return result;
                }
            }
        }
    });
    return result;
};
/* submit 버튼 클릭 후 채점 */
const checkAnswer = (round) => {
    const roundContainer = document.getElementById(getBoxContainerId(round));
    let word = "";
    roundContainer === null || roundContainer === void 0 ? void 0 : roundContainer.childNodes.forEach((inputBox, index) => {
        if (inputBox.nodeName == "BUTTON") {
            return;
        }
        const answerBox = inputBox;
        const letter = answerBox.value;
        word += letter;
        /* 위치는 다르지만 정답에 포함된 알파벳인 경우 */
        if (answer.includes(letter)) {
            answerBox.className = "correct";
            /* 위치와 알파벳이 모두 일치하는 경우 */
            if (answer[index] == letter) {
                answerBox.className = "correct-correct";
            }
        }
        /* 위치, 알파벳 모두 틀린 경우 */
        else {
            answerBox.className = "wrong";
        }
    });
    const currentSubmitButton = document.getElementById(getSubmitButtonId(round));
    currentSubmitButton.setAttribute("disabled", "true");
    if (answer == word) {
        return true;
    }
    return false;
};
const alertSuccess = () => {
    alert(activeRound);
};
/* 한판 게임을 위한 셋팅 */
const addRound = (playBoard, round) => {
    if (playBoard != null) {
        /* input * answer length 담을 컨테이너 생성 (round 1개당 1개 생성) */
        const boxContainer = document.createElement("div");
        boxContainer.id = getBoxContainerId(round);
        boxContainer.className = "box-container";
        playBoard === null || playBoard === void 0 ? void 0 : playBoard.append(boxContainer);
        /* input 컨테이너에 input 생성 */
        for (let i = 1; i <= wordCnt; i++) {
            const inputBox = document.createElement("input");
            inputBox.id = getInputBoxId(round, i);
            inputBox.maxLength = 1;
            inputBox.className = "basic";
            inputBox === null || inputBox === void 0 ? void 0 : inputBox.addEventListener("keyup", (e) => {
                const box = e.target;
                const answer = box === null || box === void 0 ? void 0 : box.value;
                /* 한글자 입력후 옆 input으로 포커스 이동 + 마지막엔 채점 메소드 호출 */
                if (answer != null && answer.length == inputBox.maxLength) {
                    const nextBox = box === null || box === void 0 ? void 0 : box.nextElementSibling;
                    if (nextBox != null) {
                        nextBox.focus();
                    }
                    if (nextBox.tagName != "INPUT") {
                        nextBox.addEventListener("keypress", (e) => {
                            if (e.key == "Enter") {
                                const currentSubmitButton = document.getElementById(getSubmitButtonId(round));
                                currentSubmitButton.click();
                            }
                        });
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
        const submitButton = document.createElement("button");
        submitButton.id = getSubmitButtonId(round);
        submitButton.innerText = "SUBMIT";
        submitButton.className = "submit-btn";
        submitButton.addEventListener("click", (e) => {
            const isAllInputValueExist = checkInputValue(round);
            if (isAllInputValueExist) {
                if (!checkAnswer(round)) {
                    addRound(document.getElementById("play-board"), activeRound + 1);
                }
                else {
                    alertSuccess();
                }
            }
            else {
                checkInputValue(round, true);
            }
        });
        boxContainer.append(submitButton);
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