"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dial Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The Dial class also brings in Moment-Timezone to better support GMTOffsets and
// timezone values for dual-time displays. Based on the given time of the current
// or provided timezone, hour, minute, and second hands are rotated.
// The dial class supports telling time in 12 or 24 hour formats. Based on this
// format, the hour hand is either rotated 30 or 15 degrees per hour.

var Timezone = require('moment-timezone');

var Dial = function () {
    function Dial(settings, parentWatch) {
        _classCallCheck(this, Dial);

        this.error = false;
        this.errorChecking(settings);

        if (this.error) return;

        this.name = settings.name;
        this.hands = {};
        if (settings.hands.hour) this.hands.hour = document.getElementById(settings.hands.hour);
        if (settings.hands.minute) this.hands.minute = document.getElementById(settings.hands.minute);
        if (settings.hands.second) this.hands.second = document.getElementById(settings.hands.second);

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

        this.gmtOffset;
        this.timezone;
        if (settings.timezone) {
            this.timezone = settings.timezone;
        } else if (!settings.timezone && settings.offset) {
            this.timezone = null;
            this.gmtOffset = settings.offset ? settings.offset.toString() : null;
        } else {
            this.timezone = Timezone.tz.guess();
        }

        this.sweepingSeconds = settings.sweep || false;

        this.rightNow = this.parent.rightNow;
        this.currentTime = {};

        this.rotateValues = {
            hoursRotateVal: this.format === 12 ? 30 : 15,
            hoursRotateValOffset: this.format === 12 ? 0.5 : 0.25,
            hourJump: 30,
            minutesRotateVal: 6
        };

        this.interval = null;
        this.crownActive = false;
        this.manualTime = false;
        this.settingTime = false;
        this.transition = {};

        this.init();
    }

    _createClass(Dial, [{
        key: "errorChecking",
        value: function errorChecking(settings) {
            try {
                if (!settings.hands) throw "The Dial class needs an object containing the HTML elements for the hands.";
            } catch (errorMsg) {
                console.error(errorMsg);
                this.error = true;
                return;
            }

            try {
                if (settings.retrograde && settings.retrograde.second && !settings.retrograde.second.id) throw "The retrograde second requires an id property be provided.";
            } catch (errorMsg) {
                console.error(errorMsg);
                this.error = true;
                return;
            }

            try {
                if (settings.retrograde && settings.hands.second && settings.retrograde.second) throw "A dial can only support one second hand at a time - either traditional or retrograde.";
            } catch (errorMsg) {
                console.error(errorMsg);
                this.error = true;
                return;
            }

            try {
                if (settings.retrograde && settings.retrograde.second.duration < 5) throw "The retrograde second hand requires a duration no less than 5.";
            } catch (errorMsg) {
                console.error(errorMsg);
                this.error = true;
                return;
            }

            try {
                if (settings.retrograde && 60 % settings.retrograde.second.duration != 0) throw "The retrograde second hand requires a duration that is evenly divisble by 60.";
            } catch (errorMsg) {
                console.error(errorMsg);
                this.error = true;
                return;
            }
        }
    }, {
        key: "toggleActiveCrown",
        value: function toggleActiveCrown() {
            this.crownActive = !this.crownActive;
        }
    }, {
        key: "toggleSettingTime",
        value: function toggleSettingTime() {
            this.settingTime = !this.settingTime;
        }
    }, {
        key: "updateToManualTime",
        value: function updateToManualTime() {
            this.manualTime = true;
        }
    }, {
        key: "startInterval",
        value: function startInterval() {
            var _this = this;

            this.interval = setInterval(function () {
                _this.getCurrentTime();
                _this.rotateHands();
            }, 1000);
        }
    }, {
        key: "stopInterval",
        value: function stopInterval() {
            clearInterval(this.interval);
            this.interval = null;
        }
    }, {
        key: "applySweepingTransition",
        value: function applySweepingTransition() {
            this.hands.second.style.transition = 'transform 1s linear';
        }
    }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
            this.rightNow = this.gmtOffset && !this.timezone ? new Date() : this.parent.rightNow.tz(this.timezone);
            var currentTime = void 0;

            if (this.gmtOffset && !this.timezone) {
                /* passed in a gmtOffset like +8 */
                /* Shouts to: http://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/6016329/ */
                var gmt = this.rightNow.getTime() + this.rightNow.getTimezoneOffset() * 60000;
                this.rightNow = new Date(gmt + 3600000 * this.gmtOffset);

                currentTime = {
                    hours: this.rightNow.getHours(),
                    minutes: this.rightNow.getMinutes(),
                    seconds: this.rightNow.getSeconds()
                };
            } else {
                /* passed in a Moment Timezone valid string */
                currentTime = {
                    hours: this.rightNow.hours(),
                    minutes: this.rightNow.minutes(),
                    seconds: this.rightNow.seconds()
                };
            }

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
            var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var rotateVal = void 0;

            if (this.hands.hour) {
                var hourOffset = this.rotateValues.hoursRotateValOffset;
                rotateVal = this.parent.getCurrentRotateValue(this.hands.hour);
                if (this.settingTime) {
                    if (dir) {
                        rotateVal -= hourOffset;
                    } else {
                        rotateVal += hourOffset;
                    }
                } else if (this.manualTime) {
                    if (this.currentTime.seconds === 0) {
                        rotateVal = this.parent.getCurrentRotateValue(this.hands.hour) + this.rotateValues.hoursRotateValOffset;
                    }
                } else {
                    rotateVal = this.currentTime.hours * this.rotateValues.hoursRotateVal + this.currentTime.minutes * this.rotateValues.hoursRotateValOffset;
                }

                if (rotateVal === 0 || rotateVal >= 360) {
                    this.transition.hour = this.hands.hour.style.transition;
                    this.hands.hour.style.transition = 'none';
                } else if (rotateVal > 0 && this.hands.hour.style.transition === 'none') {
                    this.hands.hour.style.transition = this.transition.hour;
                }

                if (rotateVal > 360) {
                    rotateVal -= 360;
                }

                this.hands.hour.style.transform = "rotate(" + rotateVal + "deg)";
            }

            if (this.hands.minute) {
                rotateVal = this.parent.getCurrentRotateValue(this.hands.minute);
                if (this.settingTime) {
                    if (dir) {
                        rotateVal -= this.rotateValues.minutesRotateVal;
                    } else {
                        rotateVal += this.rotateValues.minutesRotateVal;
                    }
                } else if (this.manualTime) {
                    if (this.currentTime.seconds === 0) {
                        rotateVal += this.rotateValues.minutesRotateVal;
                    }
                } else {
                    rotateVal = this.currentTime.minutes * this.rotateValues.minutesRotateVal;
                }

                if (rotateVal === 0) {
                    this.transition.minute = this.hands.minute.style.transition;
                    this.hands.minute.style.transition = 'none';
                } else if (rotateVal > 0 && this.hands.minute.style.transition === 'none') {
                    this.hands.minute.style.transition = this.transition.minute;
                }

                this.hands.minute.style.transform = "rotate(" + rotateVal + "deg)";
            }

            if (this.hands.second) {
                if (this.retrograde.second) {
                    rotateVal = this.currentTime.seconds * this.retrograde.second.increment;
                } else {
                    rotateVal = this.currentTime.seconds * this.rotateValues.minutesRotateVal;
                }

                if (this.retrograde.second && rotateVal > this.retrograde.second.max) {
                    rotateVal = rotateVal % this.retrograde.second.max || this.retrograde.second.max;
                }

                if (rotateVal === 0 || this.retrograde.second && rotateVal === this.retrograde.second.increment && this.hands.second.style.transition !== 'none') {
                    this.transition.second = this.hands.second.style.transition;
                    this.hands.second.style.transition = 'none';
                } else if (rotateVal > 0 && this.hands.second.style.transition === 'none') {
                    this.hands.second.style.transition = this.transition.second;
                }

                this.hands.second.style.transform = "rotate(" + rotateVal + "deg)";
            }

            if (this.parent.dayNightIndicator) this.checkForDayNightUpdates();
        }
    }, {
        key: "init",
        value: function init() {
            var _this2 = this;

            setTimeout(function () {
                _this2.getCurrentTime();
                _this2.rotateHands();

                setTimeout(function () {
                    if (_this2.hands.second && _this2.sweepingSeconds) {
                        _this2.applySweepingTransition();
                    }
                }, 100);
            }, 350);
        }
    }]);

    return Dial;
}();

module.exports = Dial;