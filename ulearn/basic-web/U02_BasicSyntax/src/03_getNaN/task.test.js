import { expect } from "chai";
import getNaN from "./task";

describe('NaN', () => {
  it('возвращаемое значение имеет тип число', () => {
    expect(typeof getNaN()).to.equal('number');
  });
  it('возвращаемое значение NaN или не приводится к числу', () => {
    expect(isNaN(getNaN())).to.equal(true);
  });
  it('возвращаемое значение точно NaN', () => {
    const shouldBeNaN = getNaN();
    expect(shouldBeNaN !== shouldBeNaN).to.equal(true);
  });
});