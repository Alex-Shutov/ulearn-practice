import { expect } from "chai";
import calculateAverage from "./task";

describe('calculateAverage', () => {
  it('считает среднее для нескольких значений', () => {
    expect(calculateAverage(1, 2, 3)).to.equal(2);
  });
  it('считает среднее для одного значения', () => {
    expect(calculateAverage(1)).to.equal(1);
  });
  it('считает среднее для ниодного значения', () => {
    expect(calculateAverage()).to.equal(0);
  });
  it('считает среднее для многих значений', () => {
    expect(calculateAverage(1, 2, 3, 5, 7, 10, 123, -454, 30, 2)).to.equal(-27.1);
  });
});