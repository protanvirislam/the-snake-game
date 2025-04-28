const snake = document.querySelector(".snake");
const food = document.querySelector(".food");
const gameBoard = document.querySelector(".game-board");
const score_element = document.querySelector(".score");
const high_score = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls > div ");
const value_display = document.querySelector(".value-display");
const speed_slider = document.querySelector(".speed-control [type='range']");
const speed_div = document.querySelector(".speed-control");





let foodX;
let foodY;
let max = 31;
let movingInterval;
let moving = false;
let isSpeedChanged = false;

let snakeX = 15;
let snakeY = 15;

let velocityX = 0,
  velocityY = 0;

let snakeBody = [];
let speed = 500;

//update random Food
function updateFood() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
  
}

let score = 0;

//Move the snake
function movingSnake() {

  if(moving) {
    speed_div.style.opacity = '0';
  }

  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    
    updateFood();
    snakeBody.push([foodX, foodY]);
    score += 1;
    score_element.innerHTML = `Score: ${score}`;


     if(localStorage.highScore) {
       
      if(score >  localStorage.highScore) {
        localStorage.setItem("highScore", score);
        high_score.innerHTML = `high-score: ${localStorage.getItem("highScore")}`
      }
     }else {
      localStorage.setItem("highScore", 0 );
     }
    
    
    
  }

 

  snakeX += velocityX;
  snakeY += velocityY;

 
for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }




  snakeBody[0] = [snakeX, snakeY];

  
 

  if (snakeX === 0 || snakeY === 0 || snakeX === max || snakeY === max) {
    gameOver()
  }

  for (let i = 0; i < snakeBody.length; i++) {
    // Adding a div for each part of the snake's body
    html += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    if(i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
       gameOver()
    }
  }

 
 
  gameBoard.innerHTML = html;


 
}

const changeDirection = (e) => {
  
  if(!moving && isSpeedChanged) {
    console.log("rerunnig")
    setInterval(movingSnake, speed);
    speed_div.style.opacity = '0';
   
  }
  moving = true;
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

//Helper function

function gameOver() {
  alert("game over !!!!");
  clearInterval(movingInterval);
  location.reload()
}

function changeSpeed(e) {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight" ||  e.key === "ArrowUp" ||  e.key === "ArrowDown" ) {
   e.preventDefault
  }

  if(!moving) {
    clearInterval(movingInterval)
  }
  
   
   speed =Math.abs( +speed_slider.value);
 
    isSpeedChanged = true;

    switch (speed) {
      case 500:
        value_display.textContent = "1"  
        break;
        case 400:
          value_display.textContent = "2"  
          break;
        case 300:
          value_display.textContent = "3"  
          break;
        case 200:
          value_display.textContent = "4"  
          break;
        case 100:
          value_display.textContent = "5"  
          break;
     
    }
}


  



//calling Event
updateFood()
high_score.innerHTML = `high-score: ${localStorage.getItem('highScore') === null ? 0 : localStorage.getItem('highScore') }`


document.addEventListener("keyup", changeDirection);

movingInterval = setInterval(movingSnake, speed);

controls.forEach((button) => {
  
  button.addEventListener('click', function() {
   let e = {key: this.getAttribute("data-key")};
   
   changeDirection(e)

  })
   
})

speed_slider.addEventListener("input", changeSpeed)






   
