var startButton = document.querySelector("#startButton");
var startButtonHolder = document.querySelector("#buttonDiv")
var timeDisplay = document.querySelector("#timer");
var hasWon = false;
var gameOver = false;
//Start button and timer
startButton.addEventListener("click", startEvent)

function startEvent() {
    startButtonHolder.removeChild(startButton);
    var timer = Math.floor(Math.random()*3)+1;
        if(timer == 3) {
            threeSecLeft();
        } else if(timer==2) {
            twoSecLeft();
        } else{
            oneSecLeft();
        }
}
function threeSecLeft() {
    timeDisplay.innerHTML="3";
    setTimeout(twoSecLeft, 1000);
}
function twoSecLeft() {
    timeDisplay.innerHTML="2";
    setTimeout(oneSecLeft, 1000);
}
function oneSecLeft() {
    timeDisplay.innerHTML="1";
    setTimeout(startGame, 1000);
}
//GameStarts
function startGame(){
    timeDisplay.innerHTML="";
    announcer.innerHTML=("")
    winConditions();
    // player loses if...
    setTimeout(()=> {
        if(!hasWon) {
            announcer.innerHTML=("You lost :(");
            removeEventListener("click", winEvent);
            gameOver = true;      
        }
        else return;
    },500);
    //player wins if...
    function winConditions() {
        document.body.onkeyup = function(e) {
            if(e.keyCode == 32 && gameOver == false) {
                console.log("spacebar was pressed")
                winEvent();
            }
        }
    window.addEventListener("click", winEvent);
    
}
}
var winEvent = function() {
    window.removeEventListener("click", winEvent);
    hasWon = true;
    announcer.innerHTML=("You win!");
    gameOver = true;
    //Put a restart button
    var newButton = document.createElement("button");
    newButton.setAttribute("id", "startButton");
    newButton.innerHTML="Restart Game"
    newButton.addEventListener("click", ()=> location.reload())
    startButtonHolder.appendChild(newButton);    
}


