import { expect } from "chai";
import calculateHours from "./task";

describe('calculateHours', () => {
  it('считает время дня на Земле', () => {
    expect(calculateHours.onEarth(1)).to.equal(24);
  });
  it('считает время дня на Луне', () => {
    expect(calculateHours.onMoon(1)).to.equal(29.5);
  });
  it('считает время нескольких дней на Земле', () => {
    expect(calculateHours.onEarth(3)).to.equal(72);
  });
  it('считает время нескольких дней на Луне', () => {
    expect(calculateHours.onMoon(3)).to.equal(88.5);
  });
  it('последовательные вызовы работают корректно', () => {
    expect(calculateHours.onMoon(2)).to.equal(59);
    expect(calculateHours.onEarth(1.5)).to.equal(36);
  });
});
