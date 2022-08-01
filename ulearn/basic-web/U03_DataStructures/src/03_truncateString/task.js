//#region Task
function truncateString (str, len) {
    return str.length <= len ? str : str.substr(0, len) + '…';
}
//#endregion Task

export default truncateString;
