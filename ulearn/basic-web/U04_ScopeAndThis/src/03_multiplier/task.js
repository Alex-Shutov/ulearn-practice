//#region Task
function createMultiplier(num) {
    const a = 8;
    const b = 10;
    const c = 256;

    let i = 0;

    return function() {
        switch (i) {
            case 0:
                i++;
                return a * num;
            case 1:
                i++;
                return b * num;
            default:
                i = 0;
                return c * num;
        }
    }
}
//#endregion Task

export default createMultiplier;
