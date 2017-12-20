// DayIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The day class recei ved a Moment object from the parent watch class. Based on
// this object's day, the element is rotated 51.43 degrees to show the day name.
// Additionally, the day indicator can be offset by the hours in which case the
// indicator is rotated an additional 2.14 degrees for each hour of the day.

class DayIndicator {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        this.element = document.getElementById(settings.id || settings);
        this.parent = parentWatch;
        this.day = this.parent.rightNow.day();
        this.hours = this.parent.rightNow.hours();
        this.offsetHours = settings.offsetHours || false;

        this.retrograde = settings.retrograde || null;
        this.max = this.retrograde ? this.retrograde.max : 180;
        this.invert = settings.invert || false;

        if (!this.parent.testing) this.init();
    }

    errorChecking(settings) {
        if (typeof settings === 'object') {
            if (!settings.id) throw new ReferenceError("The Day Indicator class requires that an ID of the element be provided.");
        } else if (typeof settings !== 'string') {
            throw new ReferenceError('The Day Indicator class expects either a settings object or a string containing the element\'s ID.');
        }
    }

    getRotateValue() {
        let value = 0;

        if (this.retrograde) {
            let rotateValue = this.max / 7;
            value = (this.day) * rotateValue;
        } else {
            value = this.day * 51.43;
            if (this.offsetHours) {
                value += this.hours * 2.14;
            }
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

module.exports = DayIndicator;