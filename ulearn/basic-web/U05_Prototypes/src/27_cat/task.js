//#region Task
function Cat() {}

Cat.prototype.sayMeow = () => {
    return 'Meow!   Meow!   Meow!';
};

Cat.prototype.getPet = () => {
    return 'Purrrrrr';
};

function Leopard() {}

Object.setPrototypeOf(Leopard.prototype, Cat.prototype);

Leopard.prototype.sayMeow = () => {
    return 'Roar!';
};

Leopard.prototype.getPet = function() {
    this.mood = 'счастлив';
    return Object.getPrototypeOf(Leopard.prototype).getPet();
};
//#endregion Task

export default {
    Cat,
    Leopard
};
