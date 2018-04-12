var greenLight = false;
var playersArr = document.querySelectorAll(".players");
var timeout;
var p1score = 0;
var p2score = 0;
var roundCount;

controls();
preGame();
document.querySelector("#music").play();

function controls() {
    document.body.onkeydown = function(keyPressed) {
        if(keyPressed.keyCode == 81) {
            playerHitKey(1);
        }
        else if(keyPressed.keyCode == 80) {
            playerHitKey(2);
        }
    }
}
function preGame() {
    timeout = setTimeout(gameStart, Math.floor(Math.random()*8000)+1000);
    document.querySelector("#ready").play();
}

function gameStart() {
    document.querySelector("#secondAnnouncer").style.visibility = "hidden";
    greenLight=true;
    document.querySelector("#bang").play();
}
function playerHitKey(playerHit) {
    if(greenLight==true) {
        console.log("if greenlight is true")
        document.querySelector("#announcer").innerHTML="Player "+playerHit+" wins!"
        document.querySelector("#sword").play();
        if(playerHit==1){
            console.log("playerhit = 1")
            p2state1=false; 
            p1score++;
            p2state2=false;document.querySelector("#p1score").innerHTML=p1score;
            console.log("right before if statement")
            if(p1score==3||p2score==3){
                console.log("one of the 2 players has a score of 3")
                document.querySelector("#announcer").innerHTML="Player "+playerHit+" wins the game!";
                return
            }

        }
        else{
            console.log("playerhit = 2")
            p1state1=false; 
            p2score++;
            p1state2=false;
            document.querySelector("#p2score").innerHTML=p2score;
            console.log("right before if statement 2")
            if(p1score==3||p2score==3){
                console.log("one of the 2 players has a score of 3")
                document.querySelector("#announcer").innerHTML="Player "+playerHit+" wins the game!";
                return
            }
        }
    } else {
        console.log("if greenlight is false")
        clearTimeout(timeout)
        document.querySelector("#announcer").innerHTML="Player "+playerHit+" lost!";
        document.querySelector("#swordTooSoon").play();
        if(playerHit==1){
            p1state1=false; 
            p1state2=false;
            p2score++;document.querySelector("#p2score").innerHTML=p2score;
            if(p1score==3||p2score==3){
                console.log("one of the 2 players has a score of 3")
                document.querySelector("#announcer").innerHTML="Player "+playerHit+" wins the game!";
                return
            }
        }
        else{
            p2state1=false; 
            p2state2=false;
            p1score++;
            document.querySelector("#p1score").innerHTML=p1score;
            if(p1score==3||p2score==3){
                console.log("one of the 2 players has a score of 3")
                document.querySelector("#announcer").innerHTML="Player "+playerHit+" wins the game!";
                return
            }
        }
    }
    var restartButton = document.createElement("button");
    restartButton.setAttribute("id", "restartButton");
    restartButton.innerHTML="Next Round";
    document.querySelector("#buttonHold").appendChild(restartButton);
    restartButton.addEventListener("click", function(){
        p1state1 = true;
        p1state2 = false;
        p2state1 = true;
        p2state2 = false;
        greenLight=false;
        document.querySelector("#announcer").innerHTML="Get ready..."
        document.querySelector("#secondAnnouncer").style.visibility = "visible";
        document.querySelector("#nextRound").play();
        preGame();
        document.querySelector("#buttonHold").removeChild(document.querySelector("#restartButton"))
    });


    //restartButton.innerHTML="Next Round";
    //document.querySelector("#buttonHold").appendChild(restartButton);
    //restartButton.addEventListener("click", ()=>location.reload())
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
},175)
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