import {
    CROSS,
    EMPTY,
    ZERO,
    field,
    currentSymbol,
    winningSymbol
} from "./index";



export function startGame () {
    field = createField()
}

export function createField (dimension = 3) {
    // Функция создания поля
    debugger
    const result = [];
    for (let i = 0; i < dimension; i++) {
        result[i] = [];
        for (let j = 0; j < dimension; j++) {
            result[i][j] = field[i] && field[i][j] ? field[i][j] : EMPTY;
        }
    }
    return result;
}
export function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}
export function switchPlayer () {
    //currentSymbol = currentSymbol === CROSS ? ZERO : CROSS;
}
export function makeAiTurn(aiSymbol){
    //...
    // использовать setSymbolInCell()
    // console.log(`AI has done turn`);
    //...
}
export function handleEndOfGame (pretenderSymbol,pretenderCell){

}
export function getWinningCells(row,col){

}
