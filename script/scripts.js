window.addEventListener('DOMContentLoaded', () => {

    //DOM ELEMENTS
    let enterButton = document.getElementById('enterGame')
    let startButton = document.getElementById('startGame')
    let intro = document.getElementById('intro')
    let topBar = document.getElementById('top')
    let interface = document.getElementById('interface')    
    let interfacePts = document.getElementById('interfacePts')    
    let main = document.getElementById('main')
    let canvas = document.getElementById ('canvas');
    let timeDisplay = document.getElementById('timer'); 
    let player1 = document.getElementById('player1')
    
    
    
    //Game Variables
    let ctx = canvas.getContext('2d');
    let kickSound = new Audio ("sounds/3.mp3")
    let chickenSound = new Audio ("sounds/chicken-clucking-sound-1.mp3")
    let keyPresses = {};
    let score = 0;
    let timeLeft = 14
    
    //Object Images
    let background = new Image()
    background.src = 'images/pixil-frame-0.png'
    let bruceImg = new Image();
    bruceImg.src = 'images/6.64.png'
    let waterBottleImg = new Image()
    waterBottleImg.src = 'images/water.png'
    let chickenImg = new Image()
    chickenImg.src = 'images/Chicken_Feed.gif'
    
    //Background Image Load
    background.onload = function(){
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);   
    }

    // Bruce Lee Constructor
    function Player(x, y, width, height, speed, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.img = img
        this.draw = function() {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }

    // Water Bottles Constructor AND Collision Dectection
    function WaterBottle(x, y, width, height, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
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
                    chicken.x = generateX(0, 285);
                    chicken.y = generateY(0, 135);
                    score++;
                    kickSound.play();
                }
        }
    }
 
    //Bonus bottles with NO chickens
    function WaterBottle2(x, y, width, height, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
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
                    kickSound.play();
                }
        }
    }

    //Chickens Constructor AND Collision Dectection
    function whiteChicken(x, y, width, height, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.img = img
        this.draw = function() {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        this.collision = function() {
            if (bruce.x + bruce.width > this.x
                && bruce.x < this.x + this.width
                && bruce.y < this.y + this.height
                && bruce.y + bruce.height > this.y) {
                    chickenSound.play();
                    this.x = generateX(0, 285);
                    this.y = generateY(0, 135);
                    score--;
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
    let randomX = generateX(0, 285)
    let randomY = generateY(0, 135)
    //Bonus Bottles
    let randomX2 = generateX(0, 285)
    let randomY2 = generateY(0, 135)
    //Bonus Bottles
    let randomX3 = generateX(0, 285)
    let randomY3 = generateY(0, 135)
    //Bonus Bottles
    let randomX4 = generateX(0, 285)
    let randomY4 = generateY(0, 135)
    //Bonus Bottles
    let randomX5 = generateX(0, 285)
    let randomY5 = generateY(0, 135)

    //Random chicken position
    let randomXc = generateX(0, 285)
    let randomYc = generateY(0, 135)
    
    //Random chicken #2
    let randomXc2 = generateX(0, 285)
    let randomYc2 = generateY(0, 135)

    //Random chicken #3
    let randomXc3 = generateX(0, 285)
    let randomYc3 = generateY(0, 135)

    //Characters 
    let bruce = new Player(170, 50, 30, 30, 2, bruceImg) 
    let bottle = new WaterBottle(randomX, randomY, 12, 12, waterBottleImg) 
    let bottle2 = new WaterBottle2(randomX2, randomY2, 12, 12, waterBottleImg) 
    let bottle3 = new WaterBottle2(randomX3, randomY3, 12, 12, waterBottleImg) 
    let bottle4 = new WaterBottle2(randomX4, randomY4, 12, 12, waterBottleImg) 
    let bottle5 = new WaterBottle2(randomX5, randomY5, 12, 12, waterBottleImg) 
    let chicken = new whiteChicken(randomXc, randomYc, 15, 15, chickenImg) 
    let chicken2 = new whiteChicken(randomXc2, randomYc2, 15, 15, chickenImg) 
    let chicken3 = new whiteChicken(randomXc3, randomYc3, 15, 15, chickenImg) 

    //RESET Game
    function reset(){
        score = 0
        timeLeft = 14
        player1.innerText = ("Score: " + score)
        interfacePts.innerText = score
        bruce = new Player(170, 50, 30, 30, 2, bruceImg) 
        bottle = new WaterBottle(randomX, randomY, 12, 12, waterBottleImg) 
        chicken = new whiteChicken(randomXc, randomYc, 15, 15, chickenImg)
        countDown()
    }
    
    //Timer Function
    function countDown(){
        let x = setInterval(function(){
            if(timeLeft >= 0) {
                timeDisplay.innerText = timeLeft
                timeLeft -=1 
            } else {
                clearInterval(x)
            }
        }, 1000);
    }
    
    //Game Over Function
    function isGameOver () {
        let gameOver = false;
        
        if(timeLeft === 0){
            gameOver = true;
        }
        
        if(gameOver){
            ctx.fillStyle ="black";
            ctx.font = "20px Verdana";
            ctx.fillText("Game Over!", canvas.width/3, canvas.height/5)
            interface.style.display = 'flex'
            interfacePts.innerText = score
        }
        
        return gameOver;
    }
    
    //Start Button Event Listeners
    startButton.addEventListener('click', () => {
        reset()
        gameLoop()
        interface.style.display = 'none'
        
    })
    
    // Enter Screen Event Listeners
    enterButton.addEventListener('click', () => {
        enterButton.style.display = 'none'
        intro.style.display = 'none'
        topBar.style.display = 'flex'
        main.style.display = 'flex'
        interface.style.display = 'flex'
    })
    
    //User key Event Listeners
     window.addEventListener('keydown', keyDownListener, false);
     function keyDownListener(event) {
         keyPresses[event.key] = true;
     }
 
     window.addEventListener('keyup', keyUpListener, false);
     function keyUpListener(event) {
         keyPresses[event.key] = false;
     }

    //Function for player keyboard input
    function gameLoop() {
        //Always clears canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        //check for collision
        bottle.collision()
        bottle2.collision()
        bottle3.collision()
        bottle4.collision()
        bottle5.collision()
        chicken.collision()
        chicken2.collision()
        chicken3.collision()
        
        //draw objects
        bruce.draw()
        bottle.draw()
        chicken.draw()

        if(score >= 5){
            chicken2.draw()
        }

        if(score >= 10){
            chicken3.draw()
        }

        if(timeLeft <= 4){
            bottle2.draw()
            bottle3.draw()
        } 

        if(timeLeft <= 2){
            bottle4.draw()
            bottle5.draw()
        }
        
        //Check for game over 
        let result = isGameOver();
        if(result){
            return;
        }

        //Show Player Score
        player1.innerText = ("Score: " + score)
    
        
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
})
