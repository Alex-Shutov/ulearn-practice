//#region Task
function Animal(title, legCount) {
    this.title = title;
    this.legCount = legCount;
}

function Lizard() {
    Animal.call(this, 'Lizard', 4);
    this.hasTail = true;
}

Object.setPrototypeOf(Lizard.prototype, Animal.prototype);

Lizard.prototype.dropTail = function() {
    this.hasTail = false;
};

Lizard.prototype.wait = function() {
    this.hasTail = true;
};

function Student(name) {
    Animal.call(this, 'Homo Sapiens', 2);
    this.hasTail = true;
    this.name = name;
}

Object.setPrototypeOf(Student.prototype, Lizard.prototype);
//#endregion Task

export default {
    Lizard,
    Student
};
