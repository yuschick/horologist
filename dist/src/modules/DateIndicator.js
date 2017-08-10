"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateIndicator = function () {
  function DateIndicator(settings, parentWatch) {
    _classCallCheck(this, DateIndicator);

    if (this.checkForErrors(settings)) return;

    if (settings.split) {
      this.split = true;
      this.ones = document.getElementById(settings.split.ones);
      this.tenths = document.getElementById(settings.split.tenths);
    } else {
      this.element = document.getElementById(settings.id);
    }
    this.parent = parentWatch;
    this.date = this.parent.rightNow.getDate();

    this.init();
  }

  _createClass(DateIndicator, [{
    key: "checkForErrors",
    value: function checkForErrors(settings) {
      try {
        if (!settings.id && !settings.split) throw "The Date Indicator class requires that an ID of the indiciator element be provided.";
      } catch (errorMsg) {
        console.error(errorMsg);
        return true;
      }

      try {
        if (settings.id && settings.split) throw "Choose EITHER a primary or split indicator.";
      } catch (errorMsg) {
        console.error(errorMsg);
        return true;
      }

      try {
        if (settings.split && (!settings.split.ones || !settings.split.tenths)) throw "When choosing a split date display please provide the IDs for both the ones and tenths discs.";
      } catch (errorMsg) {
        console.error(errorMsg);
        return true;
      }
    }
  }, {
    key: "getRotateValue",
    value: function getRotateValue() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var value = 0;

      if (this.split) {
        if (type === 'ones') {
          var ones = this.date % 10;
          value = ones > 1 ? (ones - 1) * 36 : 36;
        } else {
          var tenths = Math.floor(this.date / 10);
          value = tenths * 90;
        }
      } else {
        value = (this.date - 1) * 11.61;
      }

      return value;
    }
  }, {
    key: "rotateElement",
    value: function rotateElement() {
      if (this.split) {
        this.ones.style.transform = "rotate(" + this.getRotateValue('ones') + "deg)";
        this.tenths.style.transform = "rotate(" + this.getRotateValue('tenths') + "deg)";
      } else {
        this.element.style.transform = "rotate(" + this.getRotateValue() + "deg)";
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.rotateElement();
    }
  }]);

  return DateIndicator;
}();

module.exports = DateIndicator;