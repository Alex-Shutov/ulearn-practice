//#region Task
function formatDate (date) {
    return `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${(date.getFullYear())}`;
}

function padZero(number) {
    const str = String(number);
    return str.length === 1 ? '0' + str : str;
}
//#endregion Task

export default formatDate;
