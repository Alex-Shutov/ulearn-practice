//#region Task
function Dog() {
    this.sayWoof = function() {
        return 'Woof-Woof';
    };

    this.getFood = function() {
        this.fullness = (this.fullness || 0) + 25;
    };
}

function Wolf(rank, isArcticWolf) {
    this.rank = rank;
    this.isArcticWolf = isArcticWolf;

    this.hunt = function() {
        this.fullness = (this.fullness || 0) + 25;
    };
}

Wolf.prototype = new Dog();
//#endregion Task

export default {
    Dog,
    Wolf
};
