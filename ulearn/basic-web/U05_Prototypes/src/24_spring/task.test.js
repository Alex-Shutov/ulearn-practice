import { expect } from 'chai';
import task from './task';
const { NorthReindeer, runSpring } = task;

describe('runSpring', () => {
    it('у северного оленя есть метод tryToFindPartner (только после запуска runSpring)', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        expect(myReindeer.tryToFindPartner).not.exist;
        runSpring();
        expect(myReindeer.tryToFindPartner).to.be.exist;
    });
    it('метод tryToFindPartner возвращает fail или success', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        runSpring();
        const results = ['fail', 'success'];
        const attemptResult = myReindeer.tryToFindPartner();
        expect(results).include(attemptResult);
    });
    it('метод tryToFindPartner вернет fail и success при большом количестве вызовов', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        runSpring();
        const attempts = new Set();
        for (let i = 0; i < 20; i++) {
            attempts.add(myReindeer.tryToFindPartner());
        }
        expect(attempts.size).to.be.equal(2);
        expect(attempts.has('fail')).to.be.equal(true);
        expect(attempts.has('success')).to.be.equal(true);
    });
    it('метод tryToFindPartner установит поле hasBaby при большом количестве вызовов', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        runSpring();
        expect(myReindeer.hasBaby).not.exist;
        for (let i = 0; i < 20; i++) {
            myReindeer.tryToFindPartner();
        }
        expect(myReindeer.hasBaby).to.be.equal(true);
    });
    it('метод tryToFindPartner установит поле hasBaby только тому оленю, у которого был вызван метод', () => {
        const myReindeer = new NorthReindeer('Rudolf', 'Veronika');
        const myReindeer2 = new NorthReindeer('Rudolfina', 'Veronika');
        runSpring();
        expect(myReindeer.hasBaby).not.exist;
        expect(myReindeer2.hasBaby).not.exist;
        for (let i = 0; i < 20; i++) {
            myReindeer.tryToFindPartner();
        }
        expect(myReindeer.hasBaby).to.be.equal(true);
        expect(myReindeer2.hasBaby).not.exist;
    });
});
