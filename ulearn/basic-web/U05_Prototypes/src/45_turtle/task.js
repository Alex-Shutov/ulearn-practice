//#region Task
class Reptile {
    move() {
        this.speed = 1;
    }
    run() {
        this.speed = 2;
    }
}

class Turtle extends Reptile {
    constructor(livingInSea) {
        super();
        this.livingInSea = livingInSea;
    }

    run() {
        if (this.livingInSea) {
            super.move();
        } else {
            super.run();
        }
    }
}
//#endregion Task

export default {
    Reptile,
    Turtle
};
