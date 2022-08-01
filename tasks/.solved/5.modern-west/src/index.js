import Card from './Card.js';
import Game from './Game.js';
import TaskQueue from './TaskQueue.js';
import {setSpeedRate as setGameSpeedRate} from './SpeedRate.js';

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


class Creature extends Card {
    constructor(name, maxPower, image) {
        super(name, maxPower, image);
    }

    get currentPower() {
        return this._currentPower;
    }

    set currentPower(value) {
        this._currentPower = Math.min(value, this.maxPower);
    }

    getDescriptions() {
        const descriptions = super.getDescriptions();
        descriptions.unshift(getCreatureDescription(this));
        return descriptions;
    }
}


// Основа для утки.
class Duck extends Creature {
    constructor(name, maxPower, image) {
        super(name || 'Мирная утка', maxPower || 2, image);
    }

    quacks() {
        console.log('quack');
    }

    swims() {
        console.log('float: both;');
    }
}


// Основа для собаки.
class Dog extends Creature {
    constructor(name, maxPower, image) {
        super(name || 'Пес-бандит', maxPower || 3, image);
    }
}


// const seriffStartDeck = [
//     new Duck(),
//     new Duck(),
//     new Duck(),
// ];
// const banditStartDeck = [
//     new Dog(),
// ];


class Lad extends Dog {
    constructor() {
        super('Браток', 2);
    }

    static getBonus() {
        const inGameCount = this.getInGameCount();
        return inGameCount * (inGameCount + 1) / 2;
    }

    static getInGameCount() {
        return this.inGameCount || 0;
    }

    static setInGameCount(value) {
        this.inGameCount = value;
    }

    getDescriptions() {
        const result = super.getDescriptions();
        if (Lad.prototype.hasOwnProperty('modifyDealedDamageToCreature')
            || Lad.prototype.hasOwnProperty('modifyTakenDamage')) {
            result.unshift('Чем их больше, тем они сильнее');
        }
        return result;
    }

    modifyDealedDamageToCreature(value, toCard, gameContext, continuation) {
        this.view.signalAbility(() => {
            const damage = value + Lad.getBonus();
            continuation(damage);
        });
    }

    modifyTakenDamage(value, fromCard, gameContext, continuation) {
        this.view.signalAbility(() => {
            const damage = value - Lad.getBonus();
            continuation(damage);
        });
    }

    doAfterComingIntoPlay(gameContext, continuation) {
        super.doAfterComingIntoPlay(gameContext, () => {
            Lad.setInGameCount(Lad.getInGameCount() + 1);
            continuation();
        });
    }

    doBeforeRemoving(continuation) {
        super.doBeforeRemoving(() => {
            Lad.setInGameCount(Lad.getInGameCount() - 1);
            continuation();
        });
    }
}


// const seriffStartDeck = [
//     new Duck(),
//     new Duck(),
//     new Duck(),
// ];
// const banditStartDeck = [
//     new Lad(),
//     new Lad(),
// ];


class Rogue extends Creature {
    constructor() {
        super('Изгой', 2);
    }

    getDescriptions() {
        const descriptions = super.getDescriptions();
        descriptions.unshift('Отнимает способности');
        return descriptions;
    }

    doBeforeAttack(gameContext, continuation) {
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
    }
}


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


class Brewer extends Duck {
    constructor() {
        super('Пивовар', 2);
    }

    getDescriptions() {
        const descriptions = super.getDescriptions();
        descriptions.unshift('Увеличивает здоровье всех уток каждый ход');
        return descriptions;
    }

    doBeforeAttack(gameContext, continuation) {
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
    }
}


// const seriffStartDeck = [
//     new Duck(),
//     new Brewer(),
// ];
// const banditStartDeck = [
//     new Dog(),
//     new Dog(),
//     new Dog(),
//     new Dog(),
// ];


class Nemo extends Creature {
    constructor() {
        super('Немо', 4);
    }

    getDescriptions() {
        const descriptions = super.getDescriptions();
        descriptions.unshift('Становится другим');
        return descriptions;
    }

    doBeforeAttack(gameContext, continuation) {
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
    }
}


const seriffStartDeck = [
    new Nemo(),
];
const banditStartDeck = [
    new Brewer(),
    new Brewer(),
];


// Создание игры.
const game = new Game(seriffStartDeck, banditStartDeck);

// Глобальный объект, позволяющий управлять скоростью всех анимаций.
setGameSpeedRate(1);

// Запуск игры.
game.play(false, (winner) => {
    alert('Победил ' + winner.name);
});
