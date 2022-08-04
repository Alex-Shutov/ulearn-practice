import Exercise from "./task.Addition.mjs";
import {
    startGame,
    cellClickHandler,
    exercise,
    switchPlayer,
    hasEmptyCells,
    getEmptyCells,
    makeAiTurn,
} from "./task.Initial.mjs";
import { assert, expect } from "chai";

describe("Exercise", () => {
    it("startGame is working", () => {
        startGame();
        let test = exercise.Field.__proto__.isPrototypeOf([]);
        expect(test).to.equal(true);
    });
    it("cell Click Handler is working", () => {
        const exercise = new Exercise();
        // cellClickHandler(0, 0);
    });

    it("makeAITurn is working", () => {
        const cellsMinusOne = getEmptyCells(exercise.Field).length - 1;
        makeAiTurn(exercise.CurrentSymbol === exercise.ZERO ? exercise.CROSS : exercise.ZERO);// ВСЕГДА ЗА X!!!
        expect(cellsMinusOne).to.equal(getEmptyCells(exercise.Field).length);
    });

    it("handleEndOfGame is working", () => {});

    it("handleWin is working", () => {});

    it("handleDraw is working", () => {});

    it("switchPlayer is working", () => {
        let player = exercise.CurrentSymbol;
        switchPlayer();
        assert.notEqual(exercise.CurrentSymbol, player);
    });

    it("has Empty cells is working", () => {});
});
