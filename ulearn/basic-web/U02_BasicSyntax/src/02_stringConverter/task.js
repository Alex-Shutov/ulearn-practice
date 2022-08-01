//#region Task
function convertStringToNumber (str) {
    const result = Number(str);
    return !isNaN(result) ? result : false;
}
//#endregion Task

export default convertStringToNumber;
