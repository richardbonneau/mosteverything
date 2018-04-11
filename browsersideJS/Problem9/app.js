var greenLight = false;
var playersArr = document.querySelectorAll(".players");
var timeout = setTimeout(gameStart, Math.floor(Math.random()*8000)+1000);

controls();

function controls() {
    document.body.onkeydown = function(keyPressed) {
        if(keyPressed.keyCode == 81) {
            playerHitKey(1)
        }
        else if(keyPressed.keyCode == 80) {
            playerHitKey(2)
        }
    }
}
function gameStart() {
    greenLight=true;
    console.log("function G")
    document.querySelector("#bang").play();
}
function playerHitKey(playerHit) {
    document.querySelector("#secondAnnouncer").parentElement.removeChild(document.querySelector("#secondAnnouncer"));
    if(greenLight==true) {
        document.querySelector("#announcer").innerHTML="Player "+playerHit+" wins!"
        document.querySelector("#sword").play();
        if(playerHit==1){p2state1=false; p2state2=false;}
        else{p1state1=false; p1state2=false;}
    } else {
        clearTimeout(timeout)
        document.querySelector("#announcer").innerHTML="Player "+playerHit+" lost!";
        document.querySelector("#swordTooSoon").play();
        if(playerHit==1){p1state1=false; p1state2=false;}
        else{p2state1=false; p2state2=false;}
    }
    var restartButton = document.createElement("button");
    restartButton.setAttribute("id", "restartButton");
    restartButton.innerHTML="Restart Game";
    document.querySelector("#buttonHold").appendChild(restartButton);
    restartButton.addEventListener("click", ()=>location.reload())
}
//players animation

//player1
var p1state1 = true;
var p1state2 = false;
setInterval(()=>{
    if(p1state1 == true) {
        playersArr[0].src="graphics/player1_state2.png"
        p1state1=false;
        p1state2=true;
    } else if(p1state2==true){
        playersArr[0].src="graphics/player1_state1.png"
        p1state1=true;
        p1state2=false;
    }
    else {
        playersArr[0].src="graphics/player1_dead.png"
    }
},250)
//player2
var p2state1 = true;
var p2state2 = false;
setInterval(()=>{
    if(p2state1 == true) {
        playersArr[1].src="graphics/player2_state2.png"
        p2state1=false;
        p2state2=true;
    } else if(p2state2==true){
        playersArr[1].src="graphics/player2_state1.png"
        p2state1=true;
        p2state2=false;
    }
    else{
        playersArr[1].src="graphics/player2_dead.png"
    }
},200)