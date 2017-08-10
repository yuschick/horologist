'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dial = require('./Dial');
var Crown = require('./Crown');
var PowerReserve = require('./PowerReserve');
var MoonPhase = require('./MoonPhase');
var MinuteRepeater = require('./MinuteRepeater');
var DayNightIndicator = require('./DayNightIndicator');
var DayIndicator = require('./DayIndicator');
var DateIndicator = require('./DateIndicator');
var Chronograph = require('./Chronograph');

var Watch = function () {
  function Watch(settings) {
    var _this = this;

    _classCallCheck(this, Watch);

    try {
      if (!settings.dials) throw "At least one dial is required for the Watch class.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.dialInstances = [];
    this.activeDial = 0;
    this.globalInterval = null;
    this.rightNow = new Date();

    settings.dials.forEach(function (dial) {
      var tempDial = new Dial(dial, _this);
      _this.dialInstances.push(tempDial);
    });

    if (settings.crown) {
      this.crown = new Crown(settings.crown, this);
    }

    if (settings.reserve) {
      this.powerReserve = new PowerReserve(settings.reserve, this);
    }

    if (settings.moonphase) {
      this.moonphase = new MoonPhase(settings.moonphase, this);
    }

    if (settings.repeater) {
      this.repeaterDial = settings.repeater.dial || 0;
      this.repeater = new MinuteRepeater(this.dialInstances[this.repeaterDial], settings.repeater, this);
    }

    if (settings.dayNightIndicator) {
      this.dayNightIndicatorDial = settings.dayNightIndicator.dial || 0;
      this.dayNightIndicator = new DayNightIndicator(this.dialInstances[this.dayNightIndicatorDial], settings.dayNightIndicator, this);
    }

    if (settings.dayIndicator) {
      this.dayIndicator = new DayIndicator(settings.dayIndicator, this);
    }

    if (settings.date) {
      this.dateIndicator = new DateIndicator(settings.date, this);
    }

    if (settings.chronograph) {
      this.chronograph = new Chronograph(settings.chronograph, this);
    }

    this.init();
  }

  _createClass(Watch, [{
    key: 'getCurrentRotateValue',
    value: function getCurrentRotateValue(el) {
      var val = el.style.transform;
      var num = val.replace('rotate(', '').replace('deg)', '');
      return Number(num);
    }
  }, {
    key: 'resetActiveDial',
    value: function resetActiveDial() {
      this.activeDial = 0;
    }
  }, {
    key: 'keyBindings',
    value: function keyBindings() {
      var _this2 = this;

      window.addEventListener('keydown', function () {
        switch (event.keyCode) {
          case 37:
            if (_this2.powerReserve) _this2.powerReserve.incrementReserve();
            break;
          case 13:
            if (_this2.crown) _this2.crown.toggleCrown();
            break;
        }

        if (_this2.crown) {
          if (_this2.crown.crownActive) {
            event.preventDefault();
            switch (event.keyCode) {
              case 37:
                if (_this2.powerReserve) _this2.powerReserve.incrementReserve();
                break;
              case 38:
                _this2.dialInstances[_this2.activeDial].rotateHands();
                break;
              case 39:
                _this2.activeDial++;

                if (_this2.activeDial >= _this2.dialInstances.length) _this2.activeDial = 0;

                break;
              case 40:
                _this2.dialInstances[_this2.activeDial].rotateHands('back');
                break;
            }
          }
        }
      });
    }
  }, {
    key: 'startInterval',
    value: function startInterval() {
      var _this3 = this;

      this.globalInterval = setInterval(function () {

        _this3.dialInstances.forEach(function (dial) {
          dial.getCurrentTime();
          dial.rotateHands();
        });

        if (_this3.powerReserve) {
          _this3.powerReserve.decrementReserve();
        }

        if (_this3.moonphase) {
          _this3.moonphase.getCurrentPhase();
        }
      }, 1000);
    }
  }, {
    key: 'stopInterval',
    value: function stopInterval() {
      clearInterval(this.globalInterval);
      this.globalInterval = null;

      if (this.repeater) {
        this.repeater.stopAll();
      }
    }
  }, {
    key: 'init',
    value: function init() {
      this.startInterval();
      this.keyBindings();
    }
  }]);

  return Watch;
}();

module.exports = Watch;
