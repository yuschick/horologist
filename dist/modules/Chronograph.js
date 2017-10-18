"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Chronograph Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The chronograph complication requires a buttons and hands object
// the buttons object contains the start and reset buttons which control the hands
// The hands are designed and used to indicate tenth seconds, seconds, and minutes
// for timing events. Flyback and Split-Second (rattrapante) functionality is supported for timing laps.
//
// MONO-PUSHER
// Pusher 1: Click to start
// Pusher 1: Click to pause
// Pusher 1: Click to reset
//
// DUAL-PUSHER
// Standard
// Pusher 1: Starts the time
// Pusher 1: Pauses all hands
// Pusher 2: Resets all hands
//
// Flyback
// Pusher 1: Starts the time
// Pusher 2: Resets all hands then continues
//
// Rattrapante
// Pusher 1: Starts the time
// Pusher 2: Stops the lap hand
// Pusher 2: Resets lap hand to current second hand
// Pusher 1: Stops all hands
// Pusher 2: Resets all hands
//
// TRI-PUSHER
// Pusher 1: Starts the time
// Pusher 2: Pauses the lap hand
// Pusher 2: Resets the lap hand back to constant second hand
// Pusher 3: Stops all hands
// Pusher 1: Resets all hands to original position

var Chronograph = function () {
    function Chronograph(settings, parentWatch) {
        _classCallCheck(this, Chronograph);

        this.errorChecking(settings);

        this.buttons = {
            primary: document.getElementById(settings.buttons.primary),
            secondary: document.getElementById(settings.buttons.secondary) || null,
            tertiary: document.getElementById(settings.buttons.tertiary) || null
        };

        this.hands = {
            tenth: document.getElementById(settings.hands.tenth) || null,
            second: document.getElementById(settings.hands.second),
            minute: document.getElementById(settings.hands.minute),
            hour: document.getElementById(settings.hands.hour) || null,
            lap: document.getElementById(settings.hands.lap) || null
        };

        this.flyback = settings.flyback || false;
        this.rattrapante = settings.rattrapante || false;

        this.monopusher = false;
        this.dualpusher = false;
        this.tripusher = false;

        this.interval;
        this.counter = 1;
        this.isRunning = false;
        this.isPaused = false;
        this.lapActive = false;
        this.parent = parentWatch;

        this.init();
    }

    _createClass(Chronograph, [{
        key: "errorChecking",
        value: function errorChecking(settings) {
            try {
                if (!settings.buttons || !settings.hands) throw "The Chronograph requires a settings object containing both the buttons and hands.";
            } catch (errorMsg) {
                console.error(errorMsg);
                return;
            }

            try {
                if (!settings.hands.second || !settings.hands.minute) throw "The Chronograph requires at least a second and minute hands.";
            } catch (errorMsg) {
                console.error(errorMsg);
                return;
            }

            try {
                if (!settings.buttons.secondary && !settings.buttons.tertiary && settings.rattrapante) throw "A monopusher chronograph cannot support rattrapante functionality";
            } catch (errorMsg) {
                console.error(errorMsg);
                return;
            }

            try {
                if (!settings.buttons.secondary && !settings.buttons.tertiary && settings.flyback) throw "A monopusher chronograph cannot support flyuback functionality";
            } catch (errorMsg) {
                console.error(errorMsg);
                return;
            }

            try {
                if (settings.rattrapante && !settings.hands.lap) throw "A rattrapante Chronograph requires a 'lap' hand.";
            } catch (errorMsg) {
                console.error(errorMsg);
                return;
            }
        }
    }, {
        key: "checkForChronographType",
        value: function checkForChronographType() {
            if (this.buttons.primary && !this.buttons.secondary && !this.buttons.tertiary) {
                this.monopusher = true;
            } else if (this.buttons.primary && this.buttons.secondary && !this.buttons.tertiary) {
                this.dualpusher = true;
            } else if (this.buttons.primary && this.buttons.secondary && this.buttons.tertiary) {
                this.tripusher = true;
                this.rattrapante = true;
            } else {
                throw "The Chronograph class expects the hands to be added sequentially beginning with primary, secondary, and, lastly, tertiary.";
            }
        }
    }, {
        key: "bindEvents",
        value: function bindEvents() {
            var _this = this;

            this.buttons.primary.addEventListener('click', function () {
                _this.toggleActiveState(_this.buttons.primary);

                if (_this.monopusher) {
                    if (!_this.isRunning && !_this.isPaused) {
                        _this.isRunning = true;
                        _this.startInterval();
                    } else if (_this.isRunning && !_this.isPaused) {
                        _this.isRunning = false;
                        _this.isPaused = true;
                        _this.clearInterval();
                    } else if (!_this.isRunning && _this.isPaused) {
                        _this.isPaused = false;
                        _this.resetHands();
                    }
                } else if (_this.dualpusher) {
                    _this.isRunning = !_this.isRunning;

                    if (_this.isRunning) {
                        _this.startInterval();
                    } else {
                        _this.clearInterval();
                    }
                } else if (_this.tripusher) {
                    if (!_this.isRunning && !_this.isPaused) {
                        _this.isRunning = true;
                        _this.startInterval();
                    } else if (!_this.isRunning && _this.isPaused) {
                        _this.isRunning = false;
                        _this.isPaused = false;
                        _this.counter = 1;
                        _this.clearInterval();
                        _this.resetHands();
                    }
                }
            });

            this.buttons.primary.addEventListener('transitionend', function () {
                if (_this.buttons.primary.classList.contains('active')) _this.toggleActiveState(_this.buttons.primary);
            });

            if (this.buttons.secondary) {
                this.buttons.secondary.addEventListener('click', function () {
                    _this.toggleActiveState(_this.buttons.secondary);

                    if (_this.dualpusher) {
                        _this.resetHands();
                        _this.counter = 1;

                        if (!_this.rattrapante && !_this.flyback || !_this.isRunning) {
                            _this.clearInterval();
                            _this.isRunning = false;
                        }
                    } else if (_this.tripusher) {
                        if (_this.isRunning) {
                            _this.resetHands();
                        }
                    }
                });

                this.buttons.secondary.addEventListener('transitionend', function () {
                    if (_this.buttons.secondary.classList.contains('active')) _this.toggleActiveState(_this.buttons.secondary);
                });
            }

            if (this.buttons.tertiary) {
                this.buttons.tertiary.addEventListener('click', function () {
                    _this.toggleActiveState(_this.buttons.tertiary);
                    _this.isRunning = !_this.isRunning;

                    if (_this.isRunning) {
                        _this.startInterval();
                        _this.isPaused = false;
                    } else {
                        _this.clearInterval();
                        _this.isRunning = false;
                        _this.isPaused = true;
                    }
                });

                this.buttons.tertiary.addEventListener('transitionend', function () {
                    if (_this.buttons.tertiary.classList.contains('active')) _this.toggleActiveState(_this.buttons.tertiary);
                });
            }
        }
    }, {
        key: "clearInterval",
        value: function (_clearInterval) {
            function clearInterval() {
                return _clearInterval.apply(this, arguments);
            }

            clearInterval.toString = function () {
                return _clearInterval.toString();
            };

            return clearInterval;
        }(function () {
            clearInterval(this.interval);
            this.interval = null;
        })
    }, {
        key: "startInterval",
        value: function startInterval() {
            var _this2 = this;

            this.interval = setInterval(function () {
                _this2.rotateHands();
                _this2.counter++;
            }, 100);
        }
    }, {
        key: "resetHands",
        value: function resetHands() {
            var _this3 = this;

            if (this.rattrapante && this.isRunning) {
                if (!this.flyback) {
                    this.lapActive = !this.lapActive;
                    if (!this.lapActive) {
                        this.hands.lap.style.transform = "rotate(" + this.parent.getCurrentRotateValue(this.hands.second) + "deg)";
                    }
                } else {
                    this.lapActive = true;
                    this.hands.lap.style.transform = "rotate(" + this.parent.getCurrentRotateValue(this.hands.second) + "deg)";
                    this.hands.second.style.transform = 'rotate(0deg)';
                    if (this.hands.tenth) this.hands.tenth.style.transform = 'rotate(0deg)';
                }
            } else {
                Object.keys(this.hands).map(function (hand) {
                    if (_this3.hands[hand]) _this3.hands[hand].style.transform = 'rotate(0deg)';
                });
                this.lapActive = false;
            }
        }
    }, {
        key: "rotateHands",
        value: function rotateHands() {
            var tenthValue = this.hands.tenth ? this.parent.getCurrentRotateValue(this.hands.tenth) : 0;
            var secondValue = this.parent.getCurrentRotateValue(this.hands.second);
            var minuteValue = this.parent.getCurrentRotateValue(this.hands.minute);
            var hourValue = this.hands.hour ? this.parent.getCurrentRotateValue(this.hands.hour) : 0;

            if (this.hands.tenth) this.hands.tenth.style.transform = "rotate(" + (tenthValue + 0.6) + "deg)";

            if (this.counter % 10 === 0) {
                this.hands.second.style.transform = "rotate(" + (secondValue + 6) + "deg)";
                if (!this.lapActive && this.hands.lap) this.hands.lap.style.transform = "rotate(" + (secondValue + 6) + "deg)";
            }

            if (this.counter % 600 === 0) {
                this.hands.minute.style.transform = "rotate(" + (minuteValue + 6) + "deg)";
                if (this.hands.hour) this.hands.hour.style.transform = "rotate(" + (hourValue + 0.5) + "deg)";
                this.counter = 0;
            }
        }
    }, {
        key: "toggleActiveState",
        value: function toggleActiveState(btn) {
            btn.classList.toggle('active');
        }
    }, {
        key: "init",
        value: function init() {
            var _this4 = this;

            this.checkForChronographType();
            this.bindEvents();

            Object.keys(this.buttons).map(function (btn) {
                if (_this4.buttons[btn]) {
                    _this4.buttons[btn].style.cursor = 'pointer';
                }
            });
        }
    }]);

    return Chronograph;
}();

module.exports = Chronograph;