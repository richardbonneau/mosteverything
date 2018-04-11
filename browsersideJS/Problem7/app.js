var startButton = document.querySelector("#startButton");
var announcer = document.querySelector("#announcer");
var timer = document.querySelector("#timer");
var hasLost = false;
var timeout;
var buttonsClicked = 0;

startButton.addEventListener("click", setTimer);

function setTimer() {
    document.querySelector("#buttonHold").removeChild(startButton);
    var count = Math.floor(Math.random()*3+1);
    if(count==3) threeSecLeft();
    else if(count==2) twoSecLeft();
    else oneSecLeft();
    function threeSecLeft(){
        timer.innerHTML=("3");
        setTimeout(twoSecLeft, 1000);
    }
    function twoSecLeft(){
        timer.innerHTML=("2");
        setTimeout(oneSecLeft, 1000);
    }
    function oneSecLeft(){
        timer.innerHTML=("1");
        setTimeout(gameStart, 1000);
    }
}

function gameStart(){
    //remove the announcement text
    timer.innerHTML=("");
    announcer.innerHTML=("");
    //finding a spawn point for the button
    var arrOfSpawns = document.getElementsByClassName("buttonSpawn");
    //creating the buttons
    var numberButtonsToCreate = Math.floor(Math.random()*10)+1;
    console.log(numberButtonsToCreate*400+1000)
    for(var i=0; i<numberButtonsToCreate; i++) {
        var newButton = document.createElement("button");
        newButton.setAttribute("id", "newButton");
        newButton.innerHTML="Click me!"
        arrOfSpawns[Math.floor(Math.random()*20)].appendChild(newButton);
        //document.querySelector("#newButton").innerHTML="Click me!"
    }

    //Win condition
    document.querySelectorAll("#newButton").forEach((button)=>{
        button.addEventListener("click", winCondition);
    })

    function winCondition(event) {
        console.log("wincondition function")
        if(hasLost) button.removeEventListener("click", winCondition);
        buttonsClicked+=1;
        this.parentElement.removeChild(this);
        event.stopPropagation();
        console.log(buttonsClicked);
        if(buttonsClicked == numberButtonsToCreate && hasLost == false) {
            console.log("passed if statement to win")
            announcer.innerHTML="You win!";
            clearTimeout(timeout);
            document.body.removeEventListener("click", clickOnPage);
            //document.body.removeEventListener("click", winCondition);
            restartGame();
        }
    }
    //Lose Conditions
    //Page clicking
    document.body.addEventListener("click", clickOnPage);
    function clickOnPage() {
        console.log("clicked on the page")
        hasLost = true;
        announcer.innerHTML="You missed! You lose :("
        clearTimeout(timeout);
        document.body.removeEventListener("click", clickOnPage);
        button.removeEventListener("click", winCondition);
        restartGame();
    }
    //timeout
    console.log("initiate timeout")
    timeout = setTimeout(()=>{
        console.log("ran out of time")
        announcer.innerHTML="You lose :(";
        hasLost = true;
        document.body.removeEventListener("click", clickOnPage);
        restartGame();
    },numberButtonsToCreate*400+1000);
    }
    function restartGame(){
        console.log("create restart button")
        var restartButton = document.createElement("button");
        restartButton.setAttribute("id", "startButton");
        restartButton.innerHTML="Restart Game"
        document.querySelector("#buttonHold").appendChild(restartButton);
        restartButton.addEventListener("click",()=> location.reload())
    }