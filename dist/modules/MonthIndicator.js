"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MonthIndicator = function () {
  function MonthIndicator(settings, parentWatch) {
    _classCallCheck(this, MonthIndicator);

    try {
      if (!settings.id) throw "The Month Indicator class requires that an ID of the indicator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.parent = parentWatch;
    this.month = this.parent.rightNow.getMonth();

    this.init();
  }

  _createClass(MonthIndicator, [{
    key: "getRotateValue",
    value: function getRotateValue() {
      var value = this.month * 30;

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

  return MonthIndicator;
}();

module.exports = MonthIndicator;