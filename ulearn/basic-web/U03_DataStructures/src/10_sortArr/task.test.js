import { expect } from "chai";
import sortArr from "./task";

describe('sortArr', () => {
  it('возвращает новый массив', () => {
    const arr = [1,2,3];
    expect(sortArr(arr)).to.not.equal(arr);
  });
  it('не изменяет исходный массив', () => {
    const arr = [1,2,3];
    const copy = arr.slice();
    expect(sortArr(arr)).to.deep.equal([3,2,1]);
    expect(arr).to.deep.equal(copy);
  });
  it('возвращает отсортированный массив', () => {
    const arr = [1,2,3];
    expect(sortArr(arr)).to.deep.equal([3,2,1]);
  });
  it('возвращает массив из одного элемента', () => {
    const arr = [1];
    expect(sortArr(arr)).to.deep.equal([1]);
  });
  it('корректно работает с пустым массивом', () => {
    const arr = [];
    expect(sortArr(arr)).to.deep.equal([]);
  });
  it('сортирует элементы как числа', () => {
    const arr = [1, 22, 10, 2];
    expect(sortArr(arr)).to.deep.equal([22, 10, 2, 1]);
  });
  it('сортирует массив с нулями и отрицательными числами', () => {
    const arr = [0, -14, 23, 10, 1];
    expect(sortArr(arr)).to.deep.equal([23, 10, 1, 0, -14]);
  });
  it('сортирует массив с одинаковыми значениями', () => {
    const arr = [0, 23, 1, 1, 23, 23];
    expect(sortArr(arr)).to.deep.equal([23, 23, 23, 1, 1, 0]);
  });
});