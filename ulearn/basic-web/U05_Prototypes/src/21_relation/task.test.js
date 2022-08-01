import { expect } from 'chai';
import createRelation from './task';

describe('createRelation', () => {
    it('функция возвращает объект', () => {
        expect(typeof createRelation()).to.be.equal('object');
    });
    it('в вернувшемся объекте два поля: programmer и frontendDeveloper', () => {
        const itGuys = createRelation();
        expect(itGuys.programmer).to.exist;
        expect(itGuys.frontendDeveloper).to.exist;
    });
    it('frontendDeveloper правильно реагирует на баги', () => {
        const frontendDeveloper = createRelation().frontendDeveloper;
        expect(frontendDeveloper.reactOnBugReport()).to.be.equal(
            'Купите новый компьютер'
        );
    });
    it('programmer тоже правильно реагирует на баги', () => {
        const programmer = createRelation().programmer;
        expect(programmer.reactOnBugReport()).to.be.equal(
            'У меня все работает!'
        );
    });
    it('у frontendDeveloper есть компьютер', () => {
        const frontendDeveloper = createRelation().frontendDeveloper;
        expect(frontendDeveloper.hasComputer).to.be.equal(true);
    });
    it('frontendDeveloper может писать код', () => {
        const frontendDeveloper = createRelation().frontendDeveloper;
        expect(frontendDeveloper.canWriteCode).to.be.equal(true);
    });
    it('frontendDeveloper может ждать', () => {
        const frontendDeveloper = createRelation().frontendDeveloper;
        expect(frontendDeveloper.wait()).to.be.equal('Билдится!');
    });
    it('поля wait, hasComputer и canWriteCode не принадлежат frontendDeveloper', () => {
        const frontendDeveloper = createRelation().frontendDeveloper;
        expect(frontendDeveloper.hasOwnProperty('wait')).to.be.equal(false);
        expect(frontendDeveloper.hasOwnProperty('canWriteCode')).to.be.equal(
            false
        );
        expect(frontendDeveloper.hasOwnProperty('hasComputer')).to.be.equal(
            false
        );
    });
    it('поле reactOnBugReport принадлежит frontendDeveloper', () => {
        const frontendDeveloper = createRelation().frontendDeveloper;
        expect(
            frontendDeveloper.hasOwnProperty('reactOnBugReport')
        ).to.be.equal(true);
    });
});
