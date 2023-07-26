// game can have a list of drawables, will have a gameOver , gameStart

class Drawable {
    constructor(x, y, w, h, frameRate ) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.frameRate = frameRate;
    }

    // A method used to draw the drawable as a rect.
    draw(ctx) {
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();

    }

    update(ctx){
        this.draw(ctx);
    }

};

// playable is a single drawable instance, enemyList is a list of drawable enemys
// configs is a 
class gameObject{
    constructor (playable, enemyList, objectList, gameName){
        this.playable = playable
        this.enemyList = enemyList;
        this.objectList = objectList;
        this.gameName = gameName;
    };

    runGame(){
        log("running: " + this.gameName);
    }

};