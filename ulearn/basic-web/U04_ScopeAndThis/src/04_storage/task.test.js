import { expect } from "chai";
import createStorage from "./task";

describe('creaitorage', () => {
  it('должен возвращать объект', () => {
    expect(typeof createStorage()).to.equal('object')
  });
  it('должен выполнять функцию get', () => {
    const dataStorage = createStorage();
    expect(dataStorage.get()).to.exist;
  });
  it('должен выполнять функцию add', () => {
    const dataStorage = createStorage();
    dataStorage.add(1,2,3);
    expect(dataStorage.get()).to.deep.equal([1,2,3]);
  });
  it('должен выполнять функцию add несколько раз', () => {
    const dataStorage = createStorage();
    dataStorage.add(1,2,3);
    dataStorage.add(2);
    dataStorage.add(4,5);
    expect(dataStorage.get()).to.deep.equal([1,2,3,2,4,5]);
  });
  it('должен выполнять функцию add с разными типами данных', () => {
    const dataStorage = createStorage();
    dataStorage.add(1);
    dataStorage.add(true);
    dataStorage.add(null);
    dataStorage.add('lol');
    dataStorage.add([1,2]);
    dataStorage.add(undefined);
    expect(dataStorage.get()).to.deep.equal([1, true, null, 'lol', [1,2], undefined]);
  });
  it('должен выполнять функцию clear', () => {
    const dataStorage = createStorage();
    dataStorage.add(1,2,3);
    dataStorage.clear();
    dataStorage.add('ds');
    expect(dataStorage.get()).to.deep.equal(['ds']);
  });
  it('должен выполнять функцию remove', () => {
    const dataStorage = createStorage();
    dataStorage.add(1,2,3,4,5,6,7,3434,'ds');
    dataStorage.remove(2);
    expect(dataStorage.get()).to.deep.equal([1,3,4,5,6,7,3434,'ds']);
  });
  it('remove не должен удалять элемент, если его не существует', () => {
    const dataStorage = createStorage();
    dataStorage.add(1,2,3,4,5,7,'ds');
    dataStorage.remove(10);
    expect(dataStorage.get()).to.deep.equal([1,2,3,4,5,7,'ds']);
  });
  it('remove должен удалять первый элемент', () => {
    const dataStorage = createStorage();
    dataStorage.add(1,2,3,4,5,7,'ds');
    dataStorage.remove(1);
    expect(dataStorage.get()).to.deep.equal([2,3,4,5,7,'ds']);
  });
  it('remove должен удалять последний элемент', () => {
    const dataStorage = createStorage();
    dataStorage.add(1,2,3,4,5,7,'ds');
    dataStorage.remove('ds');
    expect(dataStorage.get()).to.deep.equal([1,2,3,4,5,7]);
  });
});
