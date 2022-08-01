//#region Task
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
//#endregion Task

export default createColor;
