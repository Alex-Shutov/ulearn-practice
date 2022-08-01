import { expect } from "chai";
import square from "./task";

describe('square', () => {
  it('возводит все элементы в квадрат', () => {
    expect(square([1,2,3])).to.deep.equal([1,4,9]);
  });
  it('возводит в квадрат массив с одним элементом', () => {
    expect(square([3])).to.deep.equal([9]);
  });
  it('возвращает пустой массив, если на вход был пустой массив', () => {
    expect(square([])).to.deep.equal([]);
  });
  it('возводит в квадрат отрицательные эл-ты и равные 0', () => {
    expect(square([-5, 0, 5])).to.deep.equal([25, 0, 25]);
  });
});