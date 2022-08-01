import { expect } from 'chai';
import task from './task';
const { Dog, Wolf } = task;

describe('Wolf', () => {
    it('при создании волка у него есть ранг и флаг что волк полярный', () => {
        const wolf = new Wolf('alfa', false);
        expect(wolf.rank).to.be.equal('alfa');
        expect(wolf.isArcticWolf).to.be.equal(false);
    });
    it('при создании волка у него есть метод охоты', () => {
        const wolf = new Wolf('alfa', false);
        expect(wolf.hunt).to.exist;
    });
    it('при создании волка у него есть методы от собаки', () => {
        const wolf = new Wolf('alfa', false);
        expect(wolf.sayWoof).to.exist;
        expect(wolf.getFood).to.exist;
    });
    it('методы собаки принадлежат не волку', () => {
        const wolf = new Wolf('alfa', false);
        expect(wolf.hasOwnProperty('sayWoof')).to.be.equal(false);
        expect(wolf.hasOwnProperty('getFood')).to.be.equal(false);
    });
    it('при создании собаки у нее есть методы', () => {
        const dog = new Dog();
        expect(dog.sayWoof).to.exist;
        expect(dog.getFood).to.exist;
    });
    it('метод охоты меняет сытость волка', () => {
        const wolf = new Wolf('alfa', false);
        expect(wolf.fullness).not.exist;
        wolf.hunt();
        expect(wolf.fullness).to.be.equal(25);
        wolf.hunt();
        expect(wolf.fullness).to.be.equal(50);
    });
    it('метод getFood меняет сытость волка', () => {
        const wolf = new Wolf('alfa', false);
        expect(wolf.fullness).not.exist;
        wolf.getFood();
        expect(wolf.fullness).to.be.equal(25);
        wolf.getFood();
        expect(wolf.fullness).to.be.equal(50);
    });
    it('методы кормления работают независимо', () => {
        const wolf = new Wolf('alfa', false);
        const wolf2 = new Wolf('omega', true);
        expect(wolf.fullness).not.exist;
        expect(wolf2.fullness).not.exist;
        wolf.getFood();
        expect(wolf.fullness).to.be.equal(25);
        expect(wolf2.fullness).not.exist;
        wolf.getFood();
        expect(wolf.fullness).to.be.equal(50);
        expect(wolf2.fullness).not.exist;
    });
});
