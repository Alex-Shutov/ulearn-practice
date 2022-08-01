//#region Task
class ShyDog {
    _weight = 0;

    set weight(value) {
        this._weight = value / 2;
    }

    get weight() {
        return Math.max(this._weight - 1, 1);
    }
}
//#endregion Task

export default ShyDog;
