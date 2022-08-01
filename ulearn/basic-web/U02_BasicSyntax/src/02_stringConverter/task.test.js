import { expect } from "chai";
import convertStringToNumber from "./task";

describe('convertStringToNumber', () => {
  it('возвращает число из строки c целым числом', () => {
    expect(convertStringToNumber('123')).to.equal(123);
  });
  it('возвращает число из строки c дробным числом', () => {
    expect(convertStringToNumber('0.123')).to.equal(.123);
  });
  it('возвращает 0 из строки с нулем', () => {
    expect(convertStringToNumber('0')).to.equal(0);
  });
  it('возвращает число из строки c начальным пробелом', () => {
    expect(convertStringToNumber('     \t 13')).to.equal(13);
  });
  it('возвращает false из строки c буквами', () => {
    expect(convertStringToNumber('abc')).to.equal(false);
  });
  it('возвращает false из строки c неправильным разделителем', () => {
    expect(convertStringToNumber('2,123')).to.equal(false);
  });
  it('возвращает false из строки c пробелом', () => {
    expect(convertStringToNumber('2 123')).to.equal(false);
  });
  it('работает с пустой строкой', () => {
    expect(convertStringToNumber('')).to.equal(0);
  });
  it('работает с бесконечностью', () => {
    expect(convertStringToNumber('Infinity')).to.equal(Infinity);
  });
  it('работает с отрицательными числами', () => {
    expect(convertStringToNumber('-1')).to.equal(-1);
  });
});