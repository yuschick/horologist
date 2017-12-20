'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// YearIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The year class accepts a Moment date object. The current year is stored and
// based upon its relationsbhip to the next leap year, an indicator is rotated
// to display that current relationship.

var YearIndicator = function () {
    function YearIndicator(settings, parentWatch) {
        _classCallCheck(this, YearIndicator);

        this.errorChecking(settings);

        this.element = document.getElementById(settings.id || settings);
        this.parent = parentWatch;
        this.year = this.parent.rightNow.year();
        this.month = this.parent.rightNow.month();
        this.offsetMonths = settings.offsetMonths || false;
        this.invert = settings.invert || false;

        if (!this.parent.testing) this.init();
    }

    _createClass(YearIndicator, [{
        key: 'errorChecking',
        value: function errorChecking(settings) {
            if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) === 'object') {
                if (!settings.id) throw new ReferenceError('The Year Indicator class requires that an ID of the indicator element be provided.');
            } else if (typeof settings !== 'string') {
                throw new ReferenceError('The Year Indicator class expects either a settings object or a string containing the element\'s ID.');
            }
        }
    }, {
        key: 'getRotateValue',
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

            if (this.invert) value *= -1;

            return value;
        }
    }, {
        key: 'rotateElement',
        value: function rotateElement() {
            this.element.style.transform = 'rotate(' + this.getRotateValue() + 'deg)';
        }
    }, {
        key: 'init',
        value: function init() {
            this.rotateElement();
        }
    }]);

    return YearIndicator;
}();

module.exports = YearIndicator;