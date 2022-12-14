import Exercise from './task.Addition.mjs'


export let exercise;

export function startGame(){
    exercise = new Exercise()
    exercise.createingPrototypes()
    exercise.startExercise()

}



//#region Exercise
export function cellClickHandler (row, col) {
    if (exercise.WinningSymbol || exercise.CurrentSymbol !== CROSS) {
        return;
    }

    const symbolInCell = exercise.getSymbolInCell(row, col);
    if (symbolInCell !== EMPTY) {
        return;
    }

    exercise.setSymbolInCell(exercise.CurrentSymbol, row, col);

    console.log(`Clicked on cell: ${row}, ${col},symbol: ${exercise.CurrentSymbol}`);

    setTimeout(() => {
        const isEnded = handleEndOfGame(exercise.CurrentSymbol, {row: row, col: col});
        if (!isEnded) {
            switchPlayer();
            makeAiTurn(ZERO);
        }
    }, 0);
}

export function resetClickHandler() {
    startGame()
}

function makeAiTurn (aiSymbol) {
    const chosenCells = getEmptyCells();

    const randomIndex = Math.floor(Math.random()*chosenCells.length);
    const randomCell = chosenCells[randomIndex];

    exercise.setSymbolInCell(aiSymbol, randomCell.row, randomCell.col);
    console.log(`AI has done turn`);

    setTimeout(() => {
        const isEnded = handleEndOfGame(exercise.CurrentSymbol, randomCell);
        if (!isEnded) {
            switchPlayer();

        }
    }, 0);
}

function handleEndOfGame (pretenderSymbol, pretenderCell) {
    const winningCells = getWinningCells(pretenderCell.row, pretenderCell.col);
    if (winningCells) {
        handleWin(pretenderSymbol, winningCells);
        return true;
    }
    if (!hasEmptyCells()) {
        handleDraw();

        return true;
    }
    return false;
}

function handleWin (pretenderSymbol, winningCells) {
    alert('Победил ' + pretenderSymbol);
    winningSymbol = pretenderSymbol;
    for (const cell of winningCells) {
        setSymbolInCell(pretenderSymbol, cell.row, cell.col, 'red');
    }


}

function switchPlayer () {
    exercise.CurrentSymbol = exercise.CurrentSymbol === CROSS ? ZERO : CROSS;
}



function hasEmptyCells () {
    return getEmptyCells().length > 0;
}

function getEmptyCells (field = exercise.Field) {
    const result = [];
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            const symbolInCell = exercise.getSymbolInCell(i, j);
            if (symbolInCell === EMPTY) {
                result.push({row: i, col: j});
            }
        }
    }
    return result;
}

function getWinningCells (row, col) {
    const symbol = exercise.getSymbolInCell(row, col);
    return getWinningCellsAfterSymbol(symbol, row, col);
}

function getWinningCellsAfterSymbol (symbol, row, col) {
    const colCells = [];
    const rowCells = [];
    const diagonal1Cells = [];
    const diagonal2Cells = [];
    for (let i = 0; i < exercise.Field.length; i++) {
        colCells.push({row: i, col: col});
        rowCells.push({row: row, col: i});
        if (row === col) {
            diagonal1Cells.push({row: i, col: i});
        }
        if (row + col + 1 === exercise.Field.length) {
            diagonal2Cells.push({row: i, col: exercise.Field.length - 1 - i});
        }
    }

    if (exercise.isSymbolWon(symbol, row, col, colCells)) {
        return colCells;
    }
    if (exercise.isSymbolWon(symbol, row, col, rowCells)) {
        return rowCells;
    }
    if (exercise.isSymbolWon(symbol, row, col, diagonal1Cells)) {
        return diagonal1Cells;
    }
    if (exercise.isSymbolWon(symbol, row, col, diagonal2Cells)) {
        return diagonal2Cells;
    }
    return null;
}

//#endregion Exercise
