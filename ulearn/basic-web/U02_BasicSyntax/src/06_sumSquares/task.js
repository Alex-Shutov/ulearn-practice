//#region Task
function sumSquares (min, max) {
    let result = 0;
    for (let i = min; i <= max; i++) {
        result += i*i;
    }
    return result;
}
//#endregion Task

export default sumSquares;
