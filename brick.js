class brickGame extends gameObject {
    constructor(paddle, ball, brickList, name ){
        super(paddle, ball, brickList, name);
    }

}

const paddle = new Drawable(50,50,10,10,1);
const playBrick = new brickGame(paddle,0,0, "brick");
playBrick.runGame();
paddle.update(canvasContext);