import { expect } from "chai";
import formatMoney from "./task";

describe('formatMoney', () => {
  it('возвращает строку', () => {
    expect(typeof formatMoney(100)).to.equal('string');
  });
  it('форматирует число меньше 1000', () => {
    expect(formatMoney(100)).to.equal('100,00');
  });
  it('форматирует число больше 1000', () => {
    expect(formatMoney(10000)).to.equal('10 000,00');
  });
  it('форматирует число больше 1 000 000', () => {
    expect(formatMoney(1110000)).to.equal('1 110 000,00');
  });
  it('форматирует число больше 1 000 000 000', () => {
    expect(formatMoney(1110000000)).to.equal('1 110 000 000,00');
  });
  it('форматирует число с дробной частью', () => {
    expect(formatMoney(111.11)).to.equal('111,11');
  });
  it('форматирует число с длинной дробной частью', () => {
    expect(formatMoney(111.11202020)).to.equal('111,11');
  });
  it('форматирует число с короткой дробной частью', () => {
    expect(formatMoney(111.5)).to.equal('111,50');
  });
  it('форматирует число больше тысячи и с дробной частью', () => {
    expect(formatMoney(1111.5)).to.equal('1 111,50');
  });
});