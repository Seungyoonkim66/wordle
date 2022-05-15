const answer:string = "hello";
const wordCnt:number = 5;
let activeRound:number = 1;

const getBoxContainerId = (round:number):string => "round-" + round; 
const getInputBoxId = (round:number, index:number):string => "round-" + round + "box-" + index;
const getSubmitButtonId = (round:number) => "submit-button-" + round;

/* 입력값 채점 전 다 입력했는지 체크 */
const checkInputValue = (round:number, rejected?:boolean):boolean => {
    let result = true;
    const roundContainer = document.getElementById(getBoxContainerId(round));
    roundContainer?.childNodes.forEach((inputBox, index)=> {
        if(inputBox.nodeName == "INPUT"){
            const answerBox = inputBox as HTMLInputElement;
            if(answerBox.value.length == 0){
                result = false;
                if(rejected){
                    answerBox.focus();
                    return result;
                }
            }
        }
    })
    return result;
}

/* submit 버튼 클릭 후 채점 */
const checkAnswer = (round:number):boolean => {
    const roundContainer = document.getElementById(getBoxContainerId(round));
    let word = "";
    roundContainer?.childNodes.forEach((inputBox, index)=> {
        if(inputBox.nodeName == "BUTTON"){
            return;
        }
        const answerBox = inputBox as HTMLInputElement;
        const letter = answerBox.value;
        word += letter;
        /* 위치는 다르지만 정답에 포함된 알파벳인 경우 */
        if(answer.includes(letter)){ 
            answerBox.className = "correct";
            /* 위치와 알파벳이 모두 일치하는 경우 */
            if (answer[index] == letter){
                answerBox.className = "correct-correct";
            }
        }
        /* 위치, 알파벳 모두 틀린 경우 */
        else {
            answerBox.className = "wrong";
        }
    });
    const currentSubmitButton = document.getElementById(getSubmitButtonId(round)) as HTMLButtonElement;
    currentSubmitButton.setAttribute("disabled", "true");

    if(answer == word){
        return true;
    }
    return false;
}

const alertSuccess = ():void => {
    alert(activeRound)
}

/* 한판 게임을 위한 셋팅 */
const addRound = (playBoard:HTMLElement | null, round:number):void => {
    if(playBoard != null){
        /* input * answer length 담을 컨테이너 생성 (round 1개당 1개 생성) */
        const boxContainer:HTMLDivElement = document.createElement("div");
        boxContainer.id = getBoxContainerId(round);
        boxContainer.className = "box-container"
        playBoard?.append(boxContainer);

        /* input 컨테이너에 input 생성 */
        for(let i:number = 1; i<=wordCnt; i++){
            const inputBox:HTMLInputElement = document.createElement("input");
            inputBox.id = getInputBoxId(round, i);
            inputBox.maxLength = 1;
            inputBox.className = "basic";
            inputBox?.addEventListener("keyup", (e:KeyboardEvent) => {
                const box = e.target as HTMLInputElement | null;
                const answer = box?.value;
                /* 한글자 입력후 옆 input으로 포커스 이동 + 마지막엔 채점 메소드 호출 */
                if(answer != null && answer.length == inputBox.maxLength){
                    const nextBox = box?.nextElementSibling as HTMLInputElement;
                    if(nextBox != null){
                        nextBox.focus();
                    } 
                    if(nextBox.tagName != "INPUT"){
                        nextBox.addEventListener("keypress",(e:KeyboardEvent) => {
                            if (e.key == "Enter"){
                                const currentSubmitButton =  document.getElementById(getSubmitButtonId(round)) as HTMLButtonElement;
                                currentSubmitButton.click();
                            }
                        });
                    }
                }
                /* 백스페이스 누르면 뒤 input으로 포커스 이동 */
                if(e.key == "Backspace"){
                    const prevBox = box?.previousElementSibling as HTMLElement;
                    if(prevBox != null){
                        prevBox.focus();
                    }
                }
            });
            boxContainer.append(inputBox);
        }
        const submitButton:HTMLButtonElement = document.createElement("button");
        submitButton.id = getSubmitButtonId(round);
        submitButton.innerText = "SUBMIT";
        submitButton.className = "submit-btn";
        submitButton.addEventListener("click", (e:Event) => {
            const isAllInputValueExist:boolean = checkInputValue(round);
            if(isAllInputValueExist){
                if(!checkAnswer(round)){
                    addRound(document.getElementById("play-board"), activeRound + 1);
                } else{
                    alertSuccess();
                }

            } else {
                checkInputValue(round, true);
            }
            
        });
        boxContainer.append(submitButton);
        const firstBox = boxContainer.firstChild as HTMLElement;
        firstBox.focus();
    }
}

const play = ():void => {
    const playBoard = document.getElementById("play-board");
    addRound(playBoard, activeRound);
}


play()