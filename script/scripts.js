window.addEventListener('DOMContentLoaded', () => {

    //DOM ELEMENTS

    let startButton = document.getElementById("startGame")
    let intro = document.getElementById('intro')
    let main = document.getElementById('main')
    let canvas = document.getElementById ("canvas");
    let ctx = canvas.getContext("2d");
    let timeDisplay = document.getElementById("timer");
    let player1 = document.getElementById("player1")
    let player2 = document.getElementById("player2")
    let startTime = document.getElementById("startTime")
    
    //CREATE SPRITES
    let bruceImg = new Image();
    bruceImg.src = 'images/6.64.png'
    let waterBottleImg = new Image()
    waterBottleImg.src = 'images/water.png'

    //Player Scores
    let score = 0;

    /*----- Variable Declarations -----*/
    // Bruce Lee Constructor
    function Player(x, y, width, height, speed, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.alive = true
        this.img = img
        this.draw = function() {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }

    // Random X and Y coordinate generators
    const generateX = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    }
    
    const generateY = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    }

    // Random Water Bottle Position
    let randomX = generateX(0, 285)
    let randomY = generateY(0, 135)

    // Water Bottle Constructor
    function WaterBottle(x, y, width, height, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.img = img
        this.draw = function() {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        this.collision = function() {
            if (bruce.x + bruce.width > this.x
                && bruce.x < this.x + this.width
                && bruce.y < this.y + this.height
                && bruce.y + bruce.height > this.y) {
                    this.x = generateX(0, 285);
                    this.y = generateY(0, 135);
                    score++;
                    console.log("collision detected in Water Bottle Constructor")
                }
        }
    }


    //GAME PIECE CREATION
    let bruce = new Player(170, 50, 30, 30, 1, bruceImg) 
    // let bottle = new WaterBottle(randomX, randomY, 12, 12, waterBottleImg) 
    let bottle = new WaterBottle(randomX, randomY, 12, 12, waterBottleImg) 

    //USER KEY EVENT LISTENERS
    let keyPresses = {};

     window.addEventListener('keydown', keyDownListener, false);
     function keyDownListener(event) {
         keyPresses[event.key] = true;
         console.log(event.key);
     }
 
     window.addEventListener('keyup', keyUpListener, false);
     function keyUpListener(event) {
         keyPresses[event.key] = false;
 
     }



    //Function for player keyboard input
    function gameLoop() {
        //Always clears canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        bottle.collision()
        //draw Bruce
        bruce.draw()
        bottle.draw()

        //Show Player1 Score
        player1.textContent = ("Score " +score)
    
        
        //Player Movement 
        if (keyPresses.ArrowUp) {
           if (bruce.y - bruce.speed > 0) {
               bruce.y -= bruce.speed;
           }
        } else if (keyPresses.ArrowDown) {
           if (bruce.y + bruce.height + bruce.speed < canvas.height) {
               bruce.y += bruce.speed;
           }
        }

        if (keyPresses.ArrowLeft) {
           if (bruce.x - bruce.speed > 0){
               bruce.x -= bruce.speed;
           }
        } else if (keyPresses.ArrowRight) {
           if (bruce.x + bruce.width + bruce.speed < canvas.width) {
               bruce.x += bruce.speed;
           }         
       }

        window.requestAnimationFrame(gameLoop);
    }

    //START GAME

    gameLoop();




})