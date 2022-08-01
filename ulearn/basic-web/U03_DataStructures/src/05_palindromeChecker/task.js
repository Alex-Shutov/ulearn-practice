//#region Task
function palindromeChecker (str) {
    const invariant = str.toUpperCase();
    const len = invariant.length
    for (let i = 0; i < len/2; i++) {
        if (invariant[i] !== invariant[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
//#endregion Task

export default palindromeChecker;
