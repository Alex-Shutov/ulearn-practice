//#region Task
function sumArr (arr) {
    let result = 0;
    for (const item of arr) {
        result += typeof item === 'number' ? item : sumArr(item);
    }
    return result;
}
//#endregion Task

export default sumArr;
