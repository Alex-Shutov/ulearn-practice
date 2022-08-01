import { expect } from "chai";
import delayedHello from "./task";
import sinon from "sinon";

describe("delayedHello", () => {
    const box = sinon.createSandbox();
    let spy;
    let clock;

    beforeEach(() => {
        clock = box.useFakeTimers();
        spy = box.spy(console, "log");
    });
    afterEach(() => {
        box.restore();
    });

    it("не пишет в консоль сразу после вызова", () => {
        delayedHello();
        expect(spy.called).to.equal(false);
    });

    it("console.log вызывается через секунду", () => {
        delayedHello();
        expect(spy.called).to.equal(false);
        clock.tick(1000);
        expect(spy.called).to.equal(true);
    });

    it("в консоль пишется правильный текст, если имя передано", () => {
        delayedHello("Вероника");
        clock.tick(1000);
        expect(spy.firstCall).to.exist;
        expect(spy.firstCall.firstArg).to.be.equal("Привет, Вероника!");
    });

    it("в консоль пишется правильный текст, если имя не передано", () => {
        delayedHello();
        clock.tick(1000);
        expect(spy.firstCall).to.exist;
        expect(spy.firstCall.firstArg).to.be.equal("Привет, Незнакомец!");
    });
});
