import { expect } from 'chai';
import task from './task';
const { NorthReindeer, deer } = task;

describe('NorthReindeer', () => {
    it('конструктор записывает name и owner в соответствующие поля', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        expect(myReindeer.name).to.be.equal('Rudolf');
        expect(myReindeer.owner).to.be.equal('Veronika');
    });
    it('конструктор создает поле canSleepInSnow', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        expect(myReindeer.canSleepInSnow).to.be.equal(true);
    });
    it('конструктор создает поле habitat', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        expect(myReindeer.habitat).to.be.equal('tundra');
    });
    it('у северного оленя есть поле от обычного оленя', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        expect(myReindeer.hasHorns).to.be.equal(true);
    });
    it('у северного оленя есть метод от обычного оленя', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        expect(myReindeer.eatGrass()).to.be.equal('nom, nom');
    });
    it('у северного оленя прототип от обычного оленя', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        expect(myReindeer.__proto__).to.be.equal(deer);
    });
});
