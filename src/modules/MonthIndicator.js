// Month Class
// @params settings: object
// @params parentWatch: Watch instance
//
// Accepting a Moment object, the month is stored and based on its value, the
// month indicator is rotated 30 degrees to display the current month.

class MonthIndicator {
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
    this.month = this.parent.rightNow.month();

    this.retrograde = settings.retrograde || null;
    this.max = this.retrograde ? this.retrograde.max : 180;

    this.init();
  }

  getRotateValue() {
    let value = 0;

    if (this.retrograde) {
      let rotateValue = this.max / 12;
      value = this.month * rotateValue;
    } else {
      value = this.month * 30;
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

module.exports = MonthIndicator;
