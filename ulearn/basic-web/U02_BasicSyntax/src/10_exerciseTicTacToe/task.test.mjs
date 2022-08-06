import Exercise from "./task.Addition.mjs";
import {
    startGame as initialStartGame,
    cellClickHandler as initialCellClickHandler,
    exercise as initialExercise,
    switchPlayer as initialSwitchPlayer,
    hasEmptyCells as initialHasEmptyCells,
    getEmptyCells as initialGetEmptyCells,
    makeAiTurn as initialMakeAiTurn,
} from "./task.Initial.mjs";
import {
    startGame,
    cellClickHandler,
    exercise,
    switchPlayer,
    hasEmptyCells,
    getEmptyCells,
    makeAiTurn,
    handleEndOfGame,
} from "./task.mjs";

//? ИДЕЯ НА СТАДИИ РАЗРАБОТКИ ИСПОЛЬЗОВАТЬ ПРАВИЛЬНОЕ РЕШЕНИЕ
//? И ТОЛЬКО В КОНЦЕ ЗАМЕНИТЬ НА ПУСТЫЕ МЕТОДЫ

import { assert, expect } from "chai";

describe("Exercise", () => {
    it("startGame is working", () => {
        startGame();
        let test = exercise.Field.__proto__.isPrototypeOf([]);
        expect(test).to.equal(true);
    });
    it("cellClickHandler is working", () => {
        startGame();
        cellClickHandler(0, 0);
        expect(exercise.Field[0][0]).to.equal("X");
    });

    it("makeAITurn is working", () => {
        const exercise = new Exercise();
        const cellsMinusOne = getEmptyCells(exercise.Field).length - 1;
        makeAiTurn(exercise.ZERO);
        expect(cellsMinusOne).to.equal(getEmptyCells(exercise.Field).length);
    });

    it("handleEndOfGame is working", () => {
        startGame();
        exercise.Field = [
            [" ", " ", " "],
            [" ", "X", " "],
            [" ", " ", " "],
        ];
        expect(
            handleEndOfGame(exercise.CROSS, {
                row: 1,
                col: 1,
            })
        ).to.equal(false);
    });

    it("handleEndOfGame is working when game is won", () => {
        startGame();
        exercise.Field = [
            ["X", "O", "X"],
            ["O", "X", "O"],
            ["X", " ", " "],
        ];
        expect(
            handleEndOfGame(exercise.CROSS, {
                row: 0,
                col: 2,
            })
        ).to.equal(true);
    });

    it("handleEndOfGame is working when draw", () => {
        startGame();
        exercise.Field = [
            ["X", "O", "X"],
            ["O", "X", "O"],
            ["O", "X", "O"],
        ];
        expect(
            handleEndOfGame(exercise.ZERO, {
                row: 2,
                col: 2,
            })
        ).to.equal(true);
    });

    it("handleWin is working", () => {
        //! не трогаю пока не починят
    });

    it("handleDraw is working", () => {}); //! В ИНИШИАЛЕ НЕТ ТАКОГО МЕТОДА

    it("switchPlayer is working", () => {
        let player = exercise.CurrentSymbol;
        switchPlayer();
        assert.notEqual(exercise.CurrentSymbol, player);
    });

    it("hasEmptycells is working if field is empty", () => {
        startGame();
        expect(hasEmptyCells()).to.equal(true);
    });

    it("hasEmptycells is working if field is full", () => {
        startGame();
        exercise.Field = [
            ["X", "O", "X"],
            ["O", "X", "O"],
            ["X", "O", "X"],
        ];
        expect(hasEmptyCells()).to.equal(false);
    });
});
