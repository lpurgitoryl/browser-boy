function draw() {
  canvasContext.font = 'bold 12px Arial';
  canvasContext.fillStyle = 'black';
  canvasContext.fillText("Hello World!", 0, 12);


}

function powerOn(){
  buttonTouchOrClick(touchAndClickableIDs);
  draw();
  log('power on');
};
function powerOff(){
  log('power off');
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
};

document.querySelector('.power-button').addEventListener('click', function(event) {
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

