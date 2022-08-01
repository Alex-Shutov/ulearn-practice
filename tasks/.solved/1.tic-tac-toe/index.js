const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let currentSymbol = null;
let winningSymbol = null;
let field = null;

startGame();
addResetListener();

function startGame () {
    const userDimension = parseInt(prompt("Размер поля?", 3));
    const fieldDimension = userDimension && 2 <= userDimension && userDimension <= 100 ? userDimension : 3;
    field = createField(fieldDimension);
    renderGrid(field);
    currentSymbol = CROSS;
    winningSymbol = null;
}

function expandField () {
    field = copyField(field, field.length + 1);
    renderGrid(field);
}

function createField (dimension) {
    return copyField([], dimension);
}

function copyField (field, dimension) {
    const result = [];
    for (let i = 0; i < dimension; i++) {
        result[i] = [];
        for (let j = 0; j < dimension; j++) {
            result[i][j] = field[i] && field[i][j] ? field[i][j] : EMPTY;
        }
    }
    return result;
}

function renderGrid (field) {
    container.innerHTML = '';

    for (let i = 0; i < field.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < field.length; j++) {
            const cell = document.createElement('td');
            cell.textContent = field[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j, field.length));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (winningSymbol || currentSymbol !== CROSS) {
        return;
    }

    const symbolInCell = getSymbolInCell(row, col);
    if (symbolInCell !== EMPTY) {
        return;
    }

    setSymbolInCell(currentSymbol, row, col);
    console.log(`Clicked on cell: ${row}, ${col}`);

    setTimeout(() => {
        const isEnded = handleEndOfGame(currentSymbol, {row: row, col: col});
        if (!isEnded) {
            switchPlayer();
            tryExpandField();
            makeAiTurn(ZERO);
        }
    }, 0);
}

function makeAiTurn (aiSymbol) {
    const emptyCells = getEmptyCells();
    const goodCells = [];
    for(const cell of emptyCells) {
        const winningCells = getWinningCellsAfterSymbol(aiSymbol, cell.row, cell.col);
        if (winningCells) {
            goodCells.push(cell);
        }
    }
    const chosenCells = goodCells.length > 0 ? goodCells : emptyCells;

    const randomIndex = Math.floor(Math.random()*chosenCells.length);
    const randomCell = chosenCells[randomIndex];

    setSymbolInCell(aiSymbol, randomCell.row, randomCell.col);
    console.log(`AI has done turn`);

    setTimeout(() => {
        const isEnded = handleEndOfGame(currentSymbol, randomCell);
        if (!isEnded) {
            switchPlayer();
            tryExpandField();
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

function handleDraw () {
    alert('Победила дружба');
}

function switchPlayer () {
    currentSymbol = currentSymbol === CROSS ? ZERO : CROSS;
}

function tryExpandField () {
    const totalCellCount = field.length*field.length;
    const emptyCellCount = getEmptyCells().length;
    if (emptyCellCount < 0.5*totalCellCount) {
        expandField();
    }
}

function hasEmptyCells () {
    return getEmptyCells().length > 0;
}

function getEmptyCells () {
    const result = [];
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            const symbolInCell = getSymbolInCell(i, j);
            if (symbolInCell === EMPTY) {
                result.push({row: i, col: j});
            }
        }
    }
    return result;
}

function getWinningCells (row, col) {
    const symbol = getSymbolInCell(row, col);
    return getWinningCellsAfterSymbol(symbol, row, col);
}

function getWinningCellsAfterSymbol (symbol, row, col) {
    const colCells = [];
    const rowCells = [];
    const diagonal1Cells = [];
    const diagonal2Cells = [];
    for (let i = 0; i < field.length; i++) {
        colCells.push({row: i, col: col});
        rowCells.push({row: row, col: i});
        if (row === col) {
            diagonal1Cells.push({row: i, col: i});
        }
        if (row + col + 1 === field.length) {
            diagonal2Cells.push({row: i, col: field.length - 1 - i});
        }
    }

    if (isSymbolWon(symbol, row, col, colCells)) {
        return colCells;
    }
    if (isSymbolWon(symbol, row, col, rowCells)) {
        return rowCells;
    }
    if (isSymbolWon(symbol, row, col, diagonal1Cells)) {
        return diagonal1Cells;
    }
    if (isSymbolWon(symbol, row, col, diagonal2Cells)) {
        return diagonal2Cells;
    }
    return null;
}

function isSymbolWon (symbol, row, col, сells) {
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

function getSymbolInCell (row, col) {
    return field[row][col];
}

function setSymbolInCell (symbol, row, col, color = '#333') {
    field[row][col] = symbol;
    renderSymbolInCell(symbol, row, col, color);
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    startGame();
}


/* Test Function */
/* Победа первого игрока */
function test () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
