import Exercise from "./task.Addition.mjs";
import {startGame,exercise} from "./task.Initial.mjs";
import {expect} from 'chai'

describe('Exercise', () => {
  it('startGame is working',()=>{
      startGame()
      let test = exercise.Field.__proto__.isPrototypeOf([])
      expect(test).to.equal(true)
  })
  it('cell Click Handler is working',()=>{
        const exercise = new Exercise();

  });

  it('makeAITurn is working',()=>{

  });

  it('handleEndOfGame is working',()=>{

  });

  it('handleWin is working',()=>{

  });

  it('handleDraw is working',()=>{

  });

  it('switchPlayer is working',()=>{

  });

  it('has Empty cells is working',()=>{

  });
});
