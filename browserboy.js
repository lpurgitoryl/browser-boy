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

function log(msg) {

  const container = document.getElementById("log");
  container.textContent = `${msg} \n${container.textContent}`;

};
window.addEventListener('keydown', (event) => {
  if (!(event.key in action_keys)) {
    log("key has no action");
    return
  }
  action_keys[event.key].pressed = true;
  event.preventDefault();
  log(event.key + " keydown");
  log("this is the action key value " + action_keys[event.key].pressed );
});


window.addEventListener('keyup', (event) => {
  if (!(event.key in action_keys)) {
    log("key has no action");
    return
  }
  action_keys[event.key].pressed = false;
  event.preventDefault();
  log(event.key + " no longer pressed");
  log(event.key + " keyup");
  log("this is the action key value " + action_keys[event.key].pressed );
});

function handleStart(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    log(`target ${this.id} touch with id ${touches[i].identifier} started`);
  }

};

function handleEnd(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    log(`target ${this.id} touch with id ${touches[i].identifier} ended`);
  }
};

function handleDown(evt) {
  evt.preventDefault();
  log(`target ${this.id} mouse/click started`);
};

function handleUp(evt) {
  log(`target ${this.id} mouse/click ended`);
};

function buttonTouchOrClick(touchAndClickableIDs) {
  for (let i = 0; i < touchAndClickableIDs.length; i++) {
    document.getElementById(touchAndClickableIDs[i]).addEventListener("touchstart", handleStart);
    document.getElementById(touchAndClickableIDs[i]).addEventListener("touchend", handleEnd);

    document.getElementById(touchAndClickableIDs[i]).addEventListener("mouseup", handleUp);
    document.getElementById(touchAndClickableIDs[i]).addEventListener("mousedown", handleDown);
    log(touchAndClickableIDs[i]);
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
  constructor(x, y, w, h, frameRate, canvasContext) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.frameRate = frameRate;
    this.ctx = canvasContext;
  }

  // A method used to draw the drawable as a rect.
  draw() {
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.fill();

  }

  update(ctx) {
    this.draw();
  }

};

// playable is a single drawable instance, enemyList is a list of drawable enemys
// configs is a 
class gameObject {
  constructor(playable, enemyList, objectList, gameName) {
    this.playable = playable
    this.enemyList = enemyList;
    this.objectList = objectList;
    this.gameName = gameName;
  };

  runGame() {
    log("running: " + this.gameName);
  }

};

// ! here is the brick game instantiation
class brickGame extends gameObject {
  constructor(paddle, ball, brickList, name) {
    super(paddle, ball, brickList, name);
  }

}

const paddle = new Drawable( canvas.width / 2, canvas.height - 15 , canvas.width / 5 , 5, 1, canvasContext);


function paddleMoveRight() {
  paddle.x += 10;
  log('paddle moved right');
}

function paddleMoveLeft() {
  paddle.x -= 10;
  log('paddle moved left');
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
    log( "this is the key being checked" + element)
    log("this is the value " + action_keys[element].pressed)
    if (action_keys[element].pressed) {
      paddleAction[element].func();
      log('key action for paddle')
    }
  });

};


const playBrick = new brickGame(paddle, 0, 0, "brick");
// ! this is helper code
function drawText(text, xpos, ypos, font = 'bold 12px Arial') {
  canvasContext.font = font;
  canvasContext.fillStyle = 'black';
  canvasContext.fillText(text, xpos, ypos);
}
// TODO: uncomment start sequence when done with main menu and game
function powerOn() {
  videoLen = 5.1 * 1000;
  log('power on');
  // startSequence();
  buttonTouchOrClick(touchAndClickableIDs);
  gameOn = true;
};

// ! i dont think i need this function but idk
function resetActionKeys(){
  temp = Object.keys(action_keys);
  temp.forEach(element => {
    log( "this is the key being reset" + element);
    log("this is the value before" + action_keys[element].pressed);
    action_keys[element].pressed = false;
    log("this is the value after" + action_keys[element].pressed);
  });
}
function powerOff() {
  log('power off');
  // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  video.classList.remove("hide");
  resetActionKeys()
  gameOn = false;

};

function runBrowserBoy() {
  // TODO: uncooment the ended listener when finished with game and menu and the start sequence in poweron()
  // video.addEventListener("ended", (event) => {
  log("Video stopped either because it has finished playing or no further data is available.");
  video.classList.add("hide");

  canvasContext.beginPath();
  canvasContext.clearRect(0,0,canvas.width, canvas.height);
  drawText("hello", 150, 60);
  drawText("wassup", 0, 40);
  // mainMenu();
  // brickGame();
  // });
  playBrick.runGame();
  paddleHandler();
  paddle.update();
  canvasContext.closePath();

};

// ! this code runs everything

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
  log("this is the game flag " + gameOn)
  if (!gameOn) {
    log("game is not on")
    return;
  } 
  runBrowserBoy();
  
}


window.requestAnimationFrame(init)