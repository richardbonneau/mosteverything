var announcer = document.querySelector("#announcer");
var timer = document.querySelector("#timer");
var hasLost = false;
var timeout;

function setTimer() {
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
    //creating the button
    var newButton = document.createElement("button");
    newButton.setAttribute("id", "newButton");
    arrOfSpawns[Math.floor(Math.random()*12)].appendChild(newButton);
    document.querySelector("#newButton").innerHTML="Click me!"
    //Win conditions
    document.querySelector("#newButton").addEventListener("click", winEvent);
    function winEvent() {
        //console.log("winEvent function")
        if(!hasLost) announcer.innerHTML="You win!";
        clearTimeout(timeout);
        document.body.removeEventListener("click", clickOnPage);
    }
    //Start Lose Conditions
    document.body.addEventListener("click", clickOnPage);
    function clickOnPage() {
        hasLost = true;
        announcer.innerHTML="You missed! You lose :("
        clearTimeout(timeout);
    }
    timeout = setTimeout(()=>{
        announcer.innerHTML="You lose :(";
        hasLost = true;
        console.log(timeout)
    },1500);
    }

setTimer();