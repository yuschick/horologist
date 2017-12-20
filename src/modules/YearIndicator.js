// YearIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The year class accepts a Moment date object. The current year is stored and
// based upon its relationsbhip to the next leap year, an indicator is rotated
// to display that current relationship.

class YearIndicator {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        this.element = document.getElementById(settings.id || settings);
        this.parent = parentWatch;
        this.year = this.parent.rightNow.year();
        this.month = this.parent.rightNow.month();
        this.offsetMonths = settings.offsetMonths || false;
        this.invert = settings.invert || false;

        if (!this.parent.testing) this.init();
    }

    errorChecking(settings) {
        if (typeof settings === 'object') {
            if (!settings.id) throw new ReferenceError('The Year Indicator class requires that an ID of the indicator element be provided.');
        } else if (typeof settings !== 'string') {
            throw new ReferenceError('The Year Indicator class expects either a settings object or a string containing the element\'s ID.');
        }
    }

    getRotateValue() {
        let value = 0;

        if (((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0)) {
            value = 270;
        } else if (((this.year % 4 === 2) && (this.year % 100 !== 2)) || (this.year % 400 === 2)) {
            value = 90;
        } else if (((this.year % 4 === 3) && (this.year % 100 !== 3)) || (this.year % 400 === 3)) {
            value = 180;
        }

        if (this.offsetMonths) {
            value += this.month * 7.5;
        }

        if (this.invert) value *= -1;

        return value;
    }

    rotateElement() {
        this.element.style.transform = `rotate(${this.getRotateValue()}deg)`;
    }

    init() {
        this.rotateElement();
    }
}

module.exports = YearIndicator;