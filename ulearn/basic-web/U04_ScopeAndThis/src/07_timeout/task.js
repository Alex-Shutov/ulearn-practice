//#region Task
function delayedHello(name = 'Незнакомец') {
    setTimeout(() => {console.log(`Привет, ${name}!`)}, 1000);
}
//#endregion Task

export default delayedHello;
