import { expect } from 'chai';
import ShyDog from './task';

describe('ShyDog', () => {
    it('собачка записывает свой вес и возвращает вес в расчете (weight/2) - 1', () => {
        const dog = new ShyDog();
        dog.weight = 40;
        expect(dog.weight).to.be.equal(19);
    });
    it('собачка не умеет округлять, — только делить и вычитать', () => {
        const dog = new ShyDog();
        dog.weight = 7;
        expect(dog.weight).to.be.equal(2.5);
    });
    it('если собачка весит 3, то возвращает 1', () => {
        const dog = new ShyDog();
        dog.weight = 3;
        expect(dog.weight).to.be.equal(1);
    });
    it('если собачка весит мало, то возвращает 1', () => {
        const dog = new ShyDog();
        dog.weight = 2;
        expect(dog.weight).to.be.equal(1);
    });
    it('если о весе собачки неизвестно, то возвращается 1', () => {
        const dog = new ShyDog();
        expect(dog.weight).to.be.equal(1);
    });
});
