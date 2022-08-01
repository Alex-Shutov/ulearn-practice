// Отвечает является ли карта уткой.
function isDuck(card) {
    return card && card.quacks && card.swims;
}

// Отвечает является ли карта собакой.
function isDog(card) {
    return card instanceof Dog;
}

// Дает описание существа по схожести с утками и собаками
function getCreatureDescription(card) {
    if (isDuck(card) && isDog(card)) {
        return 'Утка-Собака';
    }
    if (isDuck(card)) {
        return 'Утка';
    }
    if (isDog(card)) {
        return 'Собака';
    }
    return 'Существо';
}


// // Основа для утки.
// function Duck() {
//     this.quacks = () => { console.log('quack') };
//     this.swims = () => { console.log('float: both;') };
// }
//
//
// // Основа для собаки.
// function Dog() {
// }


// // Колода Шерифа, нижнего игрока.
// const seriffStartDeck = [
//     new Card('Мирный житель', 2),
//     new Card('Мирный житель', 2),
//     new Card('Мирный житель', 2),
// ];
//
// // Колода Бандита, верхнего игрока.
// const banditStartDeck = [
//     new Card('Бандит', 3),
// ];


function Creature(name, maxPower, image) {
    Card.call(this, name, maxPower, image);

    let currentPower = maxPower;
    Object.defineProperty(this, 'currentPower', {
        get: function() { return currentPower; },
        set: function(newValue) {
            currentPower = Math.min(newValue, this.maxPower);
        },
        enumerable: true,
        configurable: true
    });
}

Creature.prototype = Object.create(Card.prototype);
Creature.prototype.constructor = Creature;

Creature.prototype.getDescriptions = function () {
    const result = Card.prototype.getDescriptions.call(this);
    result.unshift(getCreatureDescription(this));
    return result;
};


// const seriffStartDeck = [
//     new Creature('Мирный житель', 2),
//     new Creature('Мирный житель', 2),
//     new Creature('Мирный житель', 2),
// ];
// const banditStartDeck = [
//     new Creature('Бандит', 3),
// ];



function Duck(name, maxPower, image) {
    Creature.call(this, name || 'Мирная утка', maxPower || 2, image);
}

Duck.prototype = Object.create(Creature.prototype);
Duck.prototype.constructor = Duck;

Duck.prototype.quacks = function () { console.log('quack') };
Duck.prototype.swims = function () { console.log('float: both;') };


function Dog(name, maxPower, image) {
    Creature.call(this, name || 'Пес-бандит', maxPower || 3, image);
}

Dog.prototype = Object.create(Creature.prototype);
Dog.prototype.constructor = Dog;


// const seriffStartDeck = [
//     new Duck(),
//     new Duck(),
//     new Duck(),
// ];
// const banditStartDeck = [
//     new Dog(),
// ];


function Trasher() {
    Dog.call(this, 'Громила', 5);
}

Trasher.prototype = Object.create(Dog.prototype);
Trasher.prototype.constructor = Trasher;

Trasher.prototype.modifyTakenDamage = function (value, fromCard, gameContext, continuation) {
    this.view.signalAbility(() => {
        continuation(value - 1);
    });
};

Trasher.prototype.getDescriptions = function () {
    const result = Dog.prototype.getDescriptions.call(this);
    result.unshift('Получает меньше урона');
    return result;
};


// const seriffStartDeck = [
//     new Duck(),
//     new Duck(),
//     new Duck(),
//     new Duck(),
// ];
// const banditStartDeck = [
//     new Trasher(),
// ];


function Gatling() {
    Creature.call(this, 'Гатлинг', 6);
}

Gatling.prototype = Object.create(Creature.prototype);
Gatling.prototype.constructor = Gatling;

Gatling.prototype.getDescriptions = function () {
    const result = Creature.prototype.getDescriptions.call(this);
    result.unshift('Стреляет по всем противникам',);
    return result;
};

Gatling.prototype.attack = function (gameContext, continuation) {
    const taskQueue = new TaskQueue();

    const {currentPlayer, oppositePlayer, position, updateView} = gameContext;

    taskQueue.push(onDone => this.view.showAttack(onDone));
    for (const card of oppositePlayer.table) {
        if (card) {
            taskQueue.push(onDone => {
                this.dealDamageToCreature(2, card, gameContext, onDone);
            });
        }
    }

    taskQueue.continueWith(continuation);
};


// const seriffStartDeck = [
//     new Duck(),
//     new Duck(),
//     new Duck(),
//     new Gatling(),
// ];
// const banditStartDeck = [
//     new Trasher(),
//     new Dog(),
//     new Dog(),
// ];


function Lad() {
    Dog.call(this, 'Браток', 2);
}

Lad.prototype = Object.create(Dog.prototype);
Lad.prototype.constructor = Lad;

Lad.inGameCount = 0;

Lad.getBonus = function () {
    return this.inGameCount * (this.inGameCount + 1) / 2;
};

Lad.prototype.getDescriptions = function () {
    const result = Dog.prototype.getDescriptions.call(this);
    if (Lad.prototype.hasOwnProperty('modifyDealedDamageToCreature')
        || Lad.prototype.hasOwnProperty('modifyTakenDamage')) {
        result.unshift('Чем их больше, тем они сильнее');
    }
    return result;
};

Lad.prototype.modifyDealedDamageToCreature = function (value, toCard, gameContext, continuation) {
    this.view.signalAbility(() => {
        const damage = value + Lad.getBonus();
        continuation(damage);
    });
};

Lad.prototype.modifyTakenDamage = function (value, fromCard, gameContext, continuation) {
    this.view.signalAbility(() => {
        const damage = value - Lad.getBonus();
        continuation(damage);
    });
};

Lad.prototype.doAfterComingIntoPlay = function (gameContext, continuation) {
    Lad.inGameCount++;
    continuation();
};

Lad.prototype.doBeforeRemoving = function (continuation) {
    Lad.inGameCount--;
    continuation();
};


// const seriffStartDeck = [
//     new Duck(),
//     new Duck(),
//     new Duck(),
//     new Gatling(),
// ];
// const banditStartDeck = [
//     new Lad(),
//     new Lad(),
//     new Lad(),
// ];


function Rogue() {
    Creature.call(this, 'Изгой', 2);
}

Rogue.prototype = Object.create(Creature.prototype);
Rogue.prototype.constructor = Rogue;

Rogue.prototype.getDescriptions = function () {
    const result = Creature.prototype.getDescriptions.call(this);
    result.unshift('Отнимает способности');
    return result;
};

Rogue.prototype.doBeforeAttack = function (gameContext, continuation) {
    const {currentPlayer, oppositePlayer, position, updateView} = gameContext;
    const oppositeCard = oppositePlayer.table[position];
    const oppositePrototype = oppositeCard && Object.getPrototypeOf(oppositeCard);
    if (!oppositePrototype) {
        continuation();
        return;
    }

    const toStealProperties = Object.getOwnPropertyNames(oppositePrototype)
        .filter(p => {
            return p === 'modifyDealedDamageToCreature'
                || p === 'modifyDealedDamageToPlayer'
                || p === 'modifyTakenDamage';
        });
    if (toStealProperties.length === 0) {
        continuation();
        return;
    }

    this.view.signalAbility(() => {
        for (const toStealProperty of toStealProperties) {
            this[toStealProperty] = oppositePrototype[toStealProperty];
            delete oppositePrototype[toStealProperty];
        }

        updateView();

        continuation();
    });
};


// const seriffStartDeck = [
//     new Duck(),
//     new Duck(),
//     new Duck(),
//     new Rogue(),
// ];
// const banditStartDeck = [
//     new Lad(),
//     new Lad(),
//     new Lad(),
// ];


function Cousin() {
    Dog.call(this, 'Кузен', 3);
}

Cousin.prototype = Object.create(Dog.prototype);
Cousin.prototype.constructor = Cousin;

Cousin.prototype.getDescriptions = function () {
    const result = Dog.prototype.getDescriptions.call(this);
    result.unshift('Дает +1 к защите всем собакам');
    return result;
};

Cousin.prototype.doAfterComingIntoPlay = function (gameContext, continuation) {
    this.view.signalAbility(() => {
        Dog.prototype.modifyTakenDamage = function (value, toCard, gameContext, continuation) {
            this.view.signalAbility(() => {
                continuation(value - 1);
            });
        };

        continuation();
    });
};

Cousin.prototype.doBeforeRemoving = function (continuation) {
    this.view.signalAbility(() => {
        delete Dog.prototype.modifyTakenDamage;
        continuation();
    });
};


// const seriffStartDeck = [
//     new Rogue(),
//     new Duck(),
//     new Duck(),
//     new Duck(),
//     new Duck(),
// ];
// const banditStartDeck = [
//     new Cousin(),
//     new Dog(),
//     new Dog(),
// ];


function Brewer() {
    Duck.call(this, 'Пивовар', 2);
}

Brewer.prototype = Object.create(Duck.prototype);
Brewer.prototype.constructor = Brewer;

Brewer.prototype.getDescriptions = function () {
    const result = Duck.prototype.getDescriptions.call(this);
    result.unshift('Увеличивает здоровье всех уток каждый ход');
    return result;
};

Brewer.prototype.doBeforeAttack = function (gameContext, continuation) {
    const {currentPlayer, oppositePlayer, position, updateView} = gameContext;

    const taskQueue = new TaskQueue();

    taskQueue.push(onDone => this.view.signalAbility(onDone));
    for (const card of currentPlayer.table.concat(oppositePlayer.table)) {
        if (isDuck(card)) {
            taskQueue.push(onDone => {
                card.view.signalHeal(() => {
                    card.maxPower += 1;
                    card.currentPower += 2;
                    card.updateView();
                    onDone();
                })
            });
        }
    }

    taskQueue.continueWith(continuation);
};


// const seriffStartDeck = [
//     new Duck(),
//     new Brewer(),
// ];
// const banditStartDeck = [
//     new Dog(),
//     new Cousin(),
//     new Dog(),
//     new Dog(),
// ];


function PseudoDuck() {
    Dog.call(this, 'Псевдоутка');
}

PseudoDuck.prototype = Object.create(Dog.prototype);
PseudoDuck.prototype.constructor = PseudoDuck;

PseudoDuck.prototype.quacks = function () { console.log('quack') };
PseudoDuck.prototype.swims = function () { console.log('float: both;') };

PseudoDuck.prototype.getDescriptions = function () {
    const result = Dog.prototype.getDescriptions.call(this);
    result.unshift('Очень похож на утку');
    return result;
};


// const seriffStartDeck = [
//     new Duck(),
//     new Brewer(),
//     new Duck(),
// ];
// const banditStartDeck = [
//     new PseudoDuck(),
//     new Cousin(),
//     new PseudoDuck(),
// ];


function SlyGoose() {
    Creature.call(this, 'Хитрый гусь', 2);
}

SlyGoose.prototype = Object.create(Creature.prototype);
SlyGoose.prototype.constructor = SlyGoose;

SlyGoose.prototype.modifyDealedDamageToCreature = function (value, toCard, gameContext, continuation) {
    if (toCard instanceof  PseudoDuck) {
        this.view.signalAbility(() => {
            continuation(2*value);
        });
        return;
    }
    continuation(value);
};

SlyGoose.prototype.getDescriptions = function () {
    const result = Creature.prototype.getDescriptions.call(this);
    result.unshift('Наносит удвоенный урон Псевдоутке');
    return result;
};


// const seriffStartDeck = [
//     new SlyGoose(),
//     new SlyGoose(),
//     new SlyGoose(),
// ];
// const banditStartDeck = [
//     new PseudoDuck(),
//     new Dog(),
//     new PseudoDuck(),
// ];


function Sniper() {
    Creature.call(this, 'Снайпер', 2);
}

Sniper.prototype = Object.create(Creature.prototype);
Sniper.prototype.constructor = Sniper;

Sniper.prototype.modifyDealedDamageToCreature = function (value, toCard, gameContext, continuation) {
    this.view.signalAbility(() => {
        continuation(value*3);
    });
};

Sniper.prototype.modifyDealedDamageToPlayer = function (value, gameContext, continuation) {
    this.view.signalAbility(() => {
        continuation(value*3);
    });
};

Sniper.prototype.modifyTakenDamage = function (value, fromCard, gameContext, continuation) {
    this.view.signalAbility(() => {
        continuation(Math.floor(value/3));
    });
};

Sniper.prototype.getDescriptions = function () {
    const result = Creature.prototype.getDescriptions.call(this);
    result.unshift('Неуловимый и смертоносный');
    return result;
};


// const seriffStartDeck = [
//     new Duck(),
//     new Gatling(),
//     new Brewer(),
//     new Duck(),
// ];
// const banditStartDeck = [
//     new Sniper(),
//     new Sniper(),
// ];


function Nemo() {
    Creature.call(this, 'Немо', 4);
}

Nemo.prototype = Object.create(Creature.prototype);
Nemo.prototype.constructor = Nemo;

Nemo.prototype.getDescriptions = function () {
    const result = Creature.prototype.getDescriptions.call(this);
    result.unshift('Становится другим');
    return result;
};

Nemo.prototype.doBeforeAttack = function (gameContext, continuation) {
    const {currentPlayer, oppositePlayer, position, updateView} = gameContext;
    const oppositeCard = oppositePlayer.table[position];
    if (!oppositeCard) {
        continuation();
        return;
    }

    this.view.signalAbility(() => {
        Object.setPrototypeOf(this, Object.getPrototypeOf(oppositeCard));
        updateView();

        Object.getPrototypeOf(this).doBeforeAttack.call(this, gameContext, continuation);
    });
};


const seriffStartDeck = [
    new Nemo(),
    new Nemo(),
];
const banditStartDeck = [
    new Brewer(),
    new Sniper(),
];


// Создание игры.
const game = new Game(seriffStartDeck, banditStartDeck);

// Глобальный объект, позволяющий управлять скоростью всех анимаций.
SpeedRate.set(1);

// Запуск игры.
game.play(false, (winner) => {
    alert('Победил ' + winner.name);
});
