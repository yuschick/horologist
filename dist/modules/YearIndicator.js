"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YearIndicator = function () {
  function YearIndicator(settings, parentWatch) {
    _classCallCheck(this, YearIndicator);

    try {
      if (!settings.id) throw "The Month Indicator class requires that an ID of the indicator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.parent = parentWatch;
    this.year = this.parent.rightNow.getYear();
    this.month = this.parent.rightNow.getMonth();
    this.offsetMonths = settings.offsetMonths || false;

    this.init();
  }

  _createClass(YearIndicator, [{
    key: "getRotateValue",
    value: function getRotateValue() {
      var value = 0;

      if (this.year % 4 === 0 && this.year % 100 !== 0 || this.year % 400 === 0) {
        value = 270;
      } else if (this.year % 4 === 2 && this.year % 100 !== 2 || this.year % 400 === 2) {
        value = 90;
      } else if (this.year % 4 === 3 && this.year % 100 !== 3 || this.year % 400 === 3) {
        value = 180;
      }

      if (this.offsetMonths) {
        value += this.month * 7.5;
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

  return YearIndicator;
}();

module.exports = YearIndicator;