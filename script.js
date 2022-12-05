console.log("Welcome to tic tak toe");
let music = new Audio("/music/music.mp3")
let audioTurn = new Audio("/music/ting.mp3")
let gameover = new Audio("/music/gameover.mp3")
let turn = 'X';
let winner = '';
let isGameover = false;
// music.play();
const changeTurn = () => {
    return  turn === 'X'? '0':'X'
}
//resizing the line alignment according to window width
const resize =(item)=>{
    if(window.innerWidth>1050){
        document.getElementsByClassName('line')[0].style.transform  = `translate(${item[3]}vw,  ${item[4]}vw) rotate(${item[5]}deg)`;
        document.getElementsByClassName('line')[0].style.width =  `${item[6]}vw`;
    }
    else if(window.innerWidth>850 && window.innerWidth<1050){
        document.getElementsByClassName('line')[0].style.transform  = `translate(${item[7]}vw,  ${item[8]}vw) rotate(${item[9]}deg)`;
        document.getElementsByClassName('line')[0].style.width =  `${item[10]}vw`;
    }else{
        document.getElementsByClassName('line')[0].style.transform  = `translate(${item[11]}vw,  ${item[12]}vw) rotate(${item[13]}deg)`;
        document.getElementsByClassName('line')[0].style.width =  `${item[14]}vw`;
    }
}
//Setting the Confetti Effect
const confettiEffect = (element,count,angle) =>{
    // Get the position of the element (in pixels) within on the page. 
    const { top, bottom, left, right } = element.getBoundingClientRect()
    confetti({
        origin: {
            x: ((left + right) / 2) / window.innerWidth,
            y: ((top + bottom) / 2) / window.innerHeight
        },
        particleCount: count, // Defaults to 50 particles
        spread: 60, // Defaults to 45º spread
        angle: angle
    })
}
const checkWin = () => {
    let boxtext = document.getElementsByClassName('box-text');
    let wins = [
        //[boxNo,boxNo,boxNo,-->window-width>1050(transate-X,trasnlate-Y,width),-->850<window-width<1050(transate-X,trasnlate-Y,width),
        // -->850<window-width<1050(transate-X,trasnlate-Y,width]
        [0, 1, 2, 2.2, 5, 0, 25, 3, 5.7, 0, 30, 6, 8.7, 0, 42], 
        [3, 4, 5, 2.2, 15, 0, 25, 3, 17.7, 0, 30, 6, 26.7, 0, 42], 
        [6, 7, 8, 2.2, 25, 0, 25, 3, 30, 0, 30, 6, 44.8, 0, 42], 
        [0, 3, 6, -7.5, 15, 90, 25, -9, 17.7, 90, 30, 5.9, 26.7, 90, 42], 
        [1, 4, 7, 2.55, 15, 90, 25, 3.1, 17.7, 90, 30, -12.1, 26.7, 90, 42], 
        [2, 5, 8, 12.6, 15, 90, 25, 15.2, 17.7, 90, 30, 24.1, 26.7, 90, 42], 
        [0, 4, 8, -1.4, 15, 45, 33, -1, 17.8, 45, 38, 1, 26.8, 45, 52], 
        [2, 4, 6, -1.4, 15, 135, 33, -1, 17.8, 135, 38, 1, 26.8, 135, 52]
    ]
    wins.forEach(item => {
        if((boxtext[item[0]].innerText===boxtext[item[1]].innerText) && 
        (boxtext[item[1]].innerText===boxtext[item[2]].innerText) && boxtext[item[0]].innerText!==''){
            winner = boxtext[item[0]].innerText + " Won!";
            document.querySelector('.info').innerText = winner;
            confettiEffect(document.getElementsByClassName('game-container')[0],200,110)
            isGameover = true;
            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = '200px';
            gameover.play();
            resize(item)
        }
    })
}
//Game logic
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxTexts = element.querySelector('.box-text')
    element.addEventListener('click', ()=>{
        if(!isGameover){
            if(boxTexts.innerText === ''){
                boxTexts.innerText = turn;
                turn = changeTurn();
                audioTurn.play();
                checkWin();
                window.addEventListener('resize',checkWin) //calling when the screen getresize and it changes the line alignment
                if(!isGameover){
                    document.getElementsByClassName('info')[0].innerText = `Turn for ${turn}`
                }
            }
        }
        else{
            document.getElementsByClassName('box-container')[0].classList.add('shake')
            //Remove the class shake after 400ms
            setTimeout(()=>{
                document.getElementsByClassName('box-container')[0].classList.remove('shake')
            },400)
            document.getElementsByClassName('winner')[0].innerText = `${winner}`
            document.getElementsByClassName('content')[0].innerText = 'Reset to play'
            document.getElementsByClassName('box-container')[0].style.opacity = '0.2'
            confettiEffect(document.getElementsByClassName('gameOver')[0],50,90)
        }
        
    })
})

//Reset logic

reset.addEventListener('click',  ()=>{
    let boxTexts = document.querySelectorAll('.box-text');
    Array.from(boxTexts).forEach(element => {
        element.innerText = ''
    })
    turn = 'X'
    isGameover = false
    document.getElementsByClassName('info')[0].innerText = `Turn for ${turn}`
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = '0';
    document.getElementsByClassName('line')[0].style.width =  '0vw';
    document.getElementsByClassName('box-container')[0].style.opacity = '1'
    document.getElementsByClassName('winner')[0].innerText = ''
    document.getElementsByClassName('content')[0].innerText = ''
})




