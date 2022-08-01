//#region Task
function createStorage() {
    let storage = [];

    return {
        add(...args) {
            storage = storage.concat(args);
        },
        get() {
            return [...storage];
        },
        remove(value) {
            storage = storage.filter(item => item !== value);
        },
        clear() {
            storage = [];
        }
    }
}
//#endregion Task

export default createStorage;
