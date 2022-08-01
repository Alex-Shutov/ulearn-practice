//#region Task
class Frog {
    constructor(sex) {
        if (sex === 'male') {
            Frog.maleCount++;
        } else if (sex === 'female') {
            Frog.femaleCount++;
        } else {
            throw Error();
        }

        this.sex = sex;
    }

    updateSex() {
        const ratio = Frog.getSexRatio();
        if (ratio <= 0.5) {
            if (this.sex === 'female') {
                this.sex = 'male';
                Frog.maleCount++;
                Frog.femaleCount--;
            }
        } else if (ratio >= 1.5) {
            if (this.sex === 'male') {
                this.sex = 'female';
                Frog.femaleCount++;
                Frog.maleCount--;
            }
        }
    }

    static maleCount = 0;
    static femaleCount = 0;

    static getSexRatio() {
        return this.maleCount/this.femaleCount;
    }
}
//#endregion Task

export default Frog;
