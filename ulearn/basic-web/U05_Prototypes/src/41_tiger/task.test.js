import { expect } from 'chai';
import Tiger from './task';

describe('Tiger', () => {
    it('создает объект тигра', () => {
        const tiger = new Tiger('Tom', 'amur');
        expect(typeof tiger).to.be.equal('object');
        expect(tiger instanceof Tiger).to.be.equal(true);
    });
    it('у тигра есть имя и тип', () => {
        const tiger = new Tiger('Tom', 'amur');
        expect(tiger.name).to.be.equal('Tom');
        expect(tiger.type).to.be.equal('amur');
    });
    it('у тигра есть метод подсчета полосок', () => {
        const tiger = new Tiger('Tom', 'amur');
        expect(tiger.countStrips).to.exist;
    });
    it('метод подсчета полосок считает их', () => {
        const tiger = new Tiger('Tom', 'amur');
        expect(tiger.strips).not.to.exist;
        tiger.countStrips();
        expect(tiger.strips).to.be.equal(1);
        tiger.countStrips();
        expect(tiger.strips).to.be.equal(2);
    });
});
