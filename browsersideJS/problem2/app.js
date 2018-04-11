//variables
var timer = document.querySelector("#timer");
var announcer = document.querySelector("#announcer");
var hasWon = false;
var gameOver = false;

var clickEvent = function() {
    console.log(event.keycode)
        hasWon = true;
        announcer.innerHTML=("You win!")
        gameOver = true;
        //console.log(eventListener)
}


//functions
function setTimer() {
    var randomNum = Math.random()*10;
    if(randomNum<3.33) {timer.innerHTML=("1"); oneSecLeft();}
    else if(randomNum<6.66) {timer.innerHTML=("2"); twoSecLeft();}
    else {timer.innerHTML=("3"); threeSecLeft();}
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
        if(!hasWon) {
            announcer.innerHTML=("You lost :(");
            removeEventListener("click", clickEvent);
            gameOver = true;
            return;
        }
        else return;
    }
        ,500)
}
function winConditions() {
        document.body.onkeydown = function(e) {
            if(e.keyCode == 32 && gameOver == false) {
                console.log(gameOver)
                console.log("spacebar was pressed")
                clickEvent();
            }
        }
    
    var eventListener = window.addEventListener("click", clickEvent);
}
setTimer();

