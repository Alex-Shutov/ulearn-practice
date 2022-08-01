//#region Task
function Cat() {}

Cat.prototype.sayMeow = () => {
    return 'Meow!   Meow!   Meow!';
};

Cat.prototype.getPet = () => {
    return 'Purrrrrr';
};

function Leopard() {}
//#endregion Task

export default {
    Cat,
    Leopard
};
