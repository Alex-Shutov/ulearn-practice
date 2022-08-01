import { expect } from "chai";
import formatDate from "./task";

describe('formatDate', () => {
  it('возвращает строку', () => {
    expect(typeof formatDate(new Date(2015, 2, 3))).to.equal('string');
  });
  it('возвращает отформатированную дату для дня и месяца >= 10', () => {
    expect(formatDate(new Date(2015, 10, 16))).to.equal('16-11-2015');
  });
  it('возвращает отформатированную дату для первого числа', () => {
    expect(formatDate(new Date(2015, 10, 1))).to.equal('01-11-2015');
  });
  it('возвращает отформатированную дату для месяца < 10', () => {
    expect(formatDate(new Date(2015, 1, 16))).to.equal('16-02-2015');
  });
  it('возвращает отформатированную дату для дня < 10', () => {
    expect(formatDate(new Date(2015, 10, 3))).to.equal('03-11-2015');
  });
  it('возвращает отформатированную дату для октября', () => {
    expect(formatDate(new Date(2015, 9, 3))).to.equal('03-10-2015');
  });
  it('возвращает отформатированную дату для дня и месяца < 10', () => {
    expect(formatDate(new Date(2015, 0, 3))).to.equal('03-01-2015');
  });
  it('возвращает отформатированную дату трехзначного года', () => {
    expect(formatDate(new Date(405, 0, 3))).to.equal('03-01-405');
  });
  it('возвращает отформатированную дату однозначного года', () => {
    expect(formatDate(new Date('0001-02-03T00:00:00'))).to.equal('03-02-1');
  });
  it('возвращает отформатированную дату для Нового года =)', () => {
    expect(formatDate(new Date(2018, 11, 31))).to.equal('31-12-2018');
  });
  it('возвращает отформатированную дату для сентября', () => {
    expect(formatDate(new Date(2018, 8, 10))).to.equal('10-09-2018');
  });
});