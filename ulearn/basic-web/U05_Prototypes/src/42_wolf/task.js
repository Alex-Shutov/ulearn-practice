//#region Task
class Dog {
    sayWoof() {
        return 'Woof-Woof';
    }

    getFood() {
        this.fullness = (this.fullness || 0) + 25;
    }
}

class Wolf extends Dog {
    constructor(rank, isArcticWolf) {
        super();
        this.rank = rank;
        this.isArcticWolf = isArcticWolf;
    }

    hunt() {
        this.fullness = (this.fullness || 0) + 25;
    }
}
//#endregion Task

export default {
    Dog,
    Wolf
};
