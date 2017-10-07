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

var Chronograph = function () {
  function Chronograph(settings, parentWatch) {
    _classCallCheck(this, Chronograph);

    this.errorChecking(settings);

    this.buttons = {
      start: document.getElementById(settings.buttons.start),
      reset: document.getElementById(settings.buttons.reset)
    };

    this.hands = {
      tenth: document.getElementById(settings.hands.tenth) || null,
      second: document.getElementById(settings.hands.second),
      minute: document.getElementById(settings.hands.minute),
      hour: document.getElementById(settings.hands.hour) || null,
      step: document.getElementById(settings.hands.step) || null
    };

    this.flyback = settings.flyback || false;
    this.rattrapante = settings.rattrapante || false;

    this.interval;
    this.counter = 1;
    this.isRunning = false;
    this.step = false;
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
        if (settings.rattrapante && !settings.hands.step) throw "A rattrapante Chronograph requires a 'step' hand.";
      } catch (errorMsg) {
        console.error(errorMsg);
        return;
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;

      this.buttons.start.addEventListener('click', function () {
        _this.isRunning = !_this.isRunning;
        _this.toggleButtonClasses(_this.buttons.start);

        if (_this.isRunning) {
          _this.startInterval();
        } else {
          _this.clearInterval();
        }
      });

      this.buttons.start.addEventListener('transitionend', function () {
        if (_this.buttons.start.classList.contains('active')) _this.toggleButtonClasses(_this.buttons.start);
      });

      this.buttons.reset.addEventListener('click', function () {
        _this.resetHands();
        _this.toggleButtonClasses(_this.buttons.reset);

        if (!_this.rattrapante && !_this.flyback || !_this.isRunning) {
          _this.clearInterval();
          _this.isRunning = false;
        }

        _this.counter = 1;
      });

      this.buttons.reset.addEventListener('transitionend', function () {
        if (_this.buttons.reset.classList.contains('active')) _this.toggleButtonClasses(_this.buttons.reset);
      });
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
          this.step = !this.step;
          if (!this.step) {
            this.hands.step.style.transform = "rotate(" + this.parent.getCurrentRotateValue(this.hands.second) + "deg)";
          }
        } else {
          this.step = true;
          this.hands.step.style.transform = "rotate(" + this.parent.getCurrentRotateValue(this.hands.second) + "deg)";
          this.hands.second.style.transform = 'rotate(0deg)';
        }
      } else {
        Object.keys(this.hands).map(function (hand) {
          if (_this3.hands[hand]) _this3.hands[hand].style.transform = 'rotate(0deg)';
        });
        this.step = false;
      }
    }
  }, {
    key: "toggleButtonClasses",
    value: function toggleButtonClasses(btn) {
      btn.classList.toggle('active');
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
        if (!this.step && this.hands.step) this.hands.step.style.transform = "rotate(" + (secondValue + 6) + "deg)";
      }

      if (this.counter % 600 === 0) {
        this.hands.minute.style.transform = "rotate(" + (minuteValue + 6) + "deg)";
        if (this.hands.hour) this.hands.hour.style.transform = "rotate(" + (hourValue + 0.5) + "deg)";
        this.counter = 0;
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;

      this.bindEvents();

      Object.keys(this.buttons).map(function (btn) {
        _this4.buttons[btn] ? _this4.buttons[btn].style.cursor = 'pointer' : false;
      });
    }
  }]);

  return Chronograph;
}();

module.exports = Chronograph;