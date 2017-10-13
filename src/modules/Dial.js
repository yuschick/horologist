// Dial Class
// @params settings: object
// @params parentWatch: Watch instance
// @params parentId: Optional. The ID of the watch (in HTML)
//
// The Dial class also brings in Moment-Timezone to better support GMTOffsets and
// timezone values for dual-time displays. Based on the given time of the current
// or provided timezone, hour, minute, and second hands are rotated.
// The dial class supports telling time in 12 or 24 hour formats. Based on this
// format, the hour hand is either rotated 30 or 15 degrees per hour.

const Timezone = require('moment-timezone');

function getElementByClassOrId(elementName, parentId, defaultElementName) {
  if (!elementName && !parentId)
    return null;

  const elementNameAsId = elementName ? "#" + elementName : "#" + defaultElementName;
  const elementNameAsClass = elementName ? "." + elementName : "." + defaultElementName;
  const parentIdSelector = "#" + parentId;
  let element;

  if (parentId) {
    element = document.querySelector(parentIdSelector + " " + elementNameAsClass) || document.querySelector(parentIdSelector + " " + elementNameAsId);

    if (!element && elementName) {
      // Log it and try to retrieve it by id in the whole document instead as last resource
      console.warn("Element '" + elementName + "' could not be found inside '" + parentId + "'");
      element = document.getElementById(elementName);
    }
  } else {
    element = document.getElementById(elementName);
  }

  return element;
}

class Dial {
  constructor(settings, parentWatch, parentId) {
    try {
      this.name = settings.name;
      this.hands = {};

      let hourHandName, minuteHandName, secondHandName;

      if (settings.hands) {
        hourHandName = settings.hands.hour;
        minuteHandName = settings.hands.minute;
        secondHandName = settings.hands.second;
      }
      this.hands.hour = getElementByClassOrId(hourHandName, parentId, "hands-hour");
      this.hands.minute = getElementByClassOrId(minuteHandName, parentId, "hands-minute");
      this.hands.second = getElementByClassOrId(secondHandName, parentId, "hands-second");

      this.retrograde = {};

      let retrogradeSecondHand, retrogradeSecondHandName,
          maxSecond = 180, secondDuration = 60; // Defaults
      if (settings.retrograde && settings.retrograde.second) {
        if (settings.retrograde.second.max)
          maxSecond = settings.retrograde.second.max;
        if (settings.retrograde.second.duration)
          secondDuration = settings.retrograde.second.duration;

        retrogradeSecondHandName = settings.retrograde.second.id;
      }
      retrogradeSecondHand = getElementByClassOrId(retrogradeSecondHandName, parentId, "retrograde-second");

      if (retrogradeSecondHand) {
        this.retrograde.second = {
          max: maxSecond,
          duration: secondDuration,
          increment: maxSecond / secondDuration,
          hand: retrogradeSecondHand
        };
        this.checkRetrograde();

        this.hands.second = retrogradeSecondHand;
      }

      this.errorChecking();
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.parent = parentWatch;

    this.format = settings.format ?
      settings.format :
      12;

    if (settings.timezone) {
      this.timezone = settings.timezone;
    } else if (!settings.timezone && settings.offset) {
      this.timezone = null;
      this.gmtOffset = settings.offset ? settings.offset.toString() : null;
    } else {
      this.timezone = Timezone.tz.guess();
    }

    this.sweepingSeconds = settings.sweep || false;

    this.rightNow = this.parent.rightNow;
    this.currentTime = {};

    this.rotateValues = {
      hoursRotateVal: this.format === 12 ?
        30 : 15,
      hoursRotateValOffset: this.format === 12 ?
        0.5 : 0.25,
      hourJump: 30,
      minutesRotateVal: 6
    };

    this.interval = null;
    this.crownActive = false;
    this.manualTime = false;
    this.settingTime = false;
    this.transition = {};

    this.init();
  }

  errorChecking() {
    if (!this.hands.hour && !this.hands.minute && !this.hands.second)
      throw "The Dial class needs at least one hand to be specified (hour, minute, second, retrograde).";
  }

  checkRetrograde() {
    if (this.hands.second && this.retrograde.second)
      throw "A dial can only support one second hand at a time - either traditional or retrograde.";

    if (this.retrograde.second && !this.retrograde.second.hand)
        throw "The retrograde second requires a hand element to be provided.";

    if (this.retrograde.second && this.retrograde.second.duration) {
      if (this.retrograde.second.duration < 5)
        throw "The retrograde second hand requires a duration no less than 5.";

      if ((60 % this.retrograde.second.duration) !== 0)
        throw "The retrograde second hand requires a duration that is evenly divisible by 60.";
    }
  }

  toggleActiveCrown() {
    this.crownActive = !this.crownActive;
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

  applySweepingTransition() {
    this.hands.second.style.transition = 'transform 1s linear';
  }

  getCurrentTime() {
    this.rightNow = this.gmtOffset && !this.timezone ? new Date() : this.parent.rightNow.tz(this.timezone);
    let currentTime;

    if (this.gmtOffset && !this.timezone) {
      /* passed in a gmtOffset like +8 */
      /* Shouts to: http://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/6016329/ */
      const gmt = this.rightNow.getTime() + (this.rightNow.getTimezoneOffset() * 60000);
      this.rightNow = new Date(gmt + (3600000 * this.gmtOffset));

      currentTime = {
        hours: this.rightNow.getHours(),
        minutes: this.rightNow.getMinutes(),
        seconds: this.rightNow.getSeconds()
      }
    } else {
      /* passed in a Moment Timezone valid string */
      currentTime = {
        hours: this.rightNow.hours(),
        minutes: this.rightNow.minutes(),
        seconds: this.rightNow.seconds()
      }
    }

    this.currentTime = currentTime;
  }

  checkForDayNightUpdates() {
    this.parent.dayNightIndicator.convertAngleToHours(this.name);
  }

  rotateHands(dir = null) {
    let rotateVal;

    if (this.hands.hour) {
      let hourOffset = this.rotateValues.hoursRotateValOffset;
      rotateVal = this.parent.getCurrentRotateValue(this.hands.hour);
      if (this.settingTime) {
        if (dir) {
          rotateVal -= hourOffset;
        } else {
          rotateVal += hourOffset;
        }
      } else if (this.manualTime) {
        if (this.currentTime.seconds === 0) {
          rotateVal = this.parent.getCurrentRotateValue(this.hands.hour) + this.rotateValues.hoursRotateValOffset;
        }
      } else {
        rotateVal = (this.currentTime.hours * this.rotateValues.hoursRotateVal) + (this.currentTime.minutes * this.rotateValues.hoursRotateValOffset);
      }

      if (rotateVal === 0 || rotateVal >= 360) {
        this.transition.hour = this.hands.hour.style.transition;
        this.hands.hour.style.transition = 'none';
      } else if (rotateVal > 0 && this.hands.hour.style.transition === 'none') {
        this.hands.hour.style.transition = this.transition.hour;
      }

      if (rotateVal > 360) {
        rotateVal -= 360;
      }

      this.hands.hour.style.transform = `rotate(${rotateVal}deg)`;
    }

    if (this.hands.minute) {
      rotateVal = this.parent.getCurrentRotateValue(this.hands.minute);
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

      if (rotateVal === 0) {
        this.transition.minute = this.hands.minute.style.transition;
        this.hands.minute.style.transition = 'none';
      } else if (rotateVal > 0 && this.hands.minute.style.transition === 'none') {
        this.hands.minute.style.transition = this.transition.minute;
      }

      this.hands.minute.style.transform = `rotate(${rotateVal}deg)`;
    }

    if (this.hands.second) {
      if (this.retrograde.second) {
        rotateVal = this.currentTime.seconds * this.retrograde.second.increment;
      } else {
        rotateVal = this.currentTime.seconds * this.rotateValues.minutesRotateVal;
      }

      if (this.retrograde.second && rotateVal > this.retrograde.second.max) {
        rotateVal = rotateVal % this.retrograde.second.max || this.retrograde.second.max;
      }
      
      if (
          rotateVal === 0 ||
          (
            this.retrograde.second &&
            rotateVal === this.retrograde.second.increment &&
            this.hands.second.style.transition !== 'none'
          )
         ) {
        this.transition.second = this.hands.second.style.transition;
        this.hands.second.style.transition = 'none';
      } else if (rotateVal > 0 && this.hands.second.style.transition === 'none') {
        this.hands.second.style.transition = this.transition.second;
      }

      this.hands.second.style.transform = `rotate(${rotateVal}deg)`;
    }

    if (this.parent.dayNightIndicator) this.checkForDayNightUpdates();
  }

  init() {
    setTimeout(() => {
      this.getCurrentTime();
      this.rotateHands();

      setTimeout(() => {
        if (this.hands.second && this.sweepingSeconds) {
          this.applySweepingTransition();
        }
      }, 100);

    }, 350);
  }
}

module.exports = Dial;
