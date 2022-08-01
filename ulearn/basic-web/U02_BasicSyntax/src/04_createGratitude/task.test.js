import { expect } from "chai";
import createGratitude from "./task";

describe('createGratitude', () => {
  it('должен возвращать строку', () => {
    expect(typeof createGratitude('', 2)).to.equal('string');
  });
  it('возвращает благодарность для заданного имени', () => {
    expect(createGratitude('Петр', 2)).to.equal('Петр оценил нас на 2 из 5. Спасибо, Петр!');
  });
  it('возвращает благодарность для анонимного пользователя', () => {
    expect(createGratitude(undefined, 2)).to.equal('Аноним оценил нас на 2 из 5. Спасибо, Аноним!');
  });
  it('возвращает благодарность если не передана оценка', () => {
    expect(createGratitude('Марго')).to.equal('Марго оценил нас на 0 из 5. Спасибо, Марго!');
  });
  it('возвращает благодарность если ничего не передано', () => {
    expect(createGratitude()).to.equal('Аноним оценил нас на 0 из 5. Спасибо, Аноним!');
  });
});