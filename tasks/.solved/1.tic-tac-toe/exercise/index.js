'use strict'
class Exercise {
    constructor() {

        this.CROSS = 'X';
        this.ZERO = 'O';
        this.EMPTY = ' ';
        this.Field = null;
        this.CurrentSymbol = null;
        this.WinningSymbol = null;


        this.container = document.getElementById('fieldWrapper');
    }

    startExercise() {
        startGame()
        this.renderGrid();
        this.CurrentSymbol = this.CROSS;
        this.WinningSymbol = null;
        this.addResetListener();
    }

    checkAfterTurn(cell) {

        const tmp = new Promise(function (resolve, reject) {
            setTimeout(() => {
                const isEnded = handleEndOfGame(this.currentSymbol, cell);
                if (!isEnded) {
                    switchPlayer();
                }
            }, 0)
        })
        return tmp
    }

    isSymbolWon(symbol, row, col, сells) {
        if (сells.length === 0) {
            return false;
        }
        for (const cell of сells) {
            if (cell.row === row && cell.col === col) {
                continue;
            }
            if (getSymbolInCell(cell.row, cell.col) !== symbol) {
                return false;
            }
        }
        return true;
    }

    renderGrid(dimension=3) {
        debugger
        this.container.innerHTML = '';

        for (let i = 0; i < dimension; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < dimension; j++) {
                const cell = document.createElement('td');
                cell.textContent = this.EMPTY;
                cell.addEventListener('click', () => cellClickHandler(i, j));
                row.appendChild(cell);
            }
            this.container.appendChild(row);
        }
    }

    setSymbolInCell(symbol, row, col, color = '#333') {
        debugger
        field[row][col] = symbol;
        renderSymbolInCell(symbol, row, col, color);
    }

    renderSymbolInCell(symbol, row, col, color = '#333') {
        const targetCell = findCell(row, col);
        targetCell.textContent = symbol;
        targetCell.style.color = color;
    }

    findCell(row, col) {
        const targetRow = this.container.querySelectorAll('tr')[row];
        return targetRow.querySelectorAll('td')[col];
    }

    addResetListener() {
        const resetButton = document.getElementById('reset');
        resetButton.addEventListener('click', resetClickHandler);
    }

    resetClickHandler() {
        console.log('ff')
    }

    clickOnCell (row, col) {
        findCell(row, col).click();
    }

    createingPrototypes(){
        Window.prototype.CROSS = this.CROSS
        Window.prototype.ZERO = this.ZERO
        Window.prototype.EMPTY = this.EMPTY
        Window.prototype.CurrentSymbol = this.CurrentSymbol
        Window.prototype.WinningSymbol = this.WinningSymbol
        Window.prototype.checkAfterTurn = this.checkAfterTurn
        Window.prototype.setSymbolInCell = this.setSymbolInCell
        Window.prototype.isSymbolWon = this.isSymbolWon
        Window.prototype.clickOnCell = this.clickOnCell
    }
}

const exercise = new Exercise().createingPrototypes()


function startGame(){

}




function cellClickHandler (row, col) {
    // Пиши код тут
    debugger
    console.log(`Clicked on cell: ${row}, ${col}`);
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function makeAiTurn (aiSymbol) {
    //...
    // использовать setSymbolInCell()
    // console.log(`AI has done turn`);
    //...
}

function handleEndOfGame (pretenderSymbol, pretenderCell) {

}

function handleWin (pretenderSymbol, winningCells) {

}

function handleDraw () {

}

function switchPlayer () {
    // currentSymbol = currentSymbol === CROSS ? ZERO : CROSS;
}



function hasEmptyCells (field = this.field) {
    // return getEmptyCells(field).length > 0;
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
}





/* Test Function */
/* Победа первого игрока */
// let test = new Exercise()
// test.startExercise()
// test.clickOnCell(2,0)
// test.clickOnCell(1, 0);
// test.clickOnCell(1, 1);
// test.clickOnCell(0, 0);
// test.clickOnCell(1, 2);
// test.clickOnCell(1, 2);
// test.clickOnCell(0, 2);
// test.clickOnCell(0, 1);
// test.clickOnCell(2, 1);
// test.clickOnCell(2, 2);

// /* Ничья */
// function testDraw () {
//     clickOnCell(2, 0);
//     clickOnCell(1, 0);
//     clickOnCell(1, 1);
//     clickOnCell(0, 0);
//     clickOnCell(1, 2);
//     clickOnCell(1, 2);
//     clickOnCell(0, 2);
//     clickOnCell(0, 1);
//     clickOnCell(2, 1);
//     clickOnCell(2, 2);
// }
//
// function clickOnCell (row, col) {
//     findCell(row, col).click();
// }
