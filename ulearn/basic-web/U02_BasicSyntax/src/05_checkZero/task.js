//#region Task
function checkA1 (a) {
    if (a !== 0)
        return a;
    else
        return 'Все плохо';
}

function checkA2 (a) {
    return a !== 0 ? a : 'Все плохо';
}

function checkA3 (a) {
    return a || 'Все плохо';
}
//#endregion Task

export default {
    ifElse: checkA1,
    ternary: checkA2,
    logicalOr: checkA3,
};
