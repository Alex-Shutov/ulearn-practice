//#region Task
function calculateAverage (...rest) {
    return rest.reduce((acc, x) => acc + x, 0) / (rest.length || 1)
}
//#endregion Task

export default calculateAverage;
