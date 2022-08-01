import { expect } from 'chai';
import task from './task';
const { Lizard, Student } = task;

describe('Student and Lizard', () => {
    it('у созданной ящерицы есть хвост и метод его сбрасывания', () => {
        const lizard = new Lizard();
        expect(lizard.hasTail).to.be.equal(true);
        expect(lizard.dropTail).to.exist;
    });
    it('у созданной ящерицы есть ноги и название', () => {
        const lizard = new Lizard();
        expect(lizard.legCount).to.be.equal(4);
        expect(lizard.title).to.be.equal('Lizard');
    });
    it('у ящерицы отбрасывается хвост', () => {
        const lizard = new Lizard();
        expect(lizard.hasTail).to.be.equal(true);
        lizard.dropTail();
        expect(lizard.hasTail).to.be.equal(false);
    });
    it('у ящерицы хвост отрастает обратно', async () => {
        const lizard = new Lizard();
        lizard.dropTail();
        expect(lizard.hasTail).to.be.equal(false);
        lizard.wait();
        expect(lizard.hasTail).to.be.equal(true);
    });
    it('у созданного студента есть имя', () => {
        const student = new Student('Никифор');
        expect(student.name).to.be.equal('Никифор');
    });
    it('у созданного студента есть хвост и метод его сбрасывание', () => {
        const student = new Student('Никифор');
        expect(student.hasTail).to.be.equal(true);
        expect(student.dropTail).to.exist;
    });
    it('у созданного студента есть ноги и название', () => {
        const student = new Student('Никифор');
        expect(student.legCount).to.be.equal(2);
        expect(student.title).to.be.equal('Homo Sapiens');
    });
    it('у студента отбрасывается хвост', () => {
        const student = new Student('Никифор');
        expect(student.hasTail).to.be.equal(true);
        student.dropTail();
        expect(student.hasTail).to.be.equal(false);
    });
    it('у студента хвост отрастает обратно', async () => {
        const student = new Student('Никифор');
        student.dropTail();
        expect(student.hasTail).to.be.equal(false);
        student.wait();
        expect(student.hasTail).to.be.equal(true);
    });
});
