"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dial Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The Dial class also brings in Moment-Timezone to better support
// timezone values for dual-time displays. Based on the given time of the current
// or provided timezone, hour, minute, and second hands are rotated.
// The dial class supports telling time in 12 or 24 hour formats. Based on this
// format, the hour hand is either rotated 30 or 15 degrees per hour.

var Timezone = require("moment-timezone");

var Dial = function () {
  function Dial(settings, parentWatch) {
    _classCallCheck(this, Dial);

    this.errorChecking(settings);

    if (this.error) return;

    this.name = settings.name;
    this.hands = {};
    if (settings.hands.hour) {
      if (typeof settings.hands.hour === "string") {
        this.hands.hour = document.getElementById(settings.hands.hour);
      } else if (_typeof(settings.hands.hour) === "object") {
        this.hands.hour = {};
        this.splitHours = true;
        this.hands.hour.ones = document.getElementById(settings.hands.hour.ones);
        this.hands.hour.tenths = document.getElementById(settings.hands.hour.tenths);
        this.hands.hour.invert = settings.hands.hour.invert;
      }
    }

    if (settings.hands.minute) {
      if (typeof settings.hands.minute === "string") {
        this.hands.minute = document.getElementById(settings.hands.minute);
      } else if (_typeof(settings.hands.minute) === "object") {
        this.hands.minute = {};
        this.splitMinutes = true;
        this.hands.minute.ones = document.getElementById(settings.hands.minute.ones);
        this.hands.minute.tenths = document.getElementById(settings.hands.minute.tenths);
        this.hands.minute.invert = settings.hands.minute.invert;
      }
    }

    if (settings.hands.second) {
      if (typeof settings.hands.second === "string") {
        this.hands.second = document.getElementById(settings.hands.second);
      } else if (_typeof(settings.hands.second) === "object") {
        this.hands.second = document.getElementById(settings.hands.second.id);
      }

      this.sweepingSeconds = settings.hands.second.sweep || false;
      this.jumpingSeconds = settings.hands.second.jump || false;
    }

    this.retrograde = {};

    if (settings.retrograde) {
      if (settings.retrograde.second) {
        this.retrograde.second = {
          hand: document.getElementById(settings.retrograde.second.id),
          max: settings.retrograde.second.max || 180,
          duration: settings.retrograde.second.duration || 60,
          increment: settings.retrograde.second.max / (settings.retrograde.second.duration || 60)
        };
        this.hands.second = this.retrograde.second.hand;
      }
    }

    this.parent = parentWatch;

    this.format = settings.format ? settings.format : 12;

    this.timezone;
    if (settings.timezone) {
      this.timezone = settings.timezone;
    } else {
      this.timezone = Timezone.tz.guess();
    }

    this.rightNow = this.parent.rightNow;
    this.currentTime = {};

    this.rotateValues = {
      hoursRotateVal: this.format === 12 ? 30 : 15,
      hoursRotateValOffset: this.format === 12 ? 0.5 : 0.25,
      hourJump: 30,
      hoursplit: {
        ones: 36,
        tenths: 120
      },
      minutesplit: {
        ones: 36,
        tenths: 60
      },
      minutesRotateVal: 6
    };

    this.interval = null;
    this.crownActive = false;
    this.manualTime = false;
    this.settingTime = false;
    this.transition = {};
    this.isSet - false;

    if (!this.parent.testing) this.init();
  }

  _createClass(Dial, [{
    key: "errorChecking",
    value: function errorChecking(settings) {
      if (!settings.hands) {
        throw new ReferenceError("The Dial class needs an object containing the HTML elements for the hands.");
      }

      if (_typeof(settings.hands.hour) === "object" && (!settings.hands.hour.id || !settings.hands.hour.ones || !settings.hands.hour.tenths) || _typeof(settings.hands.minute) === "object" && (!settings.hands.minute.id || !settings.hands.minute.ones || !settings.hands.minute.tenths)) {
        throw new ReferenceError("A split display requires that the 'ones' and 'tenths' properties are both set.");
      }

      if (settings.retrograde && settings.retrograde.second && !settings.retrograde.second.id) {
        throw new ReferenceError("The retrograde second requires an id property be provided.");
      }

      if (settings.retrograde && settings.hands.second && settings.retrograde.second) {
        throw new ReferenceError("A dial can only support one second hand at a time - either traditional or retrograde.");
      }

      if (settings.retrograde && settings.retrograde.second.duration < 5) {
        throw new ReferenceError("The retrograde second hand requires a duration no less than 5.");
      }

      if (settings.retrograde && 60 % settings.retrograde.second.duration != 0) {
        throw new ReferenceError("The retrograde second hand requires a duration that is evenly divisble by 60.");
      }
    }
  }, {
    key: "applySweepingTransition",
    value: function applySweepingTransition() {
      if (this.sweepingSeconds) {
        this.hands.second.style.transition = "transform 1s linear";
      } else if (this.jumpingSeconds) {
        this.hands.second.style.transition = "transform 1s";
        this.hands.second.style.transitionTimingFunction = "steps(1, start)";
      } else {
        this.hands.second.style.transition = "transform 1s";
        this.hands.second.style.transitionTimingFunction = "steps(7, start)";
      }
    }
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      this.rightNow = this.parent.rightNow.tz(this.timezone);
      var currentTime = void 0;

      currentTime = {
        hours: this.rightNow.hours(),
        minutes: this.rightNow.minutes(),
        seconds: this.rightNow.seconds()
      };

      this.currentTime = currentTime;
    }
  }, {
    key: "checkForDayNightUpdates",
    value: function checkForDayNightUpdates() {
      this.parent.dayNightIndicator.convertAngleToHours(this.name);
    }
  }, {
    key: "rotateHands",
    value: function rotateHands() {
      var rotateVal = void 0;

      if (this.hands.hour) {
        rotateVal = this.splitHours ? {
          ones: this.parent.getCurrentRotateValue(this.hands.hour.ones),
          tenths: this.parent.getCurrentRotateValue(this.hands.hour.tenths)
        } : this.parent.getCurrentRotateValue(this.hands.hour);
        if (this.splitHours) {
          if (this.currentTime.hours <= 10) {
            rotateVal.ones = this.currentTime.hours * this.rotateValues.hoursplit.ones;
            rotateVal.tenths = Math.floor(this.currentTime.hours / 10) * this.rotateValues.hoursplit.tenths;
          } else {
            if (this.format === 24) {
              rotateVal.ones = (this.currentTime.hours - 10) * this.rotateValues.hoursplit.ones;
              rotateVal.tenths = Math.floor(this.currentTime.hours / 10) * this.rotateValues.hoursplit.tenths;
            } else {
              if (this.currentTime.hours > 12) {
                rotateVal.ones = (this.currentTime.hours - 12) % 10 * this.rotateValues.hoursplit.ones;
                rotateVal.tenths = Math.floor((this.currentTime.hours - 12) / 10) * this.rotateValues.hoursplit.tenths;
              } else {
                rotateVal.ones = this.currentTime.hours % 10 * this.rotateValues.hoursplit.ones;
                rotateVal.tenths = Math.floor(this.currentTime.hours / 10) * this.rotateValues.hoursplit.tenths;
              }
            }
          }

          if (this.hands.hour.invert) {
            rotateVal.ones *= -1;
            rotateVal.tenths *= -1;
          }
        } else {
          rotateVal = this.currentTime.hours * this.rotateValues.hoursRotateVal + this.currentTime.minutes * this.rotateValues.hoursRotateValOffset;
        }

        if (!this.splitHours && rotateVal === 0 || rotateVal >= 360) {
          this.transition.hour = this.hands.hour.style.transition;
          this.hands.hour.style.transition = "none";
        } else if (!this.splitHours && rotateVal > 0 && this.hands.hour.style.transition === "none") {
          this.hands.hour.style.transition = this.transition.hour;
        }

        if (this.splitHours) {
          if (rotateVal.ones < 0) {
            rotateVal.ones += 360;
          }
          if (rotateVal.tenths < 360) {
            rotateVal.tenths += 360;
          }
          if (rotateVal.ones > 360) {
            rotateVal.ones -= 360;
          }
          if (rotateVal.tenths > 360) {
            rotateVal.tenths -= 360;
          }
        } else {
          if (rotateVal > 360) {
            rotateVal -= 360;
          }
        }

        if (this.splitHours) {
          this.hands.hour.ones.style.transform = "rotate(" + rotateVal.ones + "deg)";
          this.hands.hour.tenths.style.transform = "rotate(" + rotateVal.tenths + "deg)";
        } else {
          this.hands.hour.style.transform = "rotate(" + rotateVal + "deg)";
        }
      }

      if (this.hands.minute) {
        rotateVal = this.splitMinutes ? {
          ones: this.parent.getCurrentRotateValue(this.hands.minute.ones),
          tenths: this.parent.getCurrentRotateValue(this.hands.minute.tenths)
        } : this.parent.getCurrentRotateValue(this.hands.minute);
        if (this.splitMinutes) {
          if (this.currentTime.minutes % 10) {
            rotateVal.ones = this.currentTime.minutes * this.rotateValues.minutesplit.ones;
          } else {
            rotateVal = (this.currentTime.minutes - 10) * this.rotateValues.minutesplit.ones;
          }

          rotateVal.tenths = Math.floor(this.currentTime.minutes / 10) * this.rotateValues.minutesplit.tenths;

          if (this.hands.minute.invert) {
            rotateVal.ones *= -1;
            rotateVal.tenths *= -1;
          }
        } else {
          rotateVal = this.currentTime.minutes * this.rotateValues.minutesRotateVal;
        }

        if (!this.splitMinutes && rotateVal === 0) {
          this.transition.minute = this.hands.minute.style.transition;
          this.hands.minute.style.transition = "none";
        } else if (!this.splitMinutes && rotateVal > 0 && this.hands.minute.style.transition === "none") {
          this.hands.minute.style.transition = this.transition.minute;
        }

        if (this.splitMinutes) {
          if (rotateVal.ones < 0) {
            rotateVal.ones += 360;
          }
          if (rotateVal.tenths < 360) {
            rotateVal.tenths += 360;
          }
          if (rotateVal.ones > 360) {
            rotateVal.ones -= 360;
          }
          if (rotateVal.tenths > 360) {
            rotateVal.tenths -= 360;
          }
        }

        if (this.splitMinutes) {
          this.hands.minute.ones.style.transform = "rotate(" + rotateVal.ones + "deg)";
          this.hands.minute.tenths.style.transform = "rotate(" + rotateVal.tenths + "deg)";
        } else {
          this.hands.minute.style.transform = "rotate(" + rotateVal + "deg)";
        }
      }

      if (this.hands.second) {
        if (!this.isSet) {
          rotateVal = this.currentTime.seconds * this.rotateValues.minutesRotateVal;
          this.isSet = true;
        } else {
          rotateVal = this.parent.getCurrentRotateValue(this.hands.second) + this.rotateValues.minutesRotateVal;
        }

        this.hands.second.style.transform = "rotate(" + rotateVal + "deg)";
      }

      if (this.parent.dayNightIndicator) this.checkForDayNightUpdates();
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      setTimeout(function () {
        _this.getCurrentTime();
        _this.rotateHands();

        setTimeout(function () {
          if (_this.hands.second) {
            _this.applySweepingTransition();
          }
        }, 100);
      }, 350);
    }
  }]);

  return Dial;
}();

module.exports = Dial;