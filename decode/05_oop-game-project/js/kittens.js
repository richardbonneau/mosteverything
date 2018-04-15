// This sectin contains some game constants. It is not super interesting
var frameOne = false;

var GAME_WIDTH = 840;
var GAME_HEIGHT = 650;

var ROAD_DEADSPACE_LEFT = 175;
var ROAD_DEADSPACE_RIGHT = GAME_WIDTH-175;

var ENEMY_WIDTH = 50;
var ENEMY_HEIGHT = 95;
var MAX_ENEMIES = 3;

var PLAYER_WIDTH = 50;
var PLAYER_HEIGHT = 95;

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

// Preload game images
var images = {};
["viper_south.png", "viper_north.png" ,"background.png", "player.png"].forEach(imgName => {
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
        this.sprite = images["viper_south.png"];
        this.speed = Math.random() / 1 + 0.50;
        } 
        else if (carPos == 2||carPos == 3) {
            this.sprite = images["viper_north.png"];
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
        this.x = 15 * PLAYER_WIDTH;
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
        console.log("playerup",playerMoveUp, "playerdown", playerMoveDown)
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;

        // Increase the score!
        this.score += timeDiff;

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
            }
        });
        this.setupEnemies();

        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score + ' GAME OVER', 5, 30);

            document.querySelector("@keyframes").setAttribute("style", "background-position:0px 0px;");
        }
        else {
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score, 5, 30);

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    }


    isPlayerDead() {
        // TODO: fix this function!
        for (var i=0; i<this.enemies.length; i++) {
            if (this.enemies[i] == undefined) continue;
            else if(this.player.x < this.enemies[i].x + ENEMY_WIDTH &&
               this.player.x + PLAYER_WIDTH > this.enemies[i].x &&
               this.player.y < this.enemies[i].y + ENEMY_HEIGHT &&
               this.player.y + PLAYER_HEIGHT > this.enemies[i].y) {
                   return true;
               }
            }
            return false;
    }
}

// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();