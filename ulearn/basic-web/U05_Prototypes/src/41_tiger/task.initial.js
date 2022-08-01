//#region Task
function Tiger(name, type) {
    this.name = name;
    this.type = type;

    this.countStrips = function() {
        this.strips = this.strips + 1 || 1;
    };
}
//#endregion Task

export default Tiger;
