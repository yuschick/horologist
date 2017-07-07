const util = require('../util');

class Dial {
  constructor(settings, parentWatch) {
    try {
      if (!settings.hands)
        throw "The Dial class needs an object containing the HTML elements for the hands.";
      }
    catch (errorMsg) {
      console.error(errorMsg);
      return;
    }
    this.id = settings.id;
    this.hands = {};
    if (settings.hands.hour)
      this.hands.hour = document.getElementById(settings.hands.hour);
    if (settings.hands.minute)
      this.hands.minute = document.getElementById(settings.hands.minute);
    if (settings.hands.second)
      this.hands.second = document.getElementById(settings.hands.second);

    this.parent = parentWatch;

    this.format = settings.formnat
      ? settings.format
      : 12;
    this.gmtOffset = settings.offset
      ? settings.offset.toString()
      : null;

    this.rightNow = this.parent.rightNow;
    this.currentTime = {};

    this.rotateValues = {
      hoursRotateVal: this.format === 12
        ? 30
        : 15,
      hoursRotateValOffset: this.format === 12
        ? 0.5
        : 0.25,
      hourJump: 30,
      minutesRotateVal: 6
    };

    this.interval = null;
    this.crownActive = false;
    this.manualTime = false;
    this.settingTime = false;
    this.setSecondary = false;
    this.transition = null;

    this.init();
  }

  toggleActiveCrown() {
    this.crownActive = !this.crownActive;
  }

  toggleSecondaryTime() {
    this.setSecondary = !this.setSecondary;
  }

  toggleSettingTime() {
    this.settingTime = !this.settingTime;
  }

  updateToManualTime() {
    this.manualTime = true;
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.getCurrentTime();
      this.rotateHands();
    }, 1000);
  }

  stopInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  getCurrentTime() {
    this.rightNow = new Date();
    if (this.gmtOffset) {
      /* Shouts to: http://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/6016329/ */
      const gmt = this.rightNow.getTime() + (this.rightNow.getTimezoneOffset() * 60000);
      this.rightNow = new Date(gmt + (3600000 * this.gmtOffset));
    }

    let currentTime = {
      hours: this.rightNow.getHours(),
      minutes: this.rightNow.getMinutes(),
      seconds: this.rightNow.getSeconds()
    }

    this.currentTime = currentTime;
  }

  rotateHands(dir = null) {
    let rotateVal;

    if (this.hands.hour) {
      let hourOffset = this.setSecondary
        ? this.rotateValues.hourJump
        : this.rotateValues.hoursRotateValOffset;
      rotateVal = util.getCurrentRotateValue(this.hands.hour);
      if (this.settingTime) {
        if (dir) {
          rotateVal -= hourOffset;
        } else {
          rotateVal += hourOffset;
        }
      } else if (this.manualTime) {
        if (this.currentTime.seconds === 0) {
          rotateVal = util.getCurrentRotateValue(this.hands.hour) + this.rotateValues.hoursRotateValOffset;
        }
      } else {
        rotateVal = (this.currentTime.hours * this.rotateValues.hoursRotateVal) + (this.currentTime.minutes * this.rotateValues.hoursRotateValOffset);
      }

      this.hands.hour.style.transform = `rotate(${rotateVal}deg)`;
    }

    if (this.hands.minute) {
      rotateVal = util.getCurrentRotateValue(this.hands.minute);
      if (this.settingTime) {
        if (dir) {
          rotateVal -= this.rotateValues.minutesRotateVal;
        } else {
          rotateVal += this.rotateValues.minutesRotateVal;
        }
      } else if (this.manualTime) {
        if (this.currentTime.seconds === 0) {
          rotateVal += this.rotateValues.minutesRotateVal;
        }
      } else {
        rotateVal = this.currentTime.minutes * this.rotateValues.minutesRotateVal;
      }

      this.hands.minute.style.transform = `rotate(${rotateVal}deg)`;
    }

    if (this.hands.second) {
      rotateVal = this.currentTime.seconds * this.rotateValues.minutesRotateVal;

      if (rotateVal === 0) {
        this.transition = this.hands.second.style.transition;
        this.hands.second.style.transition = 'none';
      } else if (rotateVal > 0 && this.hands.second.style.transition === 'none') {
        this.hands.second.style.transition = this.transition;
      }

      this.hands.second.style.transform = `rotate(${rotateVal}deg)`;
    }
  }

  init() {
    setTimeout(() => {
      this.getCurrentTime();
      this.rotateHands();
    }, 350);
  }
}

module.exports = Dial;
