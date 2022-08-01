import { expect } from "chai";
import palindromeChecker from "./task";

describe('palindromeChecker', () => {
  it('должен возвращать булево значение', () => {
    expect(typeof palindromeChecker('asd')).to.equal('boolean');
  });
  it('должен возвращать false для непалиндрома', () => {
    expect(palindromeChecker('asd')).to.equal(false);
  });
  it('должен возвращать false для непалиндрома с разным регистром', () => {
    expect(palindromeChecker('asdB')).to.equal(false);
  });
  it('должен возвращать true для палиндрома', () => {
    expect(palindromeChecker('asa')).to.equal(true);
  });
  it('должен возвращать true для палиндрома с разным регистром', () => {
    expect(palindromeChecker('AbBa')).to.equal(true);
  });
  it('должен возвращать true для палиндрома со спецсимволами', () => {
    expect(palindromeChecker('Ab$Ba')).to.equal(true);
  });
  it('должен возвращать false для разных спецсимволов в локалях', () => {
    expect(palindromeChecker('aXá')).to.equal(false);
  });
  it('должен возвращать false для несовпадающих только центральных символов', () => {
    expect(palindromeChecker('апБА')).to.equal(false);
  });
  it('должен возвращать true для длинного палиндрома с разным регистром', () => {
    expect(palindromeChecker('АРозаУпалаНаЛапуАзора')).to.equal(true);
  });
});