"use strict";
/* element id dictionary */
const getPlayBoardId = () => "play-board";
const getBoxContainerId = (round) => "round-" + round;
const getInputBoxId = (round, index) => "round-" + round + "box-" + index;
const getSubmitButtonId = (round) => "submit-button-" + round;
const getFinishModalElementId = (elementName) => {
    let id = "finish-modal";
    if (elementName != null) {
        id = id + "-" + elementName;
    }
    return id;
};
const getAnswerLengthId = () => "answer-length";
/* main */
let activeRound = 0;
play(5);
/*  게임 시작하기 */
function play(answerLength) {
    const playBoard = document.getElementById(getPlayBoardId());
    const spinner = document.createElement("div");
    spinner.className = "spinner-border text-secondary m-3";
    playBoard === null || playBoard === void 0 ? void 0 : playBoard.append(spinner);
    fetch(`https://random-word-api.herokuapp.com/word?length=${answerLength}`).then((res) => res.json())
        .then((data) => {
        playBoard === null || playBoard === void 0 ? void 0 : playBoard.childNodes.forEach(c => c.remove());
        if (data != null && data.length > 0) {
            const word = data[0];
            addRound(playBoard, activeRound, word);
            console.log(word);
        }
    })
        .catch((res) => {
        console.log(res);
        alert("ERROR : Sorry, please refresh the page.");
    });
    setAnswerLength(answerLength);
}
/* 정답 단어 길이 조절 메소드 */
function setAnswerLength(initValue) {
    const selector = document.getElementById(getAnswerLengthId());
    const playBoard = document.getElementById(getPlayBoardId());
    selector.removeEventListener("change", () => { });
    selector.addEventListener("change", () => {
        if (Number(selector.value) != initValue) {
            playBoard.childNodes.forEach(c => c.remove());
            play(Number(selector.value));
        }
    });
}
/* 한판 게임을 위한 셋팅 */
function addRound(playBoard, round, answer) {
    if (playBoard != null) {
        /* input * answer length 담을 컨테이너 생성 (round 1개당 1개 생성) */
        const boxContainer = document.createElement("div");
        boxContainer.id = getBoxContainerId(round);
        boxContainer.className = "box-container";
        playBoard === null || playBoard === void 0 ? void 0 : playBoard.append(boxContainer);
        /* input 컨테이너에 input 생성 */
        for (let i = 1; i <= answer.length; i++) {
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
        /* 각 round별 submit button 생성 */
        const submitButton = document.createElement("button");
        submitButton.id = getSubmitButtonId(round);
        submitButton.innerText = "SUBMIT";
        submitButton.className = "submit-btn";
        submitButton.addEventListener("click", (e) => {
            const isAllInputValueExist = checkInputValue(round);
            if (isAllInputValueExist) {
                if (!checkAnswer(round, answer)) {
                    addRound(document.getElementById("play-board"), ++activeRound, answer);
                }
                else {
                    alertSuccess(++activeRound);
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
}
/* 입력값 채점 전 다 입력했는지 체크 */
function checkInputValue(round, rejected) {
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
}
/* submit 버튼 클릭 후 채점 */
function checkAnswer(round, answer) {
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
}
/* 정답 맞춘 후 성공 모달 띄우기 */
function alertSuccess(roundCnt) {
    const roundCntSpan = document.getElementById(getFinishModalElementId("round-cnt"));
    roundCntSpan.append((roundCnt).toString());
    const finishModalBtn = document.getElementById(getFinishModalElementId("btn"));
    finishModalBtn.click();
}
//# sourceMappingURL=index.js.map