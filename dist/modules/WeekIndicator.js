"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Week Indicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The Week Class will rotate an element to depict the 
// current week of the year. By default, this class expects 
// 52 weeks per year but an iso boolean can be passed
// to account for a 53rd week. The week indicator
// element can rotate either direction based on the 
// invert boolean as well.

var WeekIndicator = function () {
    function WeekIndicator(settings, parentWatch) {
        _classCallCheck(this, WeekIndicator);

        this.errorChecking();

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.iso = settings.iso || false;
        this.invert = settings.invert || false;

        this.week = 0;
        this.weekAmount = this.iso ? 53 : 52;
        this.increment = 360 / this.weekAmount;

        this.init();
    }

    _createClass(WeekIndicator, [{
        key: "errorChecking",
        value: function errorChecking() {
            try {
                if (!settings.id) throw "The Week Indicator class requires that an ID of the indicator element be provided.";
            } catch (errorMsg) {
                console.error(errorMsg);
                return;
            }
        }
    }, {
        key: "getWeekValue",
        value: function getWeekValue() {
            var rightNow = this.parent.rightNow;
            this.week = this.iso ? rightNow.isoWeek() - 1 : rightNow.week() - 1;

            this.rotateHands();
        }
    }, {
        key: "rotateHands",
        value: function rotateHands() {
            var rotateVal = this.week * this.increment;
            if (this.invert) rotateVal *= -1;

            this.element.style.transform = "rotate(" + rotateVal + "deg)";
        }
    }, {
        key: "init",
        value: function init() {
            this.getWeekValue();
        }
    }]);

    return WeekIndicator;
}();

module.exports = WeekIndicator;