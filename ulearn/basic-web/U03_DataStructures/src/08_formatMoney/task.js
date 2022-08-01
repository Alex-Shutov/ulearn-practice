//#region Task
function formatMoney (money) {
    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    });
    return formatter.formatToParts(money).map(p => {
        switch (p.type) {
            case 'integer':
            case 'fraction':
                return p.value;
            case 'group':
                return '\u2009';
            case 'decimal':
                return ',';
            default:
                return ''
        }
    }).join('');
}
//#endregion Task

export default formatMoney;
