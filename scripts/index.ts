const answer:string = "hello";
const wordCnt:number = 5;
let activeRound:number = 1;

const getBoxContainerId = (round:number):string => "round-" + round; 
const getInputBoxId = (index:number):string => "box-" + index;

const checkAnswer = (answer:string) => {
    console.log(answer)
}

const addRound = (playBoard:HTMLElement | null, round:number):void => {
    if(playBoard != null){
        const boxContainer:HTMLDivElement = document.createElement("div");
        boxContainer.id = getBoxContainerId(round);
        boxContainer.className = "box-container"
        playBoard?.append(boxContainer);
        for(let i:number = 1; i<=wordCnt; i++){
            const inputBox:HTMLInputElement = document.createElement("input");
            inputBox.id = getInputBoxId(i);
            inputBox.maxLength = 1;
            inputBox.className = "input-box basic";
            inputBox?.addEventListener("keyup", (e) => {
                const box = e.target as HTMLInputElement | null;
                const answer = box?.value;
                if(answer != null && answer.length == inputBox.maxLength){
                    const nextBox= box?.nextElementSibling as HTMLElement;
                    if(nextBox != null){
                        nextBox.focus();
                    } else {
                        console.log("정답 제출")
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