import { expect } from 'chai';
import changeReduce from './task';

describe('changeReduce', () => {
    it('до вызова функции changeReduce reduce работает нормально', () => {
        expect([].reduce((previous, current) => previous + current, 0)).to.be.equal(0);
        expect([1, 2].reduce((previous, current) => previous + current, 0)).to.be.equal(3);
    });
    it('после вызова функции changeReduce reduce возвращает строку', () => {
        changeReduce();
        expect([].reduce((previous, current) => previous + current, 0)).to.be.equal('метод устал и не хочет работать!');
        expect([1, 2].reduce((previous, current) => previous + current, 0)).to.be.equal('метод устал и не хочет работать!');
    });
});
