import { expect } from "chai";
import Frog from "./task";

let frogFemaleCount = undefined;
let frogMaleCount = undefined;

describe("Frog", () => {
    before(() => {
        frogFemaleCount = Frog.femaleCount;
        frogMaleCount = Frog.maleCount;
    });
    beforeEach(() => {
        Frog.femaleCount = frogFemaleCount;
        Frog.maleCount = frogMaleCount;
    });

    it("у лягушки должен быть пол", () => {
        const frog = new Frog("female");
        expect(frog.sex).to.be.equal("female");
    });
    it("есть статическое поле-каунтер", () => {
        new Frog("female");
        expect(Frog.femaleCount).to.be.equal(1);
    });
    it("поле второго пола равно 0", () => {
        new Frog("female");
        expect(Frog.maleCount).to.be.equal(0);
    });
    it("есть статический метод подсчета соотношения полов", () => {
        new Frog("female");
        new Frog("male");
        expect(Frog.getSexRatio).to.exist;
        expect(Frog.getSexRatio()).to.be.equal(1);
    });
    it("метод updateSex превращает лишнюю самку в самца", () => {
        const frog = new Frog("female");
        for (let i = 0; i < 5; i++) {
            new Frog("female");
        }
        for (let i = 0; i < 3; i++) {
            new Frog("male");
        }
        expect(Frog.getSexRatio()).to.be.equal(0.5);
        frog.updateSex();
        expect(frog.sex).to.be.equal("male");
        expect(Frog.getSexRatio()).to.be.equal(0.8);
        expect(Frog.maleCount).to.be.equal(4);
        expect(Frog.femaleCount).to.be.equal(5);
    });
    it("метод updateSex не трогает самца, при большом количестве самок", () => {
        const frog = new Frog("male");
        for (let i = 0; i < 6; i++) {
            new Frog("female");
        }
        for (let i = 0; i < 2; i++) {
            new Frog("male");
        }
        expect(Frog.getSexRatio()).to.be.equal(0.5);
        frog.updateSex();
        expect(frog.sex).to.be.equal("male");
        expect(Frog.getSexRatio()).to.be.equal(0.5);
        expect(Frog.maleCount).to.be.equal(3);
        expect(Frog.femaleCount).to.be.equal(6);
    });
    it("метод updateSex превращает лишнего самца в самку", () => {
        const frog = new Frog("male");
        for (let i = 0; i < 5; i++) {
            new Frog("male");
        }
        for (let i = 0; i < 3; i++) {
            new Frog("female");
        }
        expect(Frog.getSexRatio()).to.be.equal(2);
        frog.updateSex();
        expect(frog.sex).to.be.equal("female");
        expect(Frog.getSexRatio()).to.be.equal(1.25);
        expect(Frog.maleCount).to.be.equal(5);
        expect(Frog.femaleCount).to.be.equal(4);
    });
    it("метод updateSex не трогает самку, при большом количестве самцов", () => {
        const frog = new Frog("female");
        for (let i = 0; i < 6; i++) {
            new Frog("male");
        }
        for (let i = 0; i < 2; i++) {
            new Frog("female");
        }
        expect(Frog.getSexRatio()).to.be.equal(2);
        frog.updateSex();
        expect(frog.sex).to.be.equal("female");
        expect(Frog.getSexRatio()).to.be.equal(2);
        expect(Frog.maleCount).to.be.equal(6);
        expect(Frog.femaleCount).to.be.equal(3);
    });
    it("метод updateSex не трогает никого, если соотношение нормальное", () => {
        const femaleFrog = new Frog("female");
        const maleFrog = new Frog("male");
        expect(Frog.getSexRatio()).to.be.equal(1);
        femaleFrog.updateSex();
        expect(femaleFrog.sex).to.be.equal("female");
        maleFrog.updateSex();
        expect(maleFrog.sex).to.be.equal("male");
    });
});
