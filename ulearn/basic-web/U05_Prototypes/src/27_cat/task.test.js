import { expect } from 'chai';
import task from './task';
const { Cat, Leopard } = task;

describe('Cat and Leopard', () => {
    it('у кота есть методы sayMeow и getPet', () => {
        const cat = new Cat();
        expect(cat.sayMeow).to.exist;
        expect(cat.getPet).to.exist;
    });
    it('у леопарда есть методы sayMeow и getPet', () => {
        const leopard = new Leopard();
        expect(leopard.sayMeow).to.exist;
        expect(leopard.getPet).to.exist;
    });
    it('леопард наследник от Cat', () => {
        const leopard = new Leopard();
        expect(leopard instanceof Cat).to.be.equal(true);
    });
    it('у кота методы sayMeow и getPet возвращают правильные строки', () => {
        const cat = new Cat();
        expect(cat.sayMeow()).to.be.equal('Meow!   Meow!   Meow!');
        expect(cat.getPet()).to.be.equal('Purrrrrr');
    });
    it('у леопарда метод sayMeow возвращает правильную строчку', () => {
        const leopard = new Leopard();
        expect(leopard.sayMeow()).to.be.equal('Roar!');
    });
    it('у леопарда метод getPet возвращает правильную строчку', () => {
        const leopard = new Leopard();
        expect(leopard.getPet()).to.be.equal('Purrrrrr');
    });
    it('у леопарда метод getPet делает его счастливым', () => {
        const leopard = new Leopard();
        leopard.getPet();
        expect(leopard.mood).to.be.equal('счастлив');
    });
    it('у леопарда счастливое настроение появляется только после вызова getPet', () => {
        const leopard = new Leopard();
        expect(leopard.mood).not.to.be.equal('счастлив');
        leopard.getPet();
        expect(leopard.mood).to.be.equal('счастлив');
    });
    it('у леопардов счастливое настроение устанавливается независимо', () => {
        const leopard = new Leopard();
        const leopard2 = new Leopard();
        expect(leopard.mood).not.to.be.equal('счастлив');
        expect(leopard2.mood).not.to.be.equal('счастлив');
        leopard.getPet();
        expect(leopard.mood).to.be.equal('счастлив');
        expect(leopard2.mood).not.to.be.equal('счастлив');
    });
});
