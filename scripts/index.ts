const answer:string = "hello";
const wordCnt:number = 5;
let activeRound:number = 1;

const getBoxContainerId = (round:number):string => "round-" + round; 
const getInputBoxId = (round:number, index:number):string => "round-" + round + "box-" + index;

const checkAnswer = (round:number) => {
    const roundContainer = document.getElementById(getBoxContainerId(round));
    roundContainer?.childNodes.forEach((inputBox, index)=> {
        const answerBox = inputBox as HTMLInputElement;
        const currentAlphabet = answerBox.value;
        /* 위치는 다르지만 정답에 포함된 알파벳인 경우 */
        if(answer.includes(currentAlphabet)){ 
            answerBox.className = "input-box correct"
        }
        /* 위치와 알파벳이 모두 일치하는 경우 */
        if (answer[index] == currentAlphabet){
            answerBox.className = "input-box correct-correct"
        }
        /* 위치, 알파벳 모두 틀린 경우 */
        else {
            answerBox.className = "input-box wrong"
        }
    });
}

const addRound = (playBoard:HTMLElement | null, round:number):void => {
    if(playBoard != null){
        const boxContainer:HTMLDivElement = document.createElement("div");
        boxContainer.id = getBoxContainerId(round);
        boxContainer.className = "box-container"
        playBoard?.append(boxContainer);
        for(let i:number = 1; i<=wordCnt; i++){
            const inputBox:HTMLInputElement = document.createElement("input");
            inputBox.id = getInputBoxId(round, i);
            inputBox.maxLength = 1;
            inputBox.className = "input-box basic";
            inputBox?.addEventListener("keyup", (e:KeyboardEvent) => {
                const box = e.target as HTMLInputElement | null;
                const answer = box?.value;
                /* 한글자 입력후 옆 input으로 포커스 이동 + 마지막엔 채점 메소드 호출 */
                if(answer != null && answer.length == inputBox.maxLength){
                    const nextBox= box?.nextElementSibling as HTMLElement;
                    if(nextBox != null){
                        nextBox.focus();
                    } else {
                        checkAnswer(round);
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
        const firstBox = boxContainer.firstChild as HTMLElement;
        firstBox.focus();
    }
   
}

const play = ():void => {
    const playBoard = document.getElementById("play-board");
    addRound(playBoard, activeRound);
}


play()