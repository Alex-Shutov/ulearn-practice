function createColor(colorName) {
    return {
        colorName,
        use() {
            return `Используется ${this.colorName.toLowerCase()} цвет`;
        },
        stopUse() {
            return `${this.colorName[0].toUpperCase()}${this.colorName.slice(1).toLowerCase()} цвет больше не используется`;
        }
    };
}

//#region Task
function useColor1() {
    // добавить use к объекту newcolor. Нужно переиспользовать use из объекта blueColor.
    const newcolor = {colorName: 'серо-буро-малиновый в крапинку'};
    const blueColor = createColor('Синий');

}

function useColor2() {
    // Воспользуйся методом call
    const newcolor = {colorName: 'серо-буро-малиновый в крапинку'};

}

function useColor3() {
    // Воспользуйся методом bind
    const newcolor = {colorName: 'серо-буро-малиновый в крапинку'};

}
//#endregion Task

export default {
    addMethod: useColor1,
    useCall: useColor2,
    useBind: useColor3
};
