import { expect } from "chai";
import checkA from "./task";

describe('checkA', () => {
  it('IfElse: a не равно 0 ', () => {
    expect(checkA.ifElse(5)).to.equal(5);
  });
  it('IfElse: a равно 0 ', () => {
    expect(checkA.ifElse(0)).to.equal('Все плохо');
  });
  it('Ternary: a не равно 0 ', () => {
    expect(checkA.ternary(5)).to.equal(5);
  });
  it('Ternary: a равно 0 ', () => {
    expect(checkA.ternary(0)).to.equal('Все плохо');
  });
  it('LogicalOr: a не равно 0 ', () => {
    expect(checkA.logicalOr(5)).to.equal(5);
  });
  it('LogicalOr: a равно 0 ', () => {
    expect(checkA.logicalOr(0)).to.equal('Все плохо');
  });
});