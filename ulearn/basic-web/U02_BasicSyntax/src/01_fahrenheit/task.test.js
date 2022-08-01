import { expect } from "chai";
import convertCelsiusToFahrenheit from "./task";

describe('convertCelsiusToFahrenheit', () => {
  it('должен возвращать число', () => {
    expect(typeof convertCelsiusToFahrenheit(12)).to.equal('number');
  });
  it('возвращает правильное значение для положительных чисел', () => {
    expect(convertCelsiusToFahrenheit(30)).to.equal(86);
  });
  it('возвращает правильное значение для больших положительных чисел', () => {
    expect(convertCelsiusToFahrenheit(3000)).to.equal(5432);
  });
  it('возвращает правильное значение для небольших отрицательных чисел', () => {
    expect(convertCelsiusToFahrenheit(-10)).to.equal(14);
  });
  it('возвращает правильное значение для больших отрицательных чисел', () => {
    expect(convertCelsiusToFahrenheit(-100)).to.equal(-148);
  });
  it('возвращает правильное значение для 0°', () => {
    expect(convertCelsiusToFahrenheit(0)).to.equal(32);
  });
  it('возвращает правильное значение для дробных чисел°', () => {
    expect(convertCelsiusToFahrenheit(10.5)).to.equal(50.9);
  });
});
