addListeners();

function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    let moveAndHideHandle = null;
    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            moveAndHideHandle && moveAndHideHandle.reset();
            moveAndHideHandle = animaster().moveAndHide(document.getElementById('moveAndHideBlock'), 5000);
        });
    document.getElementById('moveAndHideStop')
        .addEventListener('click', function () {
            moveAndHideHandle && moveAndHideHandle.stop();
        });
    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            moveAndHideHandle && moveAndHideHandle.reset();
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            animaster().showAndHide(document.getElementById('showAndHideBlock'), 5000);
        });

    let heartBeatingHandle = null;
    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            heartBeatingHandle && heartBeatingHandle.reset();
            heartBeatingHandle = animaster().heartBeating(document.getElementById('heartBeatingBlock'));
        });
    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            heartBeatingHandle && heartBeatingHandle.stop();
        });

    const customAnimation = animaster()
        .addMove(200, {x: 40, y: 40})
        .addScale(800, 1.3)
        .addMove(200, {x: 80, y: 0})
        .addScale(800, 1)
        .addMove(200, {x: 40, y: -40})
        .addScale(800, 0.7)
        .addMove(200, {x: 0, y: 0})
        .addScale(800, 1);

    let customAnimationHandle = null;
    document.getElementById('customAnimationPlay')
        .addEventListener('click', function () {
            customAnimationHandle = customAnimation.play(document.getElementById('customAnimationBlock'));
        });
    document.getElementById('customAnimationReset')
        .addEventListener('click', function () {
            customAnimationHandle && customAnimationHandle.reset();
        });

    const worryAnimationHandler = animaster()
        .addMove(200, {x: 80, y: 0})
        .addMove(200, {x: 0, y: 0})
        .addMove(200, {x: 80, y: 0})
        .addMove(200, {x: 0, y: 0})
        .buildHandler();

    document.getElementById('worryAnimationBlock')
        .addEventListener('click', worryAnimationHandler);
}

function animaster() {
    function getTransform(translation, ratio) {
        const result = [];
        if (translation) {
            result.push(`translate(${translation.x}px,${translation.y}px)`);
        }
        if (ratio) {
            result.push(`scale(${ratio})`);
        }
        return result.join(' ');
    }

    function playSteps(element, steps, cycled) {
        let stopped = false;
        const resetActions = {};

        let transform = {};
        let restSteps = null;

        function playStep() {
            if (stopped || steps.length === 0) {
                return;
            }

            if (!restSteps || restSteps.length === 0 && cycled) {
                restSteps = [...steps];
            } else if (restSteps.length === 0) {
                return;
            }

            const step = restSteps.shift();

            if (step.translation) {
                transform.translation = step.translation;
                resetActions.moveAndScale = resetMoveAndScale;
            }
            if (step.ratio) {
                transform.ratio = step.ratio;
                resetActions.moveAndScale = resetMoveAndScale;
            }
            element.style.transform = getTransform(transform.translation, transform.ratio);

            element.style.transitionDuration =  step.duration ? `${step.duration}ms` : null;

            if (step.fadeIn) {
                element.classList.remove('hide');
                element.classList.add('show');
                resetActions.fadeIn = resetFadeIn;
            }
            if (step.fadeOut) {
                element.classList.remove('show');
                element.classList.add('hide');
                resetActions.fadeOut = resetFadeOut;
            }

            setTimeout(() => {
                playStep();
            }, step.duration || 0);
        }

        setTimeout(() => {
            playStep();
        }, 0);

        return {
            stop: () => {
                stopped = true;
            },
            reset: () => {
                stopped = true;
                for(const action of Object.values(resetActions)) {
                    action(element);
                }
            }
        };
    }

    function play(element, cycled = false) {
        return playSteps(element, this._steps, cycled);
    }

    function buildHandler() {
        const that = this;

        return function () {
            that.play(this);
        };
    }

    function resetFadeIn(element) {
        element.style.transitionDuration = null;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function resetFadeOut(element) {
        element.style.transitionDuration = null;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function resetMoveAndScale(element) {
        element.style.transitionDuration =  null;
        element.style.transform = null;
    }

    function addDelay(duration) {
        this._steps.push({
            duration: duration,
        });
        return this;
    }

    function addFadeIn(duration) {
        this._steps.push({
            fadeIn: true,
            duration: duration,
        });
        return this;
    }

    function fadeIn(element, duration) {
        this.addFadeIn(duration).play(element);
    }

    function addFadeOut(duration) {
        this._steps.push({
            fadeOut: true,
            duration: duration,
        });
        return this;
    }

    function fadeOut(element, duration) {
        this.addFadeOut(duration).play(element);
    }

    function addMove(duration, translation) {
        this._steps.push({
            duration: duration,
            translation: translation,
        });
        return this;
    }

    function move(element, duration, translation) {
        this.addMove(duration, translation).play(element);
    }

    function addScale(duration, ratio) {
        this._steps.push({
            duration: duration,
            ratio: ratio,
        });
        return this;
    }

    function scale(element, duration, ratio) {
        this.addScale(duration, ratio).play(element);
    }

    function moveAndHide(element, duration) {
        return this
            .addMove(duration*2/5, {x: 100, y: 20})
            .addFadeOut(duration*3/5)
            .play(element);
    }

    function showAndHide(element, duration) {
        return this
            .addFadeIn(duration*1/3)
            .addDelay(duration*1/3)
            .addFadeOut(duration*1/3)
            .play(element);
    }

    function heartBeating(element) {
        return this
            .addScale(500, 1.4)
            .addScale(500, 1.0)
            .play(element, true);
    }

    return {
        _steps: [],
        buildHandler,
        play,
        addDelay,
        addFadeIn,
        addFadeOut,
        addMove,
        addScale,
        fadeIn,
        fadeOut,
        move,
        scale,
        moveAndHide,
        showAndHide,
        heartBeating
    };
}
