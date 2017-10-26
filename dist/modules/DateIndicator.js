'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// DateIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The Date functionality uses Moment JS to retrieve the current date. Based on
// the date, the indicator, whether a disc or hand, is rotated 11.61 degrees.
// Additionally, split displays are supported where the ones and tenths of the
// date are indicated on two separate discs that are rotated separately.
// The date can also optionally be indicated with a retrograde indicator

var DateIndicator = function () {
    function DateIndicator(settings, parentWatch) {
        _classCallCheck(this, DateIndicator);

        this.errorChecking(settings);

        if (settings.split) {
            this.split = true;
            this.ones = document.getElementById(settings.split.ones);
            this.tenths = document.getElementById(settings.split.tenths);
        } else {
            this.element = document.getElementById(settings.id);
        }

        this.parent = parentWatch;
        this.date = this.parent.rightNow.date();
        this.retrograde = settings.retrograde || null;
        this.max = this.retrograde ? this.retrograde.max : 180;
        this.invert = settings.invert || false;

        if (!this.parent.testing) this.init();
    }

    _createClass(DateIndicator, [{
        key: 'errorChecking',
        value: function errorChecking(settings) {
            if (!settings.id && !settings.split) throw new ReferenceError('The Date Indicator class requires that an ID of the indiciator element be provided.');
            if (settings.id && settings.split) throw new ReferenceError('Choose EITHER a primary or split indicator.');
            if (settings.retrograde && settings.split) throw new ReferenceError('Choose EITHER a retrograde or split indicator.');
            if (settings.split && (!settings.split.ones || !settings.split.tenths)) throw new ReferenceError('When choosing a split date display please provide the IDs for both the ones and tenths discs.');
        }
    }, {
        key: 'getRotateValue',
        value: function getRotateValue() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var value = 0;

            this.date = this.parent.rightNow.date();

            if (this.retrograde) {
                var rotateValue = this.max / 31;
                value = (this.date - 1) * rotateValue;
            } else {
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
            }

            if (this.invert) value *= -1;

            return value;
        }
    }, {
        key: 'rotateElement',
        value: function rotateElement() {
            if (this.split) {
                this.ones.style.transform = 'rotate(' + this.getRotateValue('ones') + 'deg)';
                this.tenths.style.transform = 'rotate(' + this.getRotateValue('tenths') + 'deg)';
            } else {
                this.element.style.transform = 'rotate(' + this.getRotateValue() + 'deg)';
            }
        }
    }, {
        key: 'init',
        value: function init() {
            this.rotateElement();
        }
    }]);

    return DateIndicator;
}();

module.exports = DateIndicator;