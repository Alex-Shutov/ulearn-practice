//#region Task
class Tiger {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    countStrips() {
        this.strips = this.strips + 1 || 1;
    }
}
//#endregion Task

export default Tiger;
