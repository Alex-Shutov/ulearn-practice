import { expect } from "chai";
import createColor from "./task";

describe('createColor', () => {
  it('должен возвращать объект', () => {
    expect(typeof createColor('')).to.equal('object')
  });
  it('в вернувшемся объекте должно быть поле с названием цвета', () => {
    const redColor = createColor('красный');
    expect(redColor.colorName).to.equal('красный')
  });
  it('метод use должен возвращать строку про использование', () => {
    const redColor = createColor('красный');
    expect(redColor.use()).to.equal('Используется красный цвет')
  });
  it('метод stopUse должен возвращать строку про окончание использования', () => {
    const yellowColor = createColor('желтый');
    expect(yellowColor.stopUse()).to.equal('Желтый цвет больше не используется')
  });
  it('метод use должен корректно работать при вызове в контексте другого объекта', () => {
    const yellowColor = createColor('желтый');
    const blackColor = {
      colorName: 'черный',
      use: yellowColor.use,
    };
    expect(blackColor.use()).to.equal('Используется черный цвет')
  });
  it('метод stopUse должен корректно работать при вызове в контексте другого объекта', () => {
    const yellowColor = createColor('желтый');
    expect(yellowColor.stopUse.call({colorName: 'голубой'})).to.equal('Голубой цвет больше не используется')
  });
  it('метод use должен приводить название к нижнему регистру', () => {
    const yellowColor = createColor('жЕлТыЙ');
    expect(yellowColor.use()).to.equal('Используется желтый цвет')
  });
  it('метод stopUse должен приводить название к нижнему регистру, а первую букву делать заглавной', () => {
    const greenColor = createColor('зеЛеный');
    expect(greenColor.stopUse()).to.equal('Зеленый цвет больше не используется')
  });
});
