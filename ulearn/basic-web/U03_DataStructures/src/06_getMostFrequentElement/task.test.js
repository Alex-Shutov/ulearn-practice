import { expect } from "chai";
import getMostFrequentElement from "./task";

describe('getMostFrequentElement', () => {
  it('находит самый частый элемент', () => {
    expect(getMostFrequentElement(['a', 'b', 'c', 'a'])).to.equal('a');
  });
  it('находит самый частый элемент (не первый по алфавиту)', () => {
    expect(getMostFrequentElement(['a', 'b', 'b', 'a', 'c', 'b'])).to.equal('b');
  });
  it('находит самый частый элемент в массиве длиной 1', () => {
    expect(getMostFrequentElement(['a'])).to.equal('a');
  });
  it('находит самый частый элемент в массиве одинаковых элементов', () => {
    expect(getMostFrequentElement(['a', 'a', 'a', 'a'])).to.equal('a');
  });
});