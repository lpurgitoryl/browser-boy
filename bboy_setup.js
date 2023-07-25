const action_keys = {
    a: { pressed: false},
    d: { pressed: false},
    c: {pressed: false},
    v: {pressed: false},
    ArrowRight: { pressed : false},
    ArrowLeft: { pressed : false},
    ArrowUp: { pressed : false},
    ArrowDown: { pressed : false},

};

const touchAndClickableIDs = ['controller_up','controller_down', 'controller_left', 'controller_right',
    'controller_a', 'controller_b', 'controller_start', 'controller_select'];

const canvas = document.getElementById("mainCanvas");
const canvasContext = canvas.getContext("2d");
let gameOn = false;

function log(msg) {

    const container = document.getElementById("log");
    container.textContent = `${msg} \n${container.textContent}`;

    };
    

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'a':
            action_keys.a.pressed = true;
            event.preventDefault();
        break;
        case 'd':
            action_keys.d.pressed = true;
            event.preventDefault();
        break;
        //
        case 'c':
            action_keys.c.pressed = true;
            event.preventDefault();
        break;
        case 'v':
            action_keys.v.pressed = true;
            event.preventDefault();
        break;
        //
        case 'ArrowRight':
            action_keys.ArrowRight.pressed = true;
            event.preventDefault();
        break;
        case 'ArrowLeft':
            action_keys.ArrowLeft.pressed = true;
            event.preventDefault();
        break;
        case 'ArrowUp':
            action_keys.ArrowUp.pressed = true;
            event.preventDefault();
        break;
        case 'ArrowDown':
            action_keys.ArrowDown.pressed = true;
            event.preventDefault();
        break;
    }
    log(event.key +  " pressed");
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'a':
            action_keys.a.pressed = false;
            event.preventDefault();
        break;
        case 'd':
            action_keys.d.pressed = false;
            event.preventDefault();
        break;
        //
        case 'c':
            action_keys.c.pressed = false;
            event.preventDefault();
        break;
        case 'v':
            action_keys.v.pressed = false;
            event.preventDefault();
        break;
        //
        case 'ArrowRight':
            action_keys.ArrowRight.pressed = false;
            event.preventDefault();
        break;
        case 'ArrowLeft':
            action_keys.ArrowLeft.pressed = false;
            event.preventDefault();
        break;
        case 'ArrowUp':
            action_keys.ArrowUp.pressed = false;
            event.preventDefault();
        break;
        case 'ArrowDown':
            action_keys.ArrowDown.pressed = false;
            event.preventDefault();
        break;

    }
    log(event.key + " keyup");
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

function handleDown(evt){
    evt.preventDefault();
    log(`target ${this.id} mouse/click started`);
};

function handleUp(evt){
    log(`target ${this.id} mouse/click ended`);
};

function buttonTouchOrClick(touchAndClickableIDs){
    for (let i = 0; i < touchAndClickableIDs.length ; i ++){
        document.getElementById(touchAndClickableIDs[i]).addEventListener("touchstart", handleStart); 
        document.getElementById(touchAndClickableIDs[i]).addEventListener("touchend", handleEnd);

        document.getElementById(touchAndClickableIDs[i]).addEventListener("mouseup", handleUp); 
        document.getElementById(touchAndClickableIDs[i]).addEventListener("mousedown", handleDown);
        log(touchAndClickableIDs[i]);
    }
    console.log('listeners added')
};



