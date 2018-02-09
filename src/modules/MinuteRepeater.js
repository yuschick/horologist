// MinuteRepeater Class
// @params dial: object
// @params settings: object
// @params parentWatch: Watch instance
//
// The minuterepeater class accepts a dial, or defaults to the 0th index of the
// dials array on the parent Watch class, and based on the hands' rotation values
// calculates the amount of hours, quarter hours, and remaining minutes. With
// these values, the class then plays back chimes to audibly indicate the time.

class MinuteRepeater {
    constructor(dial, repeater, parentWatch) {
        this.errorChecking(dial, repeater);

        this.hands = dial.hands;

        this.hourAngle = 0;
        this.hourChimes = 0;
        this.hourElement = null;
        this.hourDivisor = dial.format === 12 ?
            30 :
            15;

        this.allMinutes = 0;
        this.minuteAngle = 0;
        this.fifteenMinuteChimes = 0;
        this.fifteenMinuteElement = null;
        this.minuteChimes = 0;
        this.minuteElement = null;

        this.trigger = document.getElementById(repeater.id || repeater.trigger);
        this.chimes = repeater.chimes;
        this.hourChimeDuration = 0;
        this.counter = 1;
        this.isPlaying = false;
        this.quartersPlaying = false;
        this.minutesPlaying = false;
        this.parent = parentWatch;

        if (!this.parent.testing) this.init();
    }

    errorChecking(dial, settings) {
        if (!settings.id && !settings.trigger) throw new ReferenceError('The MinuteRepeater class requires that an ID of the repeater element be provided.');
        if (!dial.hands.minute) throw new ReferenceError('The minute repeater, like, by definition, requires a dial which supports a minute hand.');
    }

    convertAngleToIncrements() {
        this.hourAngle = this.parent.getCurrentRotateValue(this.hands.hour);
        if (this.hourAngle > 360) {
            this.hourAngle -= 360;
        }
        this.hourChimes = Math.floor(this.hourAngle / this.hourDivisor) || 12;

        this.minuteAngle = this.parent.getCurrentRotateValue(this.hands.minute);
        if (this.minuteAngle > 360) {
            this.minuteAngle %= 360;
        }
        this.allMinutes = Math.floor(this.minuteAngle / 6);
        this.fifteenMinuteChimes = Math.floor(this.allMinutes / 15);
        this.minuteChimes = Math.floor(this.allMinutes - (this.fifteenMinuteChimes * 15));
    }

    bindEvents() {
        this.trigger.addEventListener('click', () => {
            this.toggleActiveState(this.trigger);
            this.togglePlaying();
        });

        this.trigger.addEventListener('transitionend', () => {
            if (this.trigger.classList.contains('active')) this.toggleActiveState(this.trigger);
        });

        this.hourElement.addEventListener('ended', () => {
            if (!this.quartersPlaying && !this.minutesPlaying) {
                this.playHours();
            }
        });

        if (this.chimes.quarter) {
            this.fifteenMinuteElement.addEventListener("ended", () => {
                this.playQuarterHours();
            });
        }

        this.minuteElement.addEventListener('ended', () => {
            if (this.quartersPlaying) {
                this.playQuarterHours();
            } else {
                this.playMinutes();
            }
        });
    }

    toggleActiveState(btn) {
        btn.classList.toggle('active');
    }

    stopAll() {
        this.hourElement.pause();
        this.hourElement.currentTime = 0;

        if (this.chimes.quarter) {
            this.fifteenMinuteElement.pause();
            this.fifteenMinuteElementcurrentTime = 0;
        }

        this.minuteElement.pause();
        this.minuteElementcurrentTime = 0;

        this.counter = 1;
        this.isPlaying = false;
        this.quartersPlaying = false;
        this.minutesPlaying = false;
    }

    togglePlaying() {
        if (this.parent.globalInterval) {
            this.isPlaying = !this.isPlaying;

            if (this.isPlaying) {
                this.convertAngleToIncrements();
                this.playHours();
            } else {
                this.stopAll();
            }
        }
    }

    playHours() {
        if (this.counter <= this.hourChimes) {
            this.hourElement.play();
            this.counter++;
        } else if (this.counter === this.hourChimes + 1) {
            this.counter = 1;
            this.playQuarterHours();
        }
    }

    playQuarterHours() {
        if (this.chimes.quarter) {
            this.playFifteenMinutes();
        } else {
            if (this.counter <= this.fifteenMinuteChimes) {
                this.quartersPlaying = true;
                this.hourElement.play();
                setTimeout(() => {
                    this.minuteElement.play();
                    this.counter++;
                }, this.hourChimeDuration / 2 * 500);
            } else {
                this.quartersPlaying = false;
                this.minutesPlaying = true;
                this.counter = 1;
                this.playMinutes();
            }
        }
    }

    playFifteenMinutes() {
        if (this.counter <= this.fifteenMinuteChimes) {
            this.fifteenMinuteElement.play();
            this.counter++;
        } else if (this.counter === this.fifteenMinuteChimes + 1) {
            this.counter = 1;
            this.playMinutes();
        }
    }

    playMinutes() {
        if (this.counter <= this.minuteChimes) {
            this.minuteElement.play();
            this.counter++;
        } else if (this.counter === this.minuteChimes + 1) {
            this.stopAll();
        }
    }

    buildAudioElements() {
        this.hourElement = document.createElement('audio');
        this.hourElement.src = this.chimes.hour;
        document.body.appendChild(this.hourElement);

        this.hourElement.addEventListener("loadedmetadata", () => {
            this.hourChimeDuration = this.hourElement.duration;
        }, false);

        if (this.chimes.quarter) {
            this.fifteenMinuteElement = document.createElement("audio");
            this.fifteenMinuteElement.src = this.chimes.quarter;
            document.body.appendChild(this.fifteenMinuteElement);
        }


        this.minuteElement = document.createElement('audio');
        this.minuteElement.src = this.chimes.minute;
        document.body.appendChild(this.minuteElement);
    }

    updateCursorForTrigger() {
        this.trigger.style.cursor = 'pointer';
    }

    init() {
        this.buildAudioElements();
        this.bindEvents();
        this.updateCursorForTrigger();
    }
}

module.exports = MinuteRepeater;