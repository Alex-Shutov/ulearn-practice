//#region Task
function createRelation() {
    const programmer = {
        hasComputer: true,
        canWriteCode: true,
        wait: () => 'Билдится!',
        reactOnBugReport: () => 'У меня все работает!'
    };

    const frontendDeveloper = Object.create(programmer);
    frontendDeveloper.reactOnBugReport = () => 'Купите новый компьютер';

    return {
        programmer,
        frontendDeveloper
    };
}
//#endregion Task

export default createRelation;
