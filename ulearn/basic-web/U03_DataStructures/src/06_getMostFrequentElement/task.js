//#region Task
function getMostFrequentElement (arr) {
    const dictionary = {};
    for (const char of arr) {
        if (!dictionary[char]) {
            dictionary[char] = 0;
        }
        dictionary[char]++;
    }
    let maxValue = 0;
    let maxChar = null;
    for (const char in dictionary) {
        if (dictionary[char] > maxValue) {
            maxValue = dictionary[char];
            maxChar = char;
        }
    }
    return maxChar;
}
//#endregion Task

export default getMostFrequentElement;
