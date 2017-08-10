"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayNightIndicator = function () {
  function DayNightIndicator(dial, settings, parentWatch) {
    _classCallCheck(this, DayNightIndicator);

    try {
      if (!settings.id) throw "The DayNightIndicator class requires that an ID of the indiciator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.dial = dial;
    this.hands = dial.hands;
    this.parent = parentWatch;
    this.invert = settings.invert || false;

    this.hours = this.parent.rightNow.getHours();
    this.isAM = this.hours < 12 ? true : false;

    this.hourAngle = 0;
    this.hourDivisor = dial.format === 12 ? 30 : 15;

    this.init();
  }

  _createClass(DayNightIndicator, [{
    key: "toggleAMPM",
    value: function toggleAMPM() {
      this.isAM = !this.isAM;
    }
  }, {
    key: "removeTransitionDuration",
    value: function removeTransitionDuration() {
      this.element.style.transition = 'none';
    }
  }, {
    key: "rotateIndicator",
    value: function rotateIndicator() {
      var rotateValue = 0;

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

      this.element.style.transform = "rotate(" + rotateValue + "deg)";
    }
  }, {
    key: "getHourHandAngle",
    value: function getHourHandAngle() {
      this.hourAngle = this.parent.getCurrentRotateValue(this.hands.hour);
    }
  }, {
    key: "convertAngleToHours",
    value: function convertAngleToHours(name) {
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
  }, {
    key: "init",
    value: function init() {
      this.removeTransitionDuration();
      this.rotateIndicator();
    }
  }]);

  return DayNightIndicator;
}();

module.exports = DayNightIndicator;