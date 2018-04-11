var body = document.querySelector("body");
var mainDiv = document.querySelector("#mainDiv");
var hasWon = false;

var clickEvent = function () {
    hasWon=true;
    mainDiv.innerHTML=("You win!");
}

setTimeout(()=>{
    if(!hasWon){
        mainDiv.innerHTML=("You lose :(");
        body.removeEventListener("click", clickEvent);
    }
    else return;
},1000)

body.addEventListener("click", clickEvent)

