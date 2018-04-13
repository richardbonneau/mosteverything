var greenLight = false;

var timeout = setTimeout(gameStart, Math.floor(Math.random()*8000)+1000);
controls()

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
    } else {
        clearTimeout(timeout)
        document.querySelector("#announcer").innerHTML="Player "+playerHit+" lost!";
        document.querySelector("#swordTooSoon").play();
    }
    var restartButton = document.createElement("button");
    restartButton.setAttribute("id", "restartButton");
    restartButton.innerHTML="Restart Game";
    document.querySelector("#buttonHold").appendChild(restartButton);
    restartButton.addEventListener("click", ()=>location.reload())
}