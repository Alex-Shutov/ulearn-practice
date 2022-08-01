import { expect } from 'chai';
import task from './task';
const { Turtle, Reptile } = task;

describe('Turtle', () => {
    it('черепаха наследник рептилий', () => {
        const turtle = new Turtle();
        expect(turtle instanceof Reptile).to.be.equal(true);
    });
    it('черепаха умеет бегать и двигаться', () => {
        const turtle = new Turtle();
        expect(turtle.move).to.exist;
        expect(turtle.run).to.exist;
    });
    it('рептилии тоже умеют бегать и двигаться', () => {
        const reptile = new Reptile();
        expect(reptile.move).to.exist;
        expect(reptile.run).to.exist;
    });
    it('при беге скорость сухопутной черепахи равна 2', () => {
        const turtle = new Turtle();
        turtle.run();
        expect(turtle.speed).to.be.equal(2);
    });
    it('при движении скорость сухопутной черепахи равна 1', () => {
        const turtle = new Turtle();
        turtle.move();
        expect(turtle.speed).to.be.equal(1);
    });
    it('при беге скорость морской черепахи равна 1', () => {
        const turtle = new Turtle(true);
        turtle.run();
        expect(turtle.speed).to.be.equal(1);
    });
    it('при движении скорость морской черепахи равна 1', () => {
        const turtle = new Turtle(true);
        turtle.move();
        expect(turtle.speed).to.be.equal(1);
    });
});
