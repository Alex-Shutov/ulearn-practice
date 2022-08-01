import { expect } from "chai";
import truncateString from "./task";

describe('truncateString', () => {
  it('возвращает строку', () => {
    expect(typeof truncateString('abc', 3)).to.equal('string');
  });
  it('возвращает обрезанную строчку', () => {
    expect(truncateString('Привет! Меня зовут Компьютер!', 7)).to.equal('Привет!…');
  });
  it('возвращает изначальную строчку', () => {
    expect(truncateString('Привет! Меня зовут Компьютер!', 70)).to.equal('Привет! Меня зовут Компьютер!');
  });
  it('возвращает изначальную строчку', () => {
    expect(truncateString('Привет! Меня зовут Компьютер!', 29)).to.equal('Привет! Меня зовут Компьютер!');
  });
  it('возвращает обрезанную строчку из 1 символа', () => {
    expect(truncateString('Привет! Меня зовут Компьютер!', 1)).to.equal('П…');
  });
  it('возвращает обрезанную строчку из 0 символов', () => {
    expect(truncateString('Привет! Меня зовут Компьютер!', 0)).to.equal('…');
  });
});