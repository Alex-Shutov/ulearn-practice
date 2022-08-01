import { expect } from "chai";
import useColor from "./task";

describe('useColor', () => {
  it('addMethod result', () => {
    expect(useColor.addMethod()).to.equal('Используется серо-буро-малиновый в крапинку цвет')
  });
  it('useCall result', () => {
    expect(useColor.useCall()).to.equal('Используется серо-буро-малиновый в крапинку цвет')
  });
  it('useBind result', () => {
    expect(useColor.useBind()).to.equal('Используется серо-буро-малиновый в крапинку цвет')
  });
});
