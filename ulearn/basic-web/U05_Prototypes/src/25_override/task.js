//#region Task
function changeReduce() {
    Array.prototype.reduce = function() {
        return 'метод устал и не хочет работать!';
    };
}
//#endregion Task

export default changeReduce;
