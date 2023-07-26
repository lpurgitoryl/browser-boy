function drawText(text,  xpos, ypos, font = 'bold 12px Arial') {
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

function powerOff() {
  log('power off');
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  video.classList.remove("hide");
  gameOn = false;

};

function mainMenu() {


}

// function brickGame(){


// };

function runGame() {
  // TODO: uncooment the ended listener when finished with game and menu and the start sequence in poweron()
  // video.addEventListener("ended", (event) => {
    log("Video stopped either because it has finished playing or no further data is available.");
    video.classList.add("hide");
    drawText("hello",150, 60 );
    drawText("wassup", 0,  40);
    mainMenu();
    // brickGame();
  // });

};

document.querySelector('.power-button').addEventListener('click', function (event) {
  event.preventDefault();
  var target = document.querySelector('.gameboy');
  if (target.classList.contains('power-on')) {
    target.classList.remove('power-on');
    powerOff();
  } else {
    target.classList.add('power-on');
    powerOn();
    runGame();
  }
});

