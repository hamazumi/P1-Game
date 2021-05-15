window.addEventListener('DOMContentLoaded', () => {

    //Variables
    let canvas = document.querySelector('#game');
    let background = new Image();

    
    //allows ability to draw
    let draw = canvas.getContext('2d');

    

    //canvas


    //Start location
     let xPos = 0;
     let yPos = 0;

    // square
    draw.fillRect(xPos, yPos, 50, 50);
    draw.stroke();

    //Function to move square
    function move(e){

        //Right Arrow Key
        if(e.keyCode==39){
            xPos+=5;
        }
        //Left Arrow Key
        if(e.keyCode==37){
            xPos-=5;
        }
        //Up Arrow Key
        if(e.keyCode==38){
            yPos-=5;
        }
        //Down Arrow Key
        if(e.keyCode==40){
            yPos+=5;
        }

        //Resets the canvas
        canvas.width=canvas.width;
        //redraw square
        draw.fillRect(xPos, yPos, 50, 50);
        draw.stroke();
       
    }

    document.onkeydown = move;

})

