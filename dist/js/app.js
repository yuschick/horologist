/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	(function () {
	  'use strict';

	  var Watch = __webpack_require__(1);
	  var settings = {
	    dials: [{
	      id: 'local-time',
	      hands: {
	        hour: 'primary-hours-hand',
	        minute: 'primary-minutes-hand'
	      },
	      offset: '+3'
	    }, {
	      id: 'home-time',
	      hands: {
	        hour: 'secondary-hours-hand',
	        second: 'secondary-minutes-hand'
	      },
	      offset: '-4',
	      format: 24
	    }],
	    reserve: {
	      id: 'power-reserve-hand',
	      range: [-90, 90]
	    },
	    crown: {
	      id: 'crown',
	      blackout: [{
	        selector: '.blackout',
	        className: 'active'
	      }, {
	        selector: '.main_dial',
	        className: 'faded'
	      }]
	    },
	    repeater: {
	      id: 'repeater-btn',
	      chimes: {
	        hour: './dist/sounds/chime-01.mp4',
	        fiveMinute: './dist/sounds/chime-02.mp4',
	        minute: './dist/sounds/chime-03.mp4'
	      }
	    }
	  };

	  var VoutilainenGMR = new Watch(settings);

	  /**
	  Custom Form Settings
	  **/
	  var homeTime = document.getElementById('home-field');
	  var localTime = document.getElementById('local-field');

	  homeTime.addEventListener('change', function () {
	    VoutilainenGMR.stopInterval();
	    settings.dials[1].offset = homeTime.value.toString();
	    VoutilainenGMR = new Watch(settings);
	  });
	  localTime.addEventListener('change', function () {
	    VoutilainenGMR.stopInterval();
	    settings.dials[0].offset = localTime.value.toString();
	    VoutilainenGMR = new Watch(settings);
	  });
	})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dial = __webpack_require__(2);
	var Crown = __webpack_require__(4);
	var PowerReserve = __webpack_require__(5);
	var MoonPhase = __webpack_require__(6);
	var MinuteRepeater = __webpack_require__(7);

	var Watch = function () {
	  function Watch(settings) {
	    var _this = this;

	    _classCallCheck(this, Watch);

	    this.dialInstances = [];
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

	    this.init();
	  }

	  _createClass(Watch, [{
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
	            switch (event.keyCode) {
	              case 37:
	                if (_this2.powerReserve) _this2.powerReserve.incrementReserve();
	                break;
	              case 38:
	                _this2.dialInstances.forEach(function (dial) {
	                  if (dial.setSecondary && dial.id === _this2.dialInstances[_this2.dialInstances.length - 1].id) {
	                    dial.rotateHands();
	                  } else if (!dial.setSecondary) {
	                    dial.rotateHands();
	                  }
	                });
	                break;
	              case 39:
	                if (_this2.crown) _this2.crown.toggleBlackout();

	                _this2.dialInstances.forEach(function (dial) {
	                  dial.toggleSecondaryTime();
	                });
	                break;
	              case 40:
	                _this2.dialInstances.forEach(function (dial) {
	                  if (dial.setSecondary && dial.id === _this2.dialInstances[_this2.dialInstances.length - 1].id) {
	                    dial.rotateHands('back');
	                  } else if (!dial.setSecondary) {
	                    dial.rotateHands('back');
	                  }
	                });
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

	        /**
	        To be accurate, yes, the moonphase should stop if the power reserve empties
	        But is that worth making this call every second?
	        **/
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var util = __webpack_require__(3);

	var Dial = function () {
	  function Dial(settings, parentWatch) {
	    _classCallCheck(this, Dial);

	    try {
	      if (!settings.hands) throw "The Dial class needs an object containing the HTML elements for the hands.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }
	    this.id = settings.id;
	    this.hands = {};
	    if (settings.hands.hour) this.hands.hour = document.getElementById(settings.hands.hour);
	    if (settings.hands.minute) this.hands.minute = document.getElementById(settings.hands.minute);
	    if (settings.hands.second) this.hands.second = document.getElementById(settings.hands.second);

	    this.parent = parentWatch;

	    this.format = settings.format ? settings.format : 12;
	    this.gmtOffset = settings.offset ? settings.offset.toString() : null;

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
	    this.setSecondary = false;
	    this.transition = null;

	    this.init();
	  }

	  _createClass(Dial, [{
	    key: 'toggleActiveCrown',
	    value: function toggleActiveCrown() {
	      this.crownActive = !this.crownActive;
	    }
	  }, {
	    key: 'toggleSecondaryTime',
	    value: function toggleSecondaryTime() {
	      this.setSecondary = !this.setSecondary;
	    }
	  }, {
	    key: 'toggleSettingTime',
	    value: function toggleSettingTime() {
	      this.settingTime = !this.settingTime;
	    }
	  }, {
	    key: 'updateToManualTime',
	    value: function updateToManualTime() {
	      this.manualTime = true;
	    }
	  }, {
	    key: 'startInterval',
	    value: function startInterval() {
	      var _this = this;

	      this.interval = setInterval(function () {
	        _this.getCurrentTime();
	        _this.rotateHands();
	      }, 1000);
	    }
	  }, {
	    key: 'stopInterval',
	    value: function stopInterval() {
	      clearInterval(this.interval);
	      this.interval = null;
	    }
	  }, {
	    key: 'getCurrentTime',
	    value: function getCurrentTime() {
	      this.rightNow = new Date();
	      if (this.gmtOffset) {
	        /* Shouts to: http://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/6016329/ */
	        var gmt = this.rightNow.getTime() + this.rightNow.getTimezoneOffset() * 60000;
	        this.rightNow = new Date(gmt + 3600000 * this.gmtOffset);
	      }

	      var currentTime = {
	        hours: this.rightNow.getHours(),
	        minutes: this.rightNow.getMinutes(),
	        seconds: this.rightNow.getSeconds()
	      };

	      this.currentTime = currentTime;
	    }
	  }, {
	    key: 'rotateHands',
	    value: function rotateHands() {
	      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	      var rotateVal = void 0;

	      if (this.hands.hour) {
	        var hourOffset = this.setSecondary ? this.rotateValues.hourJump : this.rotateValues.hoursRotateValOffset;
	        rotateVal = util.getCurrentRotateValue(this.hands.hour);
	        if (this.settingTime) {
	          if (dir) {
	            rotateVal -= hourOffset;
	          } else {
	            rotateVal += hourOffset;
	          }
	        } else if (this.manualTime) {
	          if (this.currentTime.seconds === 0) {
	            rotateVal = util.getCurrentRotateValue(this.hands.hour) + this.rotateValues.hoursRotateValOffset;
	          }
	        } else {
	          rotateVal = this.currentTime.hours * this.rotateValues.hoursRotateVal + this.currentTime.minutes * this.rotateValues.hoursRotateValOffset;
	        }

	        this.hands.hour.style.transform = 'rotate(' + rotateVal + 'deg)';
	      }

	      if (this.hands.minute) {
	        rotateVal = util.getCurrentRotateValue(this.hands.minute);
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

	        this.hands.minute.style.transform = 'rotate(' + rotateVal + 'deg)';
	      }

	      if (this.hands.second) {
	        rotateVal = this.currentTime.seconds * this.rotateValues.minutesRotateVal;

	        if (rotateVal === 0) {
	          this.transition = this.hands.second.style.transition;
	          this.hands.second.style.transition = 'none';
	        } else if (rotateVal > 0 && this.hands.second.style.transition === 'none') {
	          this.hands.second.style.transition = this.transition;
	        }

	        this.hands.second.style.transform = 'rotate(' + rotateVal + 'deg)';
	      }
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;

	      setTimeout(function () {
	        _this2.getCurrentTime();
	        _this2.rotateHands();
	      }, 350);
	    }
	  }]);

	  return Dial;
	}();

	module.exports = Dial;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  getCurrentRotateValue: function getCurrentRotateValue(el) {
	    var val = el.style.transform;
	    var num = val.replace('rotate(', '').replace('deg)', '');
	    return Number(num);
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Crown = function () {
	  function Crown(settings, parentWatch) {
	    _classCallCheck(this, Crown);

	    this.crown = document.getElementById(settings.id);
	    this.blackoutElements = settings.blackout;
	    this.parent = parentWatch;
	    this.crownActive = false;
	    this.setSecondary = false;
	    this.init();
	  }

	  _createClass(Crown, [{
	    key: 'toggleBlackout',
	    value: function toggleBlackout() {
	      this.setSecondary = !this.setSecondary;
	      this.blackoutElements.forEach(function (el) {
	        document.querySelector(el.selector).classList.toggle(el.className);
	      });
	    }
	  }, {
	    key: 'toggleCrown',
	    value: function toggleCrown() {
	      this.crownActive = !this.crownActive;
	      this.parent.dialInstances.forEach(function (instance) {
	        if (instance.toggleActiveCrown) instance.toggleActiveCrown();
	        if (instance.setSecondary) instance.toggleSecondaryTime();
	      });

	      if (this.crownActive) {
	        this.parent.stopInterval();
	        this.crown.classList.add('active');
	        this.parent.dialInstances.forEach(function (instance) {
	          if (instance.toggleSettingTime) instance.toggleSettingTime();
	        });
	      } else {
	        this.parent.startInterval();
	        this.crown.classList.remove('active');
	        if (this.setSecondary) {
	          this.toggleBlackout();
	        }
	        this.parent.dialInstances.forEach(function (instance) {
	          if (instance.toggleSettingTime) instance.toggleSettingTime();
	          if (instance.updateToManualTime) instance.updateToManualTime();
	        });
	      }
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      this.crown.addEventListener('click', function () {
	        _this.toggleCrown();
	      });
	    }
	  }]);

	  return Crown;
	}();

	module.exports = Crown;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var util = __webpack_require__(3);

	var PowerReserve = function () {
	  function PowerReserve(settings, parentWatch) {
	    _classCallCheck(this, PowerReserve);

	    this.element = document.getElementById(settings.id);
	    this.interval = null;
	    this.parent = parentWatch;
	    this.minAngle = settings.range[0];
	    this.maxAngle = settings.range[1];
	    this.increment = 0.5;
	    this.init();
	  }

	  _createClass(PowerReserve, [{
	    key: 'decrementReserve',
	    value: function decrementReserve() {
	      var currentRotate = util.getCurrentRotateValue(this.element);

	      if (currentRotate <= this.minAngle) {
	        this.parent.stopInterval();
	      } else {
	        var newRotate = Number(currentRotate) - this.increment / 2;
	        this.element.style.transform = 'rotate(' + newRotate + 'deg)';
	      }
	    }
	  }, {
	    key: 'incrementReserve',
	    value: function incrementReserve() {
	      var currentRotate = util.getCurrentRotateValue(this.element);

	      if (currentRotate <= this.maxAngle - this.increment && currentRotate >= this.minAngle) {
	        var newRotate = Number(currentRotate) + this.increment;
	        this.element.style.transform = 'rotate(' + newRotate + 'deg)';
	      }
	    }
	  }, {
	    key: 'startInterval',
	    value: function startInterval() {
	      var _this = this;

	      this.interval = setInterval(function () {
	        _this.decrementReserve();
	      }, 1000);
	    }
	  }, {
	    key: 'stopInterval',
	    value: function stopInterval() {
	      clearInterval(this.interval);
	      this.interval = null;
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      this.element.style.transform = 'rotate(' + this.maxAngle + 'deg)';
	    }
	  }]);

	  return PowerReserve;
	}();

	module.exports = PowerReserve;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MoonPhase = function () {
	  function MoonPhase(settings, parentWatch) {
	    _classCallCheck(this, MoonPhase);

	    this.parent = parentWatch;
	    this.element = document.getElementById(settings.id);
	    this.invert = settings.invert || false;

	    this.init();
	  }

	  _createClass(MoonPhase, [{
	    key: 'rotateDisc',
	    value: function rotateDisc(val) {
	      val = this.invert ? val * -1 : val;
	      this.element.style.transform = 'rotate(' + val + 'deg)';
	    }
	  }, {
	    key: 'getCurrentPhase',
	    value: function getCurrentPhase() {
	      /* Shouts to:  http://jivebay.com/calculating-the-moon-phase/ */
	      var rightNow = this.parent.rightNow,
	          year = rightNow.getFullYear(),
	          month = rightNow.getMonth(),
	          date = rightNow.getDate(),
	          c = void 0,
	          e = void 0,
	          jd = void 0,
	          b = void 0,
	          diff = void 0;

	      if (month < 3) {
	        year--;
	        month += 12;
	      }

	      month++;

	      c = 365.25 * year;
	      e = 30.6 * month;
	      jd = c + e + date - 694039.09;
	      jd /= 29.5305882;
	      b = parseInt(jd);
	      jd -= b;
	      b = Math.round(jd * 8);

	      diff = jd * 10;
	      diff = +diff.toFixed(2);

	      if (b >= 8) {
	        b = 0;
	      }

	      switch (b) {
	        case 0:
	          // New Moon
	          this.rotateDisc(180);
	          break;
	        case 1:
	          // Waxing Crescent
	          this.rotateDisc(22.5);
	          break;
	        case 2:
	          // First Quarter
	          this.rotateDisc(45);
	          break;
	        case 3:
	          // Waxing Gibbous
	          this.rotateDisc(67.5);
	          break;
	        case 4:
	          // Full
	          this.rotateDisc(0);
	          break;
	        case 5:
	          // Waning Gibbous
	          this.rotateDisc(-22.5);
	          break;
	        case 6:
	          // Third quarter
	          this.rotateDisc(-45);
	          break;
	        case 7:
	          // Waning Crescent
	          this.rotateDisc(-67.5);
	          break;
	        default:
	          console.log('Error');
	      }
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      this.getCurrentPhase();
	    }
	  }]);

	  return MoonPhase;
	}();

	module.exports = MoonPhase;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var util = __webpack_require__(3);

	var MinuteRepeater = function () {
	  function MinuteRepeater(dial, repeater, parentWatch) {
	    _classCallCheck(this, MinuteRepeater);

	    this.hands = dial.hands;

	    this.hourAngle = 0;
	    this.hourChimes = 0;
	    this.hourElement = null;
	    this.hourDivisor = dial.format === 12 ? 30 : 15;

	    this.allMinutes = 0;
	    this.minuteAngle = 0;
	    this.fiveMinuteChimes = 0;
	    this.fiveMinuteElement = null;
	    this.minuteChimes = 0;
	    this.minuteElement = null;

	    this.trigger = document.getElementById(repeater.id);
	    this.chimes = repeater.chimes;
	    this.counter = 1;
	    this.isPlaying = false;
	    this.parent = parentWatch;
	    this.init();
	  }

	  _createClass(MinuteRepeater, [{
	    key: 'convertAngleToIncrements',
	    value: function convertAngleToIncrements() {
	      this.hourAngle = util.getCurrentRotateValue(this.hands.hour);
	      if (this.hourAngle > 360) {
	        this.hourAngle -= 360;
	      }
	      this.hourChimes = Math.floor(this.hourAngle / this.hourDivisor);

	      try {
	        if (!this.hands.minute) throw "The minute repeater, like, by definition, requires a dial which supports a minute hand.";
	      } catch (errorMsg) {
	        console.error(errorMsg);
	        return;
	      }
	      this.minuteAngle = util.getCurrentRotateValue(this.hands.minute);
	      console.log(this.minuteAngle);
	      if (this.minuteAngle > 360) {
	        this.minuteAngle %= 360;
	        console.log(this.minuteAngle);
	      }
	      this.allMinutes = Math.floor(this.minuteAngle / 6);
	      this.fiveMinuteChimes = Math.floor(this.allMinutes / 5);
	      this.minuteChimes = Math.floor(this.allMinutes - this.fiveMinuteChimes * 5);
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;

	      this.trigger.addEventListener('click', function () {
	        _this.togglePlaying();
	      });

	      this.hourElement.addEventListener('ended', function () {
	        _this.playHours();
	      });

	      this.fiveMinuteElement.addEventListener('ended', function () {
	        _this.playFiveMinutes();
	      });

	      this.minuteElement.addEventListener('ended', function () {
	        _this.playMinutes();
	      });
	    }
	  }, {
	    key: 'stopAll',
	    value: function stopAll() {
	      this.hourElement.pause();
	      this.hourElement.currentTime = 0;
	      this.fiveMinuteElement.pause();
	      this.fiveMinuteElementcurrentTime = 0;
	      this.minuteElement.pause();
	      this.minuteElementcurrentTime = 0;

	      this.counter = 1;
	      this.isPlaying = false;
	    }
	  }, {
	    key: 'togglePlaying',
	    value: function togglePlaying() {
	      if (this.parent.globalInterval) {
	        this.isPlaying = !this.isPlaying;

	        if (this.isPlaying) {
	          this.convertAngleToIncrements();
	          this.playHours();
	        } else {
	          this.stopAll();
	        }
	      }
	    }
	  }, {
	    key: 'playHours',
	    value: function playHours() {
	      if (this.counter <= this.hourChimes) {
	        this.hourElement.play();
	        this.counter++;
	      } else if (this.counter === this.hourChimes + 1) {
	        this.counter = 1;
	        this.playFiveMinutes();
	      }
	    }
	  }, {
	    key: 'playFiveMinutes',
	    value: function playFiveMinutes() {
	      if (this.counter <= this.fiveMinuteChimes) {
	        this.fiveMinuteElement.play();
	        this.counter++;
	      } else if (this.counter === this.fiveMinuteChimes + 1) {
	        this.counter = 1;
	        this.playMinutes();
	      }
	    }
	  }, {
	    key: 'playMinutes',
	    value: function playMinutes() {
	      if (this.counter <= this.minuteChimes) {
	        this.minuteElement.play();
	        this.counter++;
	      } else if (this.counter === this.minuteChimes + 1) {
	        this.counter = 1;
	      }
	    }
	  }, {
	    key: 'buildAudioElements',
	    value: function buildAudioElements() {
	      this.hourElement = document.createElement('audio');
	      this.hourElement.src = this.chimes.hour;
	      document.body.appendChild(this.hourElement);

	      this.fiveMinuteElement = document.createElement('audio');
	      this.fiveMinuteElement.src = this.chimes.fiveMinute;
	      document.body.appendChild(this.fiveMinuteElement);

	      this.minuteElement = document.createElement('audio');
	      this.minuteElement.src = this.chimes.minute;
	      document.body.appendChild(this.minuteElement);
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      this.buildAudioElements();
	      this.bindEvents();
	    }
	  }]);

	  return MinuteRepeater;
	}();

	module.exports = MinuteRepeater;

/***/ })
/******/ ]);