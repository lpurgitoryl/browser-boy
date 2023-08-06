// ! these are the global consts free to use anywhere 
const action_keys = {
  a: { pressed: false, id: 'controller_a' },
  d: { pressed: false, id: 'controller_b' },
  c: { pressed: false, id: 'controller_start' },
  v: { pressed: false, id: 'controller_select' },
  ArrowRight: { pressed: false, id: 'controller_right' },
  ArrowLeft: { pressed: false, id: 'controller_left' },
  ArrowUp: { pressed: false, id: 'controller_up' },
  ArrowDown: { pressed: false, id: 'controller_down' },

};

const canvas = document.getElementById("mainCanvas");
const canvasContext = canvas.getContext("2d");
let gameOn = false;

// intial values
const paddleY = canvas.height - 15;
const paddleX = canvas.width / 2;
const paddleW = canvas.width / 5;
const paddleH = 5;

const brickCols = 8;
const brickRows = 4;
const brickOffsetX = 5;
const brickOffsetY = 3;
const brickW = paddleW / 2;
const brickH = paddleH * 2;

const ballX = canvas.width / 2;
const ballY = canvas.height / 2;
const ballR = 5;

// ball x/y movement 
var deltaXBall = 2;
var deltaYBall = -2;

// paddle movement
const deltaXPaddle = 4;

const video = document.getElementById("video");
let videoHasEnded = false;

// Uncomment function below for on screen log
// function log(msg) {

//   const container = document.getElementById("log");
//   container.textContent = `${msg} \n${container.textContent}`;

// };

// click and keyboard listners

window.addEventListener('keydown', (event) => {
  if (!(event.key in action_keys)) {
    console.log("key has no action");
    return;
  }
  action_keys[event.key].pressed = true;
  event.preventDefault();
});


window.addEventListener('keyup', (event) => {
  if (!(event.key in action_keys)) {
    console.log("key has no action");
    return;
  }
  action_keys[event.key].pressed = false;
  event.preventDefault();
});

function handleStart(evt) {
  evt.preventDefault();
  let id = this.id;
  temp = Object.keys(action_keys);
  temp.forEach(element => {
    if (action_keys[element].id == id) {
      action_keys[element].pressed = true;
    }
  });

};

function handleEnd(evt) {
  evt.preventDefault();
  let id = this.id;
  temp = Object.keys(action_keys);
  temp.forEach(element => {
    if (action_keys[element].id == id) {
      action_keys[element].pressed = false;
    }
  });
};

function handleDown(evt) {
  evt.preventDefault();
  console.log(`target ${this.id} mouse/click started`);
};

function handleUp(evt) {
  console.log(`target ${this.id} mouse/click ended`);
};

function buttonTouchOrClick() {
  temp = Object.keys(action_keys);
  temp.forEach(element => {
    document.getElementById(action_keys[element].id).addEventListener("touchstart", handleStart);
    document.getElementById(action_keys[element].id).addEventListener("touchend", handleEnd);

    document.getElementById(action_keys[element].id).addEventListener("mouseup", handleUp);
    document.getElementById(action_keys[element].id).addEventListener("mousedown", handleDown);
    console.log(action_keys[element].id);

  });

  console.log('touch and click listeners added');
};

//! here are the diffrent classes
// using classes v loosley just so i can call update on each object easily
// im consiously not following best practices for OOP since this is a small game
class Drawable {
  constructor(x, y, w, h, canvasContext) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.ctx = canvasContext;
  }

  // A method used to draw the drawable as a rect.
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.fill();
    this.ctx.closePath();

  }

  update() {
    this.draw();
  }

};

class Ball extends Drawable {
  constructor(x, y, w, h, radius, canvasContext) {
    super(x, y, 0, 0, canvasContext);
    this.radius = radius;
    this.startAngle = 0
    this.endAngle = Math.PI * 2;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

}

function checkAnyKeypress() {
  temp = Object.keys(action_keys);
  flag = false;

  temp.forEach(element => {
    if (action_keys[element].pressed) {
      flag = true;
    }
  });

  return flag;
}

class Brick extends Drawable {
  constructor(x, y, w, h, maxHits, canvasContext) {
    super(x, y, w, h, canvasContext);
    this.hits = 0;
    this.maxHits = maxHits;
    this.removed = false;
  }

  update() {
    if (this.hits >= this.maxHits) {
      if (this.removed) {
        return;
      }
      this.removed = true;
    } else {
      super.update();
    }
  }

};
// game can have a list of drawables, will have a gameOver , gameStart
// playable is a single drawable instance, enemyList is a list of drawables

class gameObject {
  constructor(playable, enemyList, objectList, gameName) {
    this.playable = playable
    this.enemyList = enemyList;
    this.objectList = objectList;
    this.gameName = gameName;
  };

  runGame() {
    console.log("running: " + this.gameName);
  }

};


function paddleMoveRight() {
  if (paddle.w + paddle.x + deltaXPaddle < canvas.width) { paddle.x += deltaXPaddle; }
  console.log('paddle moved right');
}

function paddleMoveLeft() {
  if (paddle.x > 0)
    paddle.x -= deltaXPaddle;
  console.log('paddle moved left');
}

const paddleAction = {
  a: { func: false },
  d: { func: false },
  c: { func: false },
  v: { func: false },
  ArrowRight: { func: paddleMoveRight },
  ArrowLeft: { func: paddleMoveLeft },
  ArrowUp: { func: false },
  ArrowDown: { func: false },

};

function paddleHandler() {
  temp = Object.keys(action_keys);
  temp.forEach(element => {
    if (action_keys[element].pressed && (paddleAction[element].func != false)) {
      paddleAction[element].func();
    }
  });

};

function ballPhysics() {

  if (ball.x + deltaXBall < canvas.width - ball.radius) { // hasnt hit right wall yet
    ball.x += deltaXBall;
  }
  if (ball.x + deltaXBall > canvas.width - ball.radius) { // hits right wall and changes direction
    deltaXBall = -deltaXBall;
    ball.x += deltaXBall;
  }
  if (ball.x + deltaXBall < 0) {  // hits left wall and changes direction
    deltaXBall = -deltaXBall;
    ball.x += deltaXBall;
  }

  if (ball.y + deltaYBall > 0) { // hasnt hit top
    ball.y += deltaYBall;
  }
  if (ball.y + deltaYBall < 0) { // hits top and changes direction
    deltaYBall = -deltaYBall;
    ball.y += deltaYBall;
  }
  if (ball.y + deltaYBall > canvas.height - ball.radius) { // ball hits floor, sets gameOver to true
    return true;
  }

  if ((ball.y + deltaYBall > paddle.y - ball.radius) && (ball.y < paddle.y - ball.radius + paddle.h) && (ball.x > paddle.x - ball.radius) && (ball.x < paddle.x + paddle.w - ball.radius)) { // ball hits paddle but not floor and redirects
    deltaYBall = -deltaYBall;
    ball.y += deltaYBall;
  }

  for (let i = 0; i < brickCols; i++) {
    for (let j = 0; j < brickRows; j++) {
      if (didBallHitBrick(bricks[i][j]) && !(bricks[i][j].removed)) {
        deltaYBall = -deltaYBall;
        ball.y += deltaYBall;
      }
    }
  }

  return false;
}


function generateBricks() {
  templist = [];
  console.log(templist);
  for (let i = 0; i < brickCols; i++) {
    templist[i] = [];
    for (let j = 0; j < brickRows; j++) {
      by = (j * (brickH + brickOffsetX)) + 5;
      bx = (i * (brickW + brickOffsetY)) + 5;

      templist[i][j] = new Brick(Math.floor(bx), Math.floor(by), Math.floor(brickW), Math.floor(brickH), brickRows - j, canvasContext);
    }
  }

  return templist;
}

function updateAllBricks() {

  for (let i = 0; i < brickCols; i++) {
    for (let j = 0; j < brickRows; j++) {

      bricks[i][j].update();
    }
  }

}

function didBallHitBrick(brick) { // theres some issues here idk
  if ((ball.x > brick.x + ball.radius) && (ball.x < brick.x + brick.w + ball.radius) && (ball.y > brick.y + ball.radius) && (ball.y < brick.y + ball.radius + brick.h)) {
    brick.hits += 1;
    return true;
  }
  return false;
}

class brickGame extends gameObject {
  constructor(paddle, ball, brickList, name) {
    super(paddle, ball, brickList, name);
    this.started = false;
    this.gameOver = false;
  }

  runGame() {
    canvasContext.beginPath();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.closePath();

    if (!this.started) {
      this.started = checkAnyKeypress();
      console.log('no keys pressed yet for brick');
      ball.update();
      paddle.update();
      updateAllBricks();
      return;
    }
    super.runGame();
    if (this.gameOver) {
      drawText("GAME OVER: YOU LOST", 20, canvas.height / 2);
      return;
    }
    this.gameOver = ballPhysics();
    paddleHandler();
    ball.update();
    paddle.update();
    updateAllBricks();

  }
}

// object instantiation
let ball = new Ball(ballX, ballY, 0, 0, ballR, canvasContext);
let paddle = new Drawable(paddleX, paddleY, paddleW, paddleH, canvasContext);
let bricks = generateBricks();
const playBrick = new brickGame(paddle, ball, 0, "brick");

// ! this is non game code
function drawText(text, xpos, ypos, font = 'bold 12px Arial') {
  canvasContext.font = font;
  canvasContext.fillStyle = 'black';
  canvasContext.fillText(text, xpos, ypos);
}

function powerOn() {
  videoLen = 5.1 * 1000;
  console.log('power on');
  startSequence();
  buttonTouchOrClick();
  gameOn = true;
};

function startSequence() {
  video.load();
  video.play();
};

// ! i dont think i need this function but idk
function resetActionKeys() {
  temp = Object.keys(action_keys);
  temp.forEach(element => {
    action_keys[element].pressed = false;
  });
};

function powerOff() {
  console.log('power off');
  canvasContext.beginPath();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.closePath();

  video.classList.remove("hide");
  resetActionKeys()
  gameOn = false;
  videoHasEnded = false;
  playBrick.started = false;
  playBrick.gameOver = false;
  ball = new Ball(ballX, ballY, 0, 0, ballR, canvasContext);
  paddle = new Drawable(paddleX, paddleY, paddleW, paddleH, canvasContext);
  bricks = generateBricks();

  video.load();

};

function runBrowserBoy() {
  video.addEventListener("ended", (event) => {
    console.log("Video stopped either because it has finished playing or no further data is available.");
    video.classList.add("hide");

    canvasContext.beginPath();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.closePath();
    videoHasEnded = true;
  });

  if (videoHasEnded) {
    playBrick.runGame();
  }

};

// ! this code runs everything
// TODO: reset all vars upon power off
// TODO: menu


document.querySelector('.power-button').addEventListener('click', function (event) {
  event.preventDefault();
  var target = document.querySelector('.gameboy');
  if (target.classList.contains('power-on')) {
    target.classList.remove('power-on');
    powerOff();
  } else {
    target.classList.add('power-on');
    powerOn();
  }
});

function init() {
  window.requestAnimationFrame(init)
  if (!gameOn) { // console.log("game is not on")
    return;
  }
  runBrowserBoy();
}


window.requestAnimationFrame(init);