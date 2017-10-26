// Foudroyante Class
// @params settings: object
// @params parentWatch: Watch instance
//
// Based upon the amount in the steps property, the target element (defined by id)
// will jump [steps] amount of times around its dial per second. For example,
// if steps is set to 6, the hand will jump 60 (360 / 6) degrees every 1/6 of a second.

class Foudroyante {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.steps = settings.steps;
        this.degreeIncrement = 360 / this.steps;
        this.currentAngle = 0;

        this.interval;
    }

    errorChecking(settings) {
        if (!settings.id) throw new ReferenceError('The Foudroyante class requires that an ID of the indiciator element be provided.');
        if (!settings.steps) throw new ReferenceError('The Foudroyante requires a steps value.');
        if (settings.steps < 2 || settings.steps > 10) throw new ReferenceError('The Foudroyante requires a step value between 2-10.');
    }

    defineInterval() {
        this.interval = setInterval(() => {
            this.rotateHand();
        }, (1000 / this.steps));
    }

    clearInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    rotateHand() {
        if (this.currentAngle === (360 - this.degreeIncrement)) {
            this.currentAngle = 0;
        } else {
            this.currentAngle += this.degreeIncrement;
        }
        this.element.style.transform = `rotate(${this.currentAngle}deg)`;
    }

    init() {
        this.defineInterval();
    }
}

module.exports = Foudroyante;