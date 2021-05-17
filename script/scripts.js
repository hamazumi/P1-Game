window.addEventListener('DOMContentLoaded', () => {

    //Variables
    const SCALE = 0.5;
    const WIDTH = 60;
    const HEIGHT = 60;
    const SCALED_WIDTH = SCALE * WIDTH;
    const SCALED_HEIGHT = SCALE * HEIGHT;
    const MOVEMENT_SPEED = 1;


    let canvas = document.getElementById ("canvas");
    let ctx = canvas.getContext("2d");
    let keyPresses = {};
    let positionX = 125;
    let positionY = 50;
    let img = new Image();

    //TIMER
    let timeDisplay = document.getElementById("timer");
    let startButton = document.getElementById("startGame")
    let timeLeft = 10
    //Countdown Timer
    function countDown(){
        setInterval(function(){
            if(timeLeft <= 0) {
                clearInterval(timeLeft = 0)
            }
            timeDisplay.innerHTML = timeLeft
            timeLeft -=1
            
        }, 1000);
    }
    
    startButton.addEventListener('click', countDown)

     //Event Listeners
     window.addEventListener('keydown', keyDownListener, false);
     function keyDownListener(event) {
         keyPresses[event.key] = true;
         console.log(event.key);
     }
 
     window.addEventListener('keyup', keyUpListener, false);
     function keyUpListener(event) {
         keyPresses[event.key] = false;
 
     }
     
     //Load Initial Image 
     function loadImage() {
         img.src = 'images/6.64.png';
         img.onload = function() {
             // ctx.drawImage(img, 0, 0, 60, 60, 0, 0, 30, 30);
             
             gameLoop();
         }
     }
 
     //Function to dynamically updatre frame
     function drawFrame(frameX, frameY, canvasX, canvasY) {
         ctx.drawImage(img, frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT, canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
     }
 
     //Call to load initial image
     loadImage();
 
     //Function for player keyboard input
     function gameLoop() {
         //Always clears canvas first
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         
         //Event 
         if (keyPresses.ArrowUp) {
            if (positionY - MOVEMENT_SPEED > 0) {
                positionY -= MOVEMENT_SPEED;
            }
         } else if (keyPresses.ArrowDown) {
            if (positionY + SCALED_HEIGHT + MOVEMENT_SPEED < canvas.height) {
                positionY += MOVEMENT_SPEED;
            }
         }
 
         if (keyPresses.ArrowLeft) {
            if (positionX - MOVEMENT_SPEED > 0){
                positionX -= MOVEMENT_SPEED;
            }
         } else if (keyPresses.ArrowRight) {
            if (positionX + SCALED_WIDTH + MOVEMENT_SPEED < canvas.width) {
                positionX += MOVEMENT_SPEED;
            }         
        }
 
         drawFrame(0, 0, positionX, positionY);
 
         window.requestAnimationFrame(gameLoop);
     }

    
})

