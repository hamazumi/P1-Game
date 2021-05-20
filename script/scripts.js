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
    let ctx = canvas.getContext('2d');
    let timeDisplay = document.getElementById('timer');
    let player1 = document.getElementById('player1')
    // let player2 = document.getElementById('player2')
    // let startTime = document.getElementById('startTime')
    


    //CREATE SPRITES
    let background = new Image()
    background.src = 'images/pixil-frame-0.png'
    let bruceImg = new Image();
    bruceImg.src = 'images/6.64.png'
    let waterBottleImg = new Image()
    waterBottleImg.src = 'images/water.png'
    let chickenImg = new Image()
    chickenImg.src = 'images/Chicken_Feed.gif'

    background.onload = function(){
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);   
    }

    //Sound
    let kickSound = new Audio ("sounds/3.mp3")
    let chickenSound = new Audio ("sounds/chicken-clucking-sound-1.mp3")

    //Player Scores
    let score = 0;
    // let score2 = 0;

    // //Game Variables
    let timeOut = false;
    // let player1 = true;
    // let player2 = false;
    // let winner = false;
    // let gameDraw = false;

    /*----- Variable Declarations -----*/
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

    //Random chicken position
    let randomXc = generateX(0, 285)
    let randomYc = generateY(0, 135)


    // Water Bottle Constructor
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

    // Chicken Constructor
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
                    console.log("collision detected in Chicken Constructor")
                }
        }
    }


    //GAME PIECE CREATION
    let bruce = new Player(170, 50, 30, 30, 1, bruceImg) 
    // let bottle = new WaterBottle(randomX, randomY, 12, 12, waterBottleImg) 
    let bottle = new WaterBottle(randomX, randomY, 12, 12, waterBottleImg) 
    let chicken = new whiteChicken(randomXc, randomYc, 15, 15, chickenImg) 

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







     //RESET Game
     function reset(){
         score = 0
         timeLeft = 9
         player1.innerText = ("Score: " + score)
         interfacePts.innerText = score
         bruce = new Player(170, 50, 30, 30, 1, bruceImg) 
         countDown()

     }








       //TIMER FUNCTION
    let timeLeft = 9
     

    function countDown(){
        let x = setInterval(function(){
            if(timeLeft >= 0) {
                timeDisplay.innerText = timeLeft
                timeLeft -=1 
                console.log(timeLeft)
            } else {
                clearInterval(x)
                console.log("end Time")        
            }
        }, 1000);
    }
    
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


    //Start Button
    startButton.addEventListener('click', () => {
        reset()
        gameLoop()
        interface.style.display = 'none'

    })

    // Enter intro screen
    enterButton.addEventListener('click', () => {
        enterButton.style.display = 'none'
        intro.style.display = 'none'
        topBar.style.display = 'flex'
        main.style.display = 'flex'
        interface.style.display = 'flex'
    })



    //Function for player keyboard input
    function gameLoop() {
        //Always clears canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        bottle.collision()
        chicken.collision()
        
        //draw Bruce
        bruce.draw()
        bottle.draw()
        chicken.draw()
        
        let result = isGameOver();
        if(result){
            return;
        }
        //Show Player1 Score
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
