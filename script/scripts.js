window.addEventListener('DOMContentLoaded', () => {

    //DOM ELEMENTS

    let startButton = document.getElementById("startGame")
    let intro = document.getElementById('intro')
    let main = document.getElementById('main')
    let canvas = document.getElementById ("canvas");
    let ctx = canvas.getContext("2d");
    let timeDisplay = document.getElementById("timer");

    //CREATE SPRITES
    let bruceImg = new Image()
    bruceImg.src = 'images/6.64.png'
    let waterBottleImg = new Image()
    waterBottleImg.src = 'images/water.png'

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
        this.render = function() {
            ctx.drawImage(this.img, this.x, this.y)
        }
    }

    // Water Bottle Constructor
    function WaterBottle(x, y, width, height, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.img = img
        this.render = function() {
            ctx.drawImage(this.img, this.x, this.y)
        }
        this.collision = function() {
            if (bruce.x + bruce.width > this.x
                && bruce.x < this.x + this.width
                && bruce.y < this.y + this.height
                && bruce.y + bruce.height > this.y
                && this.alive) {
                    this.alive = false
                    console.log("collision detected in Water Bottle Constructor")
                }
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
    let randomX = generateX(0, 275)
    let randomY = generateY(0, 115)

    //GAME PIECE CREATION
    let bruce = new Player(125, 50, 30, 30, 1, bruceImg) 
    // let bottle = new WaterBottle(275, 115, 20, 20, waterBottleImg) 
    let bottle = new WaterBottle(randomX, randomY, 20, 20, waterBottleImg) 

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

        //render Bruce
        bruce.render()
        bottle.render()
        
        if (bottle.alive) {
            bottle.collision()
            console.log("collision detected in Game Loop")

       }
        
        //Game Event 
        if (keyPresses.ArrowUp) {
           if (bruce.y - bruce.speed > 0) {
               bruce.y -= bruce.speed;
           }
        } else if (keyPresses.ArrowDown) {
           if (bruce.y + bruce.height + bruce.speed < 120) {
               bruce.y += bruce.speed;
           }
        }

        if (keyPresses.ArrowLeft) {
           if (bruce.x - bruce.speed > 0){
               bruce.x -= bruce.speed;
           }
        } else if (keyPresses.ArrowRight) {
           if (bruce.x + bruce.width + bruce.speed < 280) {
               bruce.x += bruce.speed;
           }         
       }

        window.requestAnimationFrame(gameLoop);
    }

    //START GAME

    gameLoop();




})
