"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Month Class
// @params settings: object
// @params parentWatch: Watch instance
//
// Accepting a Moment object, the month is stored and based on its value, the
// month indicator is rotated 30 degrees to display the current month.

var MonthIndicator = function () {
    function MonthIndicator(settings, parentWatch) {
        _classCallCheck(this, MonthIndicator);

        if (!settings.id) throw new ReferenceError("The Month class requires that an ID of the element be provided.");

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.month = this.parent.rightNow.month();

        this.retrograde = settings.retrograde || null;
        this.max = this.retrograde ? this.retrograde.max : 180;
        this.invert = settings.invert || false;

        if (!this.parent.testing) this.init();
    }

    _createClass(MonthIndicator, [{
        key: "getRotateValue",
        value: function getRotateValue() {
            var value = 0;

            if (this.retrograde) {
                var rotateValue = this.max / 12;
                value = this.month * rotateValue;
            } else {
                value = this.month * 30;
            }

            if (this.invert) value *= -1;

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