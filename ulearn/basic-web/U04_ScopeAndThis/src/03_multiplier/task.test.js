import { expect } from "chai";
import createMultiplier from "./task";

describe('createMultiplier', () => {
  it('должен возвращать функцию', () => {
    expect(typeof createMultiplier(3)).to.equal('function');
  });
  it('должен при первом вызове умножать на 8', () => {
    const func = createMultiplier(40);
    expect(func()).to.equal(320);
  });
  it('должен при втором вызове умножать на 10', () => {
    const func = createMultiplier(5);
    func();
    expect(func()).to.equal(50);
  });
  it('должен при третьем вызове умножать на 256', () => {
    const func = createMultiplier(1);
    func();
    func();
    expect(func()).to.equal(256);
  });
  it('должен при седьмом вызове умножать на 8', () => {
    const func = createMultiplier(10);
    for (let i = 1; i < 7; i++) {
      func();
    }
    expect(func()).to.equal(80);
  });
  it('должен работать с 0', () => {
    const func = createMultiplier(0);
    expect(func()).to.equal(0);
    expect(func()).to.equal(0);
    expect(func()).to.equal(0);
  });
  it('функции, вернувшиеся из функции createMultiplier работают независимо', () => {
    const func1 = createMultiplier(1);
    const func2 = createMultiplier(5);
    func1();
    func2();
    func2();
    expect(func1()).to.equal(10);
    expect(func2()).to.equal(1280);
  });
});
