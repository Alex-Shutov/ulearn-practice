import { expect } from "chai";
import sumSquares from "./task";

describe('sumSquares', () => {
  it('должен возвращать число', () => {
    expect(typeof sumSquares(2,3)).to.equal('number');
  });
  it('считает сумму квадратов', () => {
    expect(sumSquares(1, 4)).to.equal(30);
  });
  it('считает сумму квадратов для подряд идущих чисел', () => {
    expect(sumSquares(5, 6)).to.equal(61);
  });
  it('считает сумму квадратов для двух одинаковых чисел', () => {
    expect(sumSquares(6, 6)).to.equal(36);
  });
  it('считает сумму квадратов для 0', () => {
    expect(sumSquares(0, 0)).to.equal(0);
  });
  it('считает сумму квадратов для отрицательных чисел', () => {
    expect(sumSquares(-4, -2)).to.equal(29);
  });
});