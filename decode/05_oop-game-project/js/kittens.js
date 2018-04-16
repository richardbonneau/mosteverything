// This sectin contains some game constants. It is not super interesting
var frameOne = false;

var GAME_WIDTH = 840;
var GAME_HEIGHT = 650;

var ROAD_DEADSPACE_LEFT = 90;
var ROAD_DEADSPACE_RIGHT = GAME_WIDTH-180;
var middleOfRoad = 375;
var leftLaneWidth = 250;

var ENEMY_WIDTH = 45;
var ENEMY_HEIGHT = 105;
var MAX_ENEMIES = 3;

var PLAYER_WIDTH = 50;
var PLAYER_HEIGHT = 105;

// These two constants keep us from using "magic numbers" in our code
var LEFT_ARROW_CODE = 37;
var UP_ARROW_CODE = 38;
var RIGHT_ARROW_CODE = 39;
var DOWN_ARROW_CODE = 40;

// These two constants allow us to DRY
var MOVE_UP = "up";
var MOVE_DOWN = "down"
var MOVE_LEFT = 'left';
var MOVE_RIGHT = 'right';

//  Smooth controls
var playerMoveLeft = false;
var playerMoveRight = false;
var playerMoveUp = false;
var playerMoveDown = false;

//  Has this car already been overtaken?
var overtaken = [false, false, false, false];

//  Score Announcer Stuff
var overtakeTimeout;
var closeCallTimeout;
var freezeCurrentScore = 0;
var plusScore = "";
var secondPlusScore = "";
var tempShowScore = 0;
var opacityOvertake= 0;
var opacityOppositeLane = 0;
var opacityCloseCall = 0;
var isDrivingOppositeLane = false;
var isOvertaking = false;
var isScoreGoingUp = false;

// Preload game images
var images = {};
["viper_up.png", "viper_down.png","truck_up.png", "truck_down.png", "audi_up.png", "audi_down.png", 
"taxi_up.png", "taxi_down.png", "van_up.png", "van_down.png", "ambulance_up.png", "ambulance_down.png", 
"background.png", "player.png"].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});


// This section is where you will be doing most of your coding
class Enemy {
    constructor(xPos, carPos) {
        this.x = xPos;
        this.y = -ENEMY_HEIGHT;
        // Each enemy should have a different speed and direction
        if(carPos == 0||carPos == 1) {
            let getRandomVehiculeDown = [
            "viper_down.png", "truck_down.png", "audi_down.png", 
            "taxi_down.png", "van_down.png", "ambulance_down.png"];

            this.sprite = images[getRandomVehiculeDown[Math.floor(Math.random()*6)]];
            this.speed = Math.random() / 1 + 0.50;
        } 
        else if (carPos == 2||carPos == 3) {
            let getRandomVehiculeUp = [
                "viper_up.png", "truck_up.png", "audi_up.png", 
                "taxi_up.png", "van_up.png", "ambulance_up.png"];
                this.sprite = images[getRandomVehiculeUp[Math.floor(Math.random()*6)]];
            this.speed = Math.random() / 10 + 0.10;
        }        
    }
    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Player {
    constructor() {
        this.x = 10 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.sprite = images['player.png'];
        //added by richard
        this.speed = 0.5; 
    }

    // This method is called by the game engine when left/right arrows are pressed
    // 
    move(direction) {
        if (direction === MOVE_LEFT/* && this.x > 0*/) {
            playerMoveLeft=true;
        } else if (direction === MOVE_RIGHT/* && this.x < GAME_WIDTH - PLAYER_WIDTH*/) {
            playerMoveRight = true;
        } else if (direction === MOVE_UP/* && this.x < GAME_WIDTH - PLAYER_WIDTH*/) {
            playerMoveUp = true;
        } else if (direction === MOVE_DOWN/* && this.x < GAME_WIDTH - PLAYER_WIDTH*/) {
            playerMoveDown = true;
        }
    }
    update(timeDiff) {
        this.x = this.x + timeDiff * this.speed;
    }
    updateVertical(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}
/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
class Engine {
    constructor(element) {
        // Setup the player
        this.player = new Player();

        // Setup enemies, making sure there are always three
        this.setupEnemies();

        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);

        this.ctx = canvas.getContext('2d');
        
        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);
    }

    /*
     The game allows for 5 horizontal slots where an enemy can be present.
     At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
     */
    setupEnemies() {
        if (!this.enemies) {
            this.enemies = [];
        }
        while (this.enemies.filter(e => !!e).length < MAX_ENEMIES) {
            this.addEnemy();
        }
    }

    // This method finds a random spot where there is no enemy, and puts one in there
    addEnemy() {

        var enemySpots = 3.5;
        var enemySpot;
        // Keep looping until we find a free enemy spot at random
        while (enemySpot === undefined || this.enemies[enemySpot]) {
            enemySpot = Math.floor(Math.random() * enemySpots);
        }
        function spawnPoint() {
            if(enemySpot == 0) return 164;
            else if (enemySpot == 1) return 292;
            else if (enemySpot == 2) return 420;
            else return 548;
        }
        this.enemies[enemySpot] = new Enemy( spawnPoint(), enemySpot );
    }

    // This method kicks off the game
    start() {
        this.score = 0;
        this.lastFrame = Date.now();
        this.announceOvertake = "";
        this.announceOppositeLane = "";
        this.announceCloseCall = "";

        // Listen for keyboard left/right and update the player
        document.addEventListener('keydown', key => {
            if (key.keyCode === LEFT_ARROW_CODE) {
                this.player.move(MOVE_LEFT);
            } else if (key.keyCode === RIGHT_ARROW_CODE) {
                this.player.move(MOVE_RIGHT);
            } else if (key.keyCode === UP_ARROW_CODE) {
                this.player.move(MOVE_UP);
            } else if (key.keyCode === DOWN_ARROW_CODE) {
                this.player.move(MOVE_DOWN);
            }

        })
        document.addEventListener("keyup", up => {
            if(up.keyCode === LEFT_ARROW_CODE) {
                playerMoveLeft = false;
            } else if (up.keyCode === RIGHT_ARROW_CODE) {
                playerMoveRight = false;
            } else if (up.keyCode === UP_ARROW_CODE) {
                playerMoveUp = false;
            } else if (up.keyCode === DOWN_ARROW_CODE) {
                playerMoveDown = false;
            }
        })
        this.gameLoop();
    }

    /*
    This is the core of the game engine. The `gameLoop` function gets called ~60 times per second
    During each execution of the function, we will update the positions of all game entities
    It's also at this point that we will check for any collisions between the game entities
    Collisions will often indicate either a player death or an enemy kill

    In order to allow the game objects to self-determine their behaviors, gameLoop will call the `update` method of each entity
    To account for the fact that we don't always have 60 frames per second, gameLoop will send a time delta argument to `update`
    You should use this parameter to scale your update appropriately
     */
    gameLoop() {
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;

        // Increase the score!
        //this.score += timeDiff;

        // Call update on all enemies
        this.enemies.forEach(enemy => enemy.update(timeDiff));
        //  Call update on the player
        if(playerMoveLeft === true) {
            this.player.update(-timeDiff);

        } else if(playerMoveRight === true) {
            this.player.update(timeDiff);
        }
        if(playerMoveUp === true) {
            this.player.updateVertical(-timeDiff);
        } else if(playerMoveDown === true) {
            this.player.updateVertical(timeDiff);
        }
        
        // Draw everything!
        this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.enemies.forEach(enemy => enemy.render(this.ctx)); // draw the enemies
        this.player.render(this.ctx); // draw the player

        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT) {
                delete this.enemies[enemyIdx];
                overtaken[enemyIdx] = false;
            }
        });
        this.setupEnemies();

        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!
            this.ctx.beginPath();
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score + ' GAME OVER', 5, 30);

            this.ctx.closePath();

            document.querySelector(".background").setAttribute("style", "animation: 0s");
        }
        else {
            // If player is not dead, then draw the score and announcements
    
            //  Total Score
            this.ctx.beginPath();
            if(isScoreGoingUp === true) {this.ctx.fillStyle = '#FFFFFF';}
            else {this.ctx.fillStyle = '#EE209A';}
            this.ctx.font = '45px lazer84';
            this.ctx.fillText(this.score, 15, 50);
            this.ctx.closePath();

            //  +Score
            this.ctx.beginPath();
            if(opacityOppositeLane > 0) this.ctx.fillStyle = "rgba(255, 255, 255, "+ opacityOppositeLane +")";
            else if(opacityOvertake > 0) this.ctx.fillStyle = "rgba(255, 255, 255, "+ opacityOvertake +")";
            //else this.ctx.fillStyle = "rgba(255, 255, 255, 0 )";
            this.ctx.font = '25px vcr';
            this.ctx.fillText(plusScore, 15, 80);
            this.ctx.closePath();

            //  SECOND+Score
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(255, 255, 255, "+ opacityCloseCall +")";
            this.ctx.font = '25px vcr';
            this.ctx.fillText(secondPlusScore, 15, 110);
            this.ctx.closePath();

            //  Overtakes
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(255, 255, 255, "+ opacityOvertake +")";
            this.ctx.font = "35px vcr";
            this.ctx.fillText(this.announceOvertake, GAME_WIDTH/1.8, 60);
            opacityOvertake = opacityOvertake - 0.01;
            this.ctx.closePath();

            //  Opposite Lane driving
            if (isDrivingOppositeLane) {
                this.closeCall()
                this.ctx.beginPath();
                opacityOppositeLane = 1.0;
                this.ctx.fillStyle = "rgba(255, 255, 255, "+ opacityOppositeLane +")";
                this.ctx.font = "35px vcr";
                this.ctx.fillText(this.announceOppositeLane, GAME_WIDTH/6, 60);
                this.ctx.closePath();
            } else if(opacityOppositeLane > 0) {
                this.ctx.beginPath();
                this.ctx.fillStyle = "rgba(255, 255, 255, "+ opacityOppositeLane +")";
                this.ctx.font = "35px vcr";
                this.ctx.fillText(this.announceOppositeLane, GAME_WIDTH/6, 60);
                this.ctx.closePath();
                opacityOppositeLane = opacityOppositeLane - 0.01;
            }
            //  Close Calls
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(255, 255, 255, "+ opacityCloseCall+")";
            this.ctx.font = "35px vcr";
            this.ctx.fillText(this.announceCloseCall, GAME_WIDTH/6, 90);
            opacityCloseCall = opacityCloseCall - 0.01;
            this.ctx.closePath();
            
            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
        this.overTake()
        this.drivingOpposingLane();
    }
    overTake() {
       
        for (var i=2; i<this.enemies.length; i++) {
            if (this.enemies[i] == undefined) continue;
            else if(
                this.enemies[i].x < this.player.x + PLAYER_WIDTH*2 &&
                this.enemies[i].x + ENEMY_WIDTH*2 > this.player.x &&
                this.enemies[i].y < this.player.y + PLAYER_HEIGHT &&
                this.enemies[i].y + ENEMY_HEIGHT > this.player.y &&
                overtaken[i] === false) {
                   overtaken[i] = true;
                   
                if(this.announceOvertake !== "Overtake!") {
                    
                    clearTimeout(overtakeTimeout);
                    isOvertaking = true;
                    isScoreGoingUp = true;
                    plusScore = "+1000"
                    console.log(plusScore)
                    this.score += 1000;
                    this.announceOvertake = "Overtake!"
                    opacityOvertake = 1.0;
                    overtakeTimeout = setTimeout(() => {
                        plusScore = "";
                        isOvertaking = false;
                        this.announceOvertake = "";
                        isScoreGoingUp = false;
                    }, 1500);
                } else {
                    isOvertaking = true;
                    isScoreGoingUp = true;
                    plusScore = "+2000"
                    this.score += 1000
                    opacityOvertake = 1.0;
                    clearTimeout(overtakeTimeout)
                    this.announceOvertake = "Overtake!"
                    overtakeTimeout = setTimeout(() => {
                        plusScore = "";
                        isOvertaking = false;
                        this.announceOvertake = "";
                        isScoreGoingUp = false;
                    }, 1500);
                }
            }
            //else isScoreGoingUp = false;
        }
    }
    closeCall() {
        for (var i=0; i<this.enemies.length-2; i++) {
            if (this.enemies[i] == undefined) continue;
            else if(
                this.enemies[i].x < this.player.x + PLAYER_WIDTH*2 &&
                this.enemies[i].x + ENEMY_WIDTH*2 > this.player.x &&
                this.enemies[i].y < this.player.y + PLAYER_HEIGHT &&
                this.enemies[i].y + ENEMY_HEIGHT > this.player.y &&
                overtaken[i] === false) {
                   overtaken[i] = true;
                   
                if(this.announceCloseCall !== "Close Call!") {
                    clearTimeout(closeCallTimeout);
                    //isOvertaking = true;
                    isScoreGoingUp = true;
                    secondPlusScore = "+3000";
                    this.score += 3000;
                    this.announceCloseCall = ["Close call!","You maniac!", "Get off the road!", "What's wrong with you?", "Who taught you how to drive?", "Jesus dude"][Math.floor(Math.random()*6)]
                    opacityCloseCall = 1.0;
                    closeCallTimeout = setTimeout(() => {
                        secondPlusScore = "";
                        //isOvertaking = false;
                        this.announceCloseCall = "";
                        isScoreGoingUp = false;
                    }, 1500);
                } 
            }
        }
    }

    drivingOpposingLane() {
        if(
        ROAD_DEADSPACE_LEFT < this.player.x + PLAYER_WIDTH&&
        ROAD_DEADSPACE_LEFT + leftLaneWidth > this.player.x ){
            if(isDrivingOppositeLane === false)freezeCurrentScore = this.score;
            plusScore = "+"+((tempShowScore+=10)-freezeCurrentScore).toString();
            this.score += 10;
            isScoreGoingUp = true;
            this.announceOppositeLane = "Public Danger!";
            isDrivingOppositeLane = true;
        } else {
            if(isScoreGoingUp === true && isOvertaking === false) isScoreGoingUp = false;
            if(isOvertaking === false)plusScore = "";
            isDrivingOppositeLane = false;

        }
    }

    isPlayerDead() {
        // TODO: fix this function!
        for (var i=0; i<this.enemies.length; i++) {
            if (this.enemies[i] == undefined) continue;
            else if (
                this.enemies[i].x < this.player.x + PLAYER_WIDTH &&
                this.enemies[i].x + ENEMY_WIDTH > this.player.x &&
                this.enemies[i].y < this.player.y + PLAYER_HEIGHT-20 &&
                this.enemies[i].y + ENEMY_HEIGHT > this.player.y) {
                   return true;
               }
            }
            if (
                ROAD_DEADSPACE_LEFT < this.player.x + PLAYER_WIDTH &&
                ROAD_DEADSPACE_LEFT > this.player.x ) {
                    return true;
            } else if (
                ROAD_DEADSPACE_RIGHT < this.player.x + PLAYER_WIDTH&&
                ROAD_DEADSPACE_RIGHT > this.player.x ) return true;

                return false;
    }
}

// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();