// ! these are the global consts free to use anywhere 
const action_keys = {
  a: { pressed: false },
  d: { pressed: false },
  c: { pressed: false },
  v: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },

};

const touchAndClickableIDs = ['controller_up', 'controller_down', 'controller_left', 'controller_right',
  'controller_a', 'controller_b', 'controller_start', 'controller_select'];

const canvas = document.getElementById("mainCanvas");
const canvasContext = canvas.getContext("2d");
let gameOn = false;
// Uncomment function below for on screen log
// function log(msg) {

//   const container = document.getElementById("log");
//   container.textContent = `${msg} \n${container.textContent}`;

// };

window.addEventListener('keydown', (event) => {
  if (!(event.key in action_keys)) {
    console.log("key has no action");
    return
  }
  action_keys[event.key].pressed = true;
  event.preventDefault();
  console.log(event.key + " keydown");
  console.log("this is the action key value " + action_keys[event.key].pressed );
});


window.addEventListener('keyup', (event) => {
  if (!(event.key in action_keys)) {
    console.log("key has no action");
    return
  }
  action_keys[event.key].pressed = false;
  event.preventDefault();
  console.log(event.key + " no longer pressed");
  console.log(event.key + " keyup");
  console.log("this is the action key value " + action_keys[event.key].pressed );
});

function handleStart(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    console.log(`target ${this.id} touch with id ${touches[i].identifier} started`);
  }

};

function handleEnd(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    console.log(`target ${this.id} touch with id ${touches[i].identifier} ended`);
  }
};

function handleDown(evt) {
  evt.preventDefault();
  console.log(`target ${this.id} mouse/click started`);
};

function handleUp(evt) {
  console.log(`target ${this.id} mouse/click ended`);
};

function buttonTouchOrClick(touchAndClickableIDs) {
  for (let i = 0; i < touchAndClickableIDs.length; i++) {
    document.getElementById(touchAndClickableIDs[i]).addEventListener("touchstart", handleStart);
    document.getElementById(touchAndClickableIDs[i]).addEventListener("touchend", handleEnd);

    document.getElementById(touchAndClickableIDs[i]).addEventListener("mouseup", handleUp);
    document.getElementById(touchAndClickableIDs[i]).addEventListener("mousedown", handleDown);
    console.log(touchAndClickableIDs[i]);
  }
  console.log('listeners added')
};

function startSequence() {
  const video = document.getElementById("video")
  video.load()
  video.play()
};

//! here are the diffrent classes

// game can have a list of drawables, will have a gameOver , gameStart

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

// playable is a single drawable instance, enemyList is a list of drawable enemys

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

// ! here is the brick game instantiation
const deltaXPaddle = 2;

function paddleMoveRight() {
  if(paddle.w + paddle.x + deltaXPaddle < canvas.width)
    {paddle.x += deltaXPaddle;}
  console.log('paddle moved right');
}

function paddleMoveLeft() {
  if( paddle.x > 0)
      paddle.x -= deltaXPaddle;
  console.log('paddle moved left');
}

const paddleAction = {
  a: { func: false },
  d: { func: false },
  c: { func: false },
  v: { func: false },
  ArrowRight:  { func : paddleMoveRight },
  ArrowLeft: { func: paddleMoveLeft },
  ArrowUp: { func: false },
  ArrowDown: { func: false },

};

function paddleHandler() {
  temp = Object.keys(action_keys);
  temp.forEach(element => {
    console.log( "this is the key being checked" + element)
    console.log("this is the value " + action_keys[element].pressed)
    if (action_keys[element].pressed) {
      paddleAction[element].func();
      console.log('key action for paddle')
    }
  });

};

class Ball extends Drawable {
  constructor(x, y, w, h, radius, canvasContext){
    super(x, y, 0, 0, canvasContext);
    this.radius = radius;
    this.startAngle = 0
    this.endAngle = Math.PI * 2;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

}

var deltaXBall = 2;
var deltaYBall = -2;

function checkAnyKeypress(){
  temp = Object.keys(action_keys);
  flag = false;

  temp.forEach(element => {
    if (action_keys[element].pressed) {
      flag = true;
    }
  });

  return flag;
}

function ballPhysics(brick){
  // bounce off walls
  if( ball.x + deltaXBall < canvas.width - ball.radius) { // hasnt hit right wall yet
    ball.x += deltaXBall;
  } 
  if( ball.x + deltaXBall > canvas.width - ball.radius) { // hits right wall and changes direction
    deltaXBall = -deltaXBall;
    ball.x += deltaXBall;
  }
  if( ball.x + deltaXBall < 0 ) {  // hits left wall and changes direction
    deltaXBall = -deltaXBall;
    ball.x += deltaXBall;
  }

  if( ball.y + deltaYBall > 0 ) { // hasnt hit top
    ball.y += deltaYBall;
  }
  if( ball.y + deltaYBall < 0 ) { // hits top and changes direction
    deltaYBall = -deltaYBall;
    ball.y += deltaYBall;
  }
  if( ball.y + deltaYBall > canvas.height - ball.radius ) { // ball hits floor, sets gameOver to true
    return true;
  }

  if( (ball.y + deltaYBall > paddle.y - ball.radius ) && (ball.y < paddle.y - ball.radius + paddle.h) && (ball.x > paddle.x - ball.radius ) && (ball.x < paddle.x + paddle.w - ball.radius )  ) { // ball hits paddle but not floor and redirects
    deltaYBall = -deltaYBall;
    ball.y += deltaYBall;
  }
  if(didBallHitBrick(brick)){
    deltaYBall = -deltaYBall;
    ball.y += deltaYBall;
  }

  return false;
}
class Brick extends Drawable {
  constructor(x, y, w, h, maxHits, canvasContext){
    super(x, y, w, h, canvasContext);
    this.hits = 0;
    this.maxHits = maxHits;
  }

  update(){
    if(this.hits >= this.maxHits){
      this.ctx.beginPath();
      this.ctx.clearRect(this.x,this.y,this.w, this.h);
      this.ctx.closePath();
    } else {
      super.update();
    }
  }

};

function didBallHitBrick(brick){
  if ((ball.x > brick.x - ball.radius) && (ball.x < brick.x + brick.w - ball.radius) && (ball.y > brick.y - ball.radius) && (ball.y < brick.y - ball.radius + brick.h)){
    brick.hits += 1;
    drawText('hit', 50,50);
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

  runGame(){
    if(!this.started){
      this.started = checkAnyKeypress();
      console.log('no keys pressed yet for brick');
      ball.update();
      paddle.update();
      bricks.update();
      return;
    }
    super.runGame();
    if(this.gameOver){
      drawText("GAME OVER: YOU LOST", 20, canvas.height/2);
      return;
    }
    this.gameOver = ballPhysics(bricks);
    paddleHandler();
    ball.update();
    paddle.update();
    bricks.update();
    
  }
}

// intial paddle values
const brickRows = 3;
const brickOffset = 5; // in px
const numBricksPerRow = 6;


const paddleY = canvas.height - 15; 
const paddleX = canvas.width / 2;
const paddleW = canvas.width / 5;
const paddleH = 5;

const ballX = canvas.width / 2;
const ballY = canvas.height /2;
const ballR = 5;

const ball = new Ball(ballX, ballY, 0, 0, ballR, canvasContext);
const paddle = new Drawable( paddleX , paddleY , paddleW , paddleH, canvasContext);
const bricks = new Brick( 10, 50 , paddleW / 2 , paddleH * 2, 2, canvasContext);
const playBrick = new brickGame(paddle, ball, 0, "brick");

// ! this is helper code
function drawText(text, xpos, ypos, font = 'bold 12px Arial') {
  canvasContext.font = font;
  canvasContext.fillStyle = 'black';
  canvasContext.fillText(text, xpos, ypos);
}
// TODO: uncomment start sequence when done with main menu and game
function powerOn() {
  videoLen = 5.1 * 1000;
  console.log('power on');
  // startSequence();
  buttonTouchOrClick(touchAndClickableIDs);
  gameOn = true;
};

// ! i dont think i need this function but idk
function resetActionKeys(){
  temp = Object.keys(action_keys);
  temp.forEach(element => {
    console.log( "this is the key being reset" + element);
    console.log("this is the value before" + action_keys[element].pressed);
    action_keys[element].pressed = false;
    console.log("this is the value after" + action_keys[element].pressed);
  });
}
function powerOff() {
  console.log('power off');
  // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  video.classList.remove("hide");
  resetActionKeys()
  gameOn = false;

};

function runBrowserBoy() {
  // TODO: uncooment the ended listener when finished with game and menu and the start sequence in poweron()
  // video.addEventListener("ended", (event) => {
    console.log("Video stopped either because it has finished playing or no further data is available.");
  video.classList.add("hide");

  canvasContext.beginPath();
  canvasContext.clearRect(0,0,canvas.width, canvas.height);
  canvasContext.closePath();
  playBrick.runGame();
  // });
  
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
    canvasContext.beginPath();
    canvasContext.clearRect(0,0,canvas.width, canvas.height);
    canvasContext.closePath();
  } else {
    target.classList.add('power-on');
    powerOn();
  }
});

function init() {
  window.requestAnimationFrame(init)
  console.log("this is the game flag " + gameOn)
  if (!gameOn) {
    console.log("game is not on")
    return;
  } 
  runBrowserBoy();
  
}


window.requestAnimationFrame(init)