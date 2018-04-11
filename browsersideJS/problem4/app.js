//variables
var timer = document.querySelector("#timer");
var announcer = document.querySelector("#announcer");
var hasLost = false;
var gameOver = false;
var startGameButton = document.querySelector("#startButton");

startGameButton.addEventListener("click", setTimer);

//functions
function setTimer() {
    var randomNum = Math.random()*10;
    if(randomNum<3.33) {timer.innerHTML=("1"); oneSecLeft();}
    else if(randomNum<6.66) {timer.innerHTML=("2"); twoSecLeft();}
    else {timer.innerHTML=("3"); threeSecLeft();}
    document.querySelector("#buttonDiv").removeChild(document.querySelector("#startButton"))
}
function threeSecLeft() {
    timer.innerHTML=("3");
    setTimeout(twoSecLeft, 1000)
}
function twoSecLeft() {
    timer.innerHTML=("2");
    setTimeout(oneSecLeft, 1000)
}
function oneSecLeft() {
    timer.innerHTML=("1");
    setTimeout(gameStart, 1000)
}
//Game Starts
function gameStart() {
    timer.innerHTML=("");
    announcer.innerHTML=("")
    winConditions();
// player loses if...
    setTimeout(()=> {
        console.log("decompte started")
        if(!hasLost) {
            announcer.innerHTML="You lost :(";
            removeEventListener("click", clickEvent);
            hasLost = true;      
        }
        else return;
    }
        ,500)
}
function winConditions() {
        document.body.onkeyup = function(e) {
            if(e.keyCode == 32 && !hasLost) {
                console.log("spacebar was pressed")
                clickEvent();
            }
        }
    
    var eventListener = window.addEventListener("click", clickEvent);
}
function clickEvent() {
    console.log(event.keycode)
        announcer.innerHTML=("You win!")
        hasLost = true;
        //console.log(eventListener)
}



