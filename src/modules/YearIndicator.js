// YearIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The year class accepts a Moment date object. The current year is stored and
// based upon its relationsbhip to the next leap year, an indicator is rotated
// to display that current relationship.

class YearIndicator {
  constructor(settings, parentWatch) {

    try {
      if (!settings.id)
        throw "The Month Indicator class requires that an ID of the indicator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.parent = parentWatch;
    this.year = this.parent.rightNow.year();
    this.month = this.parent.rightNow.month();
    this.offsetMonths = settings.offsetMonths || false;

    this.init();
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
