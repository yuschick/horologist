"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// DayIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The day class recei ved a Moment object from the parent watch class. Based on
// this object's day, the element is rotated 51.43 degrees to show the day name.
// Additionally, the day indicator can be offset by the hours in which case the
// indicator is rotated an additional 2.14 degrees for each hour of the day.

var DayIndicator = function () {
  function DayIndicator(settings, parentWatch) {
    _classCallCheck(this, DayIndicator);

    try {
      if (!settings.id) throw "The Day Indicator class requires that an ID of the indicator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.parent = parentWatch;
    this.day = this.parent.rightNow.day();
    this.hours = this.parent.rightNow.hours();
    this.offsetHours = settings.offsetHours || false;

    this.init();
  }

  _createClass(DayIndicator, [{
    key: "getRotateValue",
    value: function getRotateValue() {
      var value = this.day * 51.43;

      if (this.offsetHours) {
        value += this.hours * 2.14;
      }

      return value;
    }
  }, {
    key: "rotateElement",
    value: function rotateElement() {
      this.element.style.transform = "rotate(" + this.getRotateValue() + "deg)";
    }
  }, {
    key: "init",
    value: function init() {
      this.rotateElement();
    }
  }]);

  return DayIndicator;
}();

module.exports = DayIndicator;