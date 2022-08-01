//#region Task
function createRelation() {
    const programmer = {
        hasComputer: true,
        canWriteCode: true,
        wait: () => 'Билдится!',
        reactOnBugReport: () => 'У меня все работает!'
    };


    return {
        programmer
    };
}
//#endregion Task

export default createRelation;
