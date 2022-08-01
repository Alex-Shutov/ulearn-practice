'use strict'
import Exercise from './task.Addition.mjs'


export let exercise;

export function startGame(){
    exercise = new Exercise()
    exercise.createingPrototypes()
    exercise.startExercise()
    exercise.Field = []
}



//#region Exercise
export function cellClickHandler (row, col) {
    // Пиши код тут

    console.log(`Clicked on cell: ${row}, ${col}`);
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function makeAiTurn (aiSymbol) {
    //...
    // использовать setSymbolInCell()
    // console.log(`AI has done turn`);
    // Не забудьте поменять пользователя
    //...
}

function handleEndOfGame (pretenderSymbol, pretenderCell) {
    return false
}

function handleWin (pretenderSymbol, winningCells) {

}

function switchPlayer () {
    // currentSymbol  = ...
}



function hasEmptyCells (field = this.field) {
    /// return getEmptyCells(field).length > 0;
    return false
}

function getEmptyCells (field = this.field) {
    // const result = [];
    // for (let i = 0; i < field.length; i++) {
    //     for (let j = 0; j < field.length; j++) {
    //         const symbolInCell = getSymbolInCell(i, j);
    //         if (symbolInCell === EMPTY) {
    //             result.push({row: i, col: j});
    //         }
    //     }
    // }
    // return result;
    return []
}
//#endregion Exercise
