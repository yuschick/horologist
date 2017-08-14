// DayNightIndicator Class
// @params dial: object
// @params settings: object
// @params parentWatch: Watch instance
//
// Based upon the supplied dial, which by default is the 0th index of the dials array
// on the parent watch class, an indicator will be rotated to show the day/night
// value. Think of this complication more of an AM/PM indicator. From 12-06 AM
// the indicator is shown in full day. And from 18-24 the indicator is shown in
// full night. The hours in between the dial in shown split meaning the day is
// split into fourths and the indicator is rotated 25 degrees for each.

class DayNightIndicator {
  constructor(dial, settings, parentWatch) {

    try {
      if (!settings.id)
        throw "The DayNightIndicator class requires that an ID of the indiciator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.dial = dial;
    this.hands = dial.hands;
    this.parent = parentWatch;
    this.invert = settings.invert || false;

    this.hours = this.parent.rightNow.hours();
    this.isAM = this.hours < 12 ? true : false;

    this.hourAngle = 0;
    this.hourDivisor = dial.format === 12 ?
      30 :
      15;

    this.init();
  }

  toggleAMPM() {
    this.isAM = !this.isAM;
  }

  removeTransitionDuration() {
    this.element.style.transition = 'none';
  }

  rotateIndicator() {
    let rotateValue = 0;

    if (this.hours >= 0 && this.hours < 6) {
      rotateValue = this.invert ? 180 : 0;
    } else if (this.hours >= 6 && this.hours < 12) {
      rotateValue = 90;
    } else if (this.hours >= 12 && this.hours < 18) {
      rotateValue = this.invert ? 0 : 180;
    } else {
      rotateValue = 270;
    }

    if (this.invert) rotateValue = rotateValue * -1;

    this.element.style.transform = `rotate(${rotateValue}deg)`;
  }

  getHourHandAngle() {
    this.hourAngle = this.parent.getCurrentRotateValue(this.hands.hour);
  }

  convertAngleToHours(name) {
    if (name !== this.dial.name) return;

    this.getHourHandAngle();

    if (this.hourAngle === 360) {
      this.toggleAMPM();
    }

    this.hours = Math.floor(this.hourAngle / this.hourDivisor);
    this.hours = this.isAM ? this.hours : this.hours + 12;
    this.hours = this.hours === 24 ? 0 : this.hours;

    this.rotateIndicator();
  }

  init() {
    this.removeTransitionDuration();
    this.rotateIndicator();
  }
}

module.exports = DayNightIndicator;
