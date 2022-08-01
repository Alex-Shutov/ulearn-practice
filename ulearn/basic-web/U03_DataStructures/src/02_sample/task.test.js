import { expect } from "chai";
import sample from "./task";

describe('sample', () => {
  it('результат — элемент из массива', () => {
    const arr = [1000, 20, 3];
    const result = sample(arr);
    expect(arr.includes(result)).to.equal(true);
  });
  it('возвращаемые значения — разные', () => {
    const arr = [1, 2, 3, 4, 5];
    const set = new Set();

    for (let i = 0; i < 1000; i++) {
      set.add(sample(arr));
    }
    expect(set.size).to.equal(arr.length);
  });
  it('массив из одного элемента', () => {
    const arr = [10];

    for (let i = 0; i < 1000; i++) {
      expect(sample(arr)).to.equal(10);
    }
  });
});
