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

        try {
            if (!settings.id)
                throw "The Day Indicator class requires that an ID of the indicator element be provided.";
        } catch (errorMsg) {
            console.error(errorMsg);
            return;
        }

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.day = this.parent.rightNow.day();
        this.hours = this.parent.rightNow.hours();
        this.offsetHours = settings.offsetHours || false;

        this.retrograde = settings.retrograde || null;
        this.max = this.retrograde ? this.retrograde.max : 180;
        this.invert = settings.invert || false;

        this.init();
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