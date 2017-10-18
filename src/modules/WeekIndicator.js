// Week Indicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The Week Class will rotate an element to depict the 
// current week of the year. By default, this class expects 
// 52 weeks per year but an iso boolean can be passed
// to account for a 53rd week. The week indicator
// element can rotate either direction based on the 
// invert boolean as well.

class WeekIndicator {
    constructor(settings, parentWatch) {
        this.errorChecking();

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.iso = settings.iso || false;
        this.invert = settings.invert || false;

        this.week = 0;
        this.weekAmount = this.iso ? 53 : 52;
        this.increment = 360 / this.weekAmount;

        this.init();
    }

    errorChecking() {
        try {
            if (!settings.id)
                throw "The Week Indicator class requires that an ID of the indicator element be provided.";
        } catch (errorMsg) {
            console.error(errorMsg);
            return;
        }
    }

    getWeekValue() {
        const rightNow = this.parent.rightNow;
        this.week = this.iso ? rightNow.isoWeek() - 1 : rightNow.week() - 1;

        this.rotateHands();
    }

    rotateHands() {
        let rotateVal = this.week * this.increment;
        if (this.invert) rotateVal *= -1;

        this.element.style.transform = `rotate(${rotateVal}deg)`;
    }

    init() {
        this.getWeekValue();
    }
}

module.exports = WeekIndicator;