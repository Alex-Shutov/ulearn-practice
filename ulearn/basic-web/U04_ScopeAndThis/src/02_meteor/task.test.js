import { expect } from "chai";
import crashMeteorite, { calculateHours } from "./task";

describe('crashMeteorite', () => {
  before(() => {
    crashMeteorite();
  });

  it('считает время дня на Земле после аварии метеорита', () => {
    expect(calculateHours.onEarth(4)).to.equal(88);
  });
  it('считает время дня на Луне после аварии метеорита', () => {
    expect(calculateHours.onMoon(2)).to.equal(59);
  });
  it('еще один метеорит время не меняет', () => {
    crashMeteorite();
    expect(calculateHours.onEarth(2)).to.equal(44);
  });
});
