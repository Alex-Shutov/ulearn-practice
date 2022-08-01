//#region Task
function createGratitude (name, rating) {
    const userName = name || 'Аноним';
    return `${userName} оценил нас на ${rating || 0} из 5. Спасибо, ${userName}!`
}
//#endregion Task

export default createGratitude;
