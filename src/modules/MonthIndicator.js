// Month Class
// @params settings: object
// @params parentWatch: Watch instance
//
// Accepting a Moment object, the month is stored and based on its value, the
// month indicator is rotated 30 degrees to display the current month.

class MonthIndicator {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        this.element = document.getElementById(settings.id || settings);
        this.parent = parentWatch;
        this.month = this.parent.rightNow.month();

        this.retrograde = settings.retrograde || null;
        this.max = this.retrograde ? this.retrograde.max : 180;
        this.invert = settings.invert || false;

        if (!this.parent.testing) this.init();
    }

    errorChecking(settings) {
        if (typeof settings === 'object') {
            if (!settings.id) throw new ReferenceError("The Month class requires that an ID of the element be provided.");
        } else if (typeof settings !== 'string') {
            throw new ReferenceError('The Month Indicator class expects either a settings object or a string containing the element\'s ID.');
        }
    }

    getRotateValue() {
        let value = 0;

        if (this.retrograde) {
            let rotateValue = this.max / 12;
            value = this.month * rotateValue;
        } else {
            value = this.month * 30;
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

module.exports = MonthIndicator;