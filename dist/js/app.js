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
	  "use strict";

	  var util = __webpack_require__(1);
	  var HeaderWatch = __webpack_require__(2);
	  var DemoWatches = __webpack_require__(11);
	  var ComplicationsNav = __webpack_require__(12);
	  var DocsPage = __webpack_require__(13);
	})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  localStorage: {
	    set: function set(prop, value) {
	      localStorage.setItem(prop, JSON.stringify(value));
	    },
	    get: function get(prop) {
	      var data = localStorage[prop] === undefined ? false : JSON.parse(localStorage[prop]);
	      return data;
	    },
	    clear: function clear(prop) {
	      localStorage.removeItem(prop);
	      console.log(prop + ' cleared from localStorage.');
	    }
	  },

	  showSpecificItem: function showSpecificItem(val, src, prop) {
	    var comp = void 0;
	    src.forEach(function (item) {
	      comp = item.attributes[prop].value;
	      if (comp === val) {
	        item.classList.toggle('is-hidden');
	        return;
	      }
	    });
	  },
	  hideAllCodeBlocks: function hideAllCodeBlocks(allBlocks) {
	    allBlocks.forEach(function (block) {
	      if (!block.classList.contains('is-hidden')) {
	        block.classList.add('is-hidden');
	      }
	    });
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function () {
	  "use strict";

	  var Watch = __webpack_require__(3);
	  var settings = {
	    dials: [{
	      name: 'header-dial',
	      hands: {
	        hour: 'hour-hand',
	        minute: 'minute-hand',
	        second: 'second-hand'
	      },
	      sweep: true
	    }]
	  };
	  var headerWatch = new Watch(settings);
	}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dial = __webpack_require__(4);
	var Crown = __webpack_require__(5);
	var PowerReserve = __webpack_require__(6);
	var MoonPhase = __webpack_require__(7);
	var MinuteRepeater = __webpack_require__(8);
	var DayNightIndicator = __webpack_require__(9);
	var DayIndicator = __webpack_require__(10);
	var DateIndicator = __webpack_require__(14);

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
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dial = function () {
	  function Dial(settings, parentWatch) {
	    _classCallCheck(this, Dial);

	    try {
	      if (!settings.hands) throw "The Dial class needs an object containing the HTML elements for the hands.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }
	    this.name = settings.name;
	    this.hands = {};
	    if (settings.hands.hour) this.hands.hour = document.getElementById(settings.hands.hour);
	    if (settings.hands.minute) this.hands.minute = document.getElementById(settings.hands.minute);
	    if (settings.hands.second) this.hands.second = document.getElementById(settings.hands.second);

	    this.parent = parentWatch;

	    this.format = settings.format ? settings.format : 12;
	    this.gmtOffset = settings.offset ? settings.offset.toString() : null;

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
	    // this.setSecondary = false;
	    this.transition = {};

	    this.init();
	  }

	  _createClass(Dial, [{
	    key: 'toggleActiveCrown',
	    value: function toggleActiveCrown() {
	      this.crownActive = !this.crownActive;
	    }

	    // toggleSecondaryTime() {
	    //   this.setSecondary = !this.setSecondary;
	    // }

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
	    key: 'applySweepingTransition',
	    value: function applySweepingTransition() {
	      this.hands.second.style.transition = 'transform 1s linear';
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
	    key: 'checkForDayNightUpdates',
	    value: function checkForDayNightUpdates() {
	      this.parent.dayNightIndicator.convertAngleToHours(this.name);
	    }
	  }, {
	    key: 'rotateHands',
	    value: function rotateHands() {
	      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	      var rotateVal = void 0;

	      if (this.hands.hour) {
	        // let hourOffset = this.setSecondary ?
	        //   this.rotateValues.hourJump :
	        //   this.rotateValues.hoursRotateValOffset;
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

	        this.hands.hour.style.transform = 'rotate(' + rotateVal + 'deg)';
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

	        this.hands.minute.style.transform = 'rotate(' + rotateVal + 'deg)';
	      }

	      if (this.hands.second) {
	        rotateVal = this.currentTime.seconds * this.rotateValues.minutesRotateVal;

	        if (rotateVal === 0) {
	          this.transition.second = this.hands.second.style.transition;
	          this.hands.second.style.transition = 'none';
	        } else if (rotateVal > 0 && this.hands.second.style.transition === 'none') {
	          this.hands.second.style.transition = this.transition.second;
	        }

	        this.hands.second.style.transform = 'rotate(' + rotateVal + 'deg)';
	      }

	      if (this.parent.dayNightIndicator) this.checkForDayNightUpdates();
	    }
	  }, {
	    key: 'init',
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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Crown = function () {
	  function Crown(settings, parentWatch) {
	    _classCallCheck(this, Crown);

	    try {
	      if (!settings.id) throw "The Crown class requires that an ID of the crown element be provided.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }

	    this.crown = document.getElementById(settings.id);
	    // this.blackoutElements = settings.blackout;
	    this.parent = parentWatch;
	    this.crownActive = false;
	    // this.setSecondary = false;
	    this.init();
	  }

	  // toggleBlackout() {
	  //   this.setSecondary = !this.setSecondary;
	  //   this.blackoutElements.forEach((el) => {
	  //     document.querySelector(el.selector).classList.toggle(el.className);
	  //   });
	  // }

	  _createClass(Crown, [{
	    key: 'toggleCrown',
	    value: function toggleCrown() {
	      this.crownActive = !this.crownActive;
	      this.parent.dialInstances.forEach(function (instance) {
	        if (instance.toggleActiveCrown) instance.toggleActiveCrown();
	        // if (instance.setSecondary)
	        //   instance.toggleSecondaryTime();
	      });

	      if (this.crownActive) {
	        this.parent.stopInterval();
	        this.crown.classList.add('active');
	        this.parent.dialInstances.forEach(function (instance) {
	          if (instance.toggleSettingTime) instance.toggleSettingTime();
	        });
	      } else {
	        this.parent.startInterval();
	        this.parent.resetActiveDial();
	        this.crown.classList.remove('active');
	        // if (this.setSecondary) {
	        //   this.toggleBlackout();
	        // }
	        this.parent.dialInstances.forEach(function (instance) {
	          if (instance.toggleSettingTime) instance.toggleSettingTime();
	          if (instance.updateToManualTime) instance.updateToManualTime();
	        });
	      }
	    }
	  }, {
	    key: 'updateCursorForTrigger',
	    value: function updateCursorForTrigger() {
	      this.crown.style.cursor = 'pointer';
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      this.updateCursorForTrigger();
	      this.crown.addEventListener('click', function () {
	        _this.toggleCrown();
	      });
	    }
	  }]);

	  return Crown;
	}();

	module.exports = Crown;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PowerReserve = function () {
	  function PowerReserve(settings, parentWatch) {
	    _classCallCheck(this, PowerReserve);

	    try {
	      if (!settings.id) throw "The PowerReserve class requires that an ID of the power reserve element be provided.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }

	    this.element = document.getElementById(settings.id);
	    this.interval = null;
	    this.parent = parentWatch;
	    this.minAngle = settings.range[0];
	    this.maxAngle = settings.range[1];
	    this.increment = 0.5;
	    this.init();
	  }

	  _createClass(PowerReserve, [{
	    key: "decrementReserve",
	    value: function decrementReserve() {
	      var currentRotate = this.parent.getCurrentRotateValue(this.element);

	      if (currentRotate <= this.minAngle) {
	        this.parent.stopInterval();
	      } else {
	        var newRotate = Number(currentRotate) - this.increment / 2;
	        this.element.style.transform = "rotate(" + newRotate + "deg)";
	      }
	    }
	  }, {
	    key: "incrementReserve",
	    value: function incrementReserve() {
	      var currentRotate = this.parent.getCurrentRotateValue(this.element);

	      if (currentRotate <= this.maxAngle - this.increment && currentRotate >= this.minAngle) {
	        var newRotate = Number(currentRotate) + this.increment;
	        this.element.style.transform = "rotate(" + newRotate + "deg)";
	      }
	    }
	  }, {
	    key: "startInterval",
	    value: function startInterval() {
	      var _this = this;

	      this.interval = setInterval(function () {
	        _this.decrementReserve();
	      }, 1000);
	    }
	  }, {
	    key: "stopInterval",
	    value: function stopInterval() {
	      clearInterval(this.interval);
	      this.interval = null;
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      this.element.style.transform = "rotate(" + this.maxAngle + "deg)";
	    }
	  }]);

	  return PowerReserve;
	}();

	module.exports = PowerReserve;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// http://stackoverflow.com/questions/11759992/calculating-jdayjulian-day-in-javascript
	// http://jsfiddle.net/gkyYJ/
	// http://stackoverflow.com/users/965051/adeneo
	Date.prototype.getJulian = function () {
	  return this / 86400000 - this.getTimezoneOffset() / 1440 + 2440587.5;
	};

	var MoonPhase = function () {
	  function MoonPhase(settings, parentWatch) {
	    _classCallCheck(this, MoonPhase);

	    try {
	      if (!settings.id) throw "The MoonPhase class requires that an ID of the moonphase element be provided.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }

	    this.parent = parentWatch;
	    this.element = document.getElementById(settings.id);
	    this.invert = settings.invert || false;

	    this.init();
	  }

	  _createClass(MoonPhase, [{
	    key: "rotateDisc",
	    value: function rotateDisc(val) {
	      val = this.invert ? val * -1 : val;
	      this.element.style.transform = "rotate(" + val + "deg)";
	    }

	    /*
	      Shouts to: https://github.com/tingletech/moon-phase
	    */

	  }, {
	    key: "moon_day",
	    value: function moon_day(today) {
	      var GetFrac = function GetFrac(fr) {
	        return fr - Math.floor(fr);
	      };

	      var thisJD = today.getJulian();
	      var year = today.getFullYear();
	      var degToRad = 3.14159265 / 180;
	      var K0 = void 0,
	          T = void 0,
	          T2 = void 0,
	          T3 = void 0,
	          J0 = void 0,
	          F0 = void 0,
	          M0 = void 0,
	          M1 = void 0,
	          B1 = void 0,
	          oldJ = void 0;

	      K0 = Math.floor((year - 1900) * 12.3685);
	      T = (year - 1899.5) / 100;
	      T2 = T * T;
	      T3 = T * T * T;
	      J0 = 2415020 + 29 * K0;
	      F0 = 0.0001178 * T2 - 0.000000155 * T3 + (0.75933 + 0.53058868 * K0) - (0.000837 * T + 0.000335 * T2);
	      M0 = 360 * GetFrac(K0 * 0.08084821133) + 359.2242 - 0.0000333 * T2 - 0.00000347 * T3;
	      M1 = 360 * GetFrac(K0 * 0.07171366128) + 306.0253 + 0.0107306 * T2 + 0.00001236 * T3;
	      B1 = 360 * GetFrac(K0 * 0.08519585128) + 21.2964 - 0.0016528 * T2 - 0.00000239 * T3;

	      var phase = 0;
	      var jday = 0;

	      while (jday < thisJD) {
	        var F = F0 + 1.530588 * phase;
	        var M5 = (M0 + phase * 29.10535608) * degToRad;
	        var M6 = (M1 + phase * 385.81691806) * degToRad;
	        var B6 = (B1 + phase * 390.67050646) * degToRad;
	        F -= 0.4068 * Math.sin(M6) + (0.1734 - 0.000393 * T) * Math.sin(M5);
	        F += 0.0161 * Math.sin(2 * M6) + 0.0104 * Math.sin(2 * B6);
	        F -= 0.0074 * Math.sin(M5 - M6) - 0.0051 * Math.sin(M5 + M6);
	        F += 0.0021 * Math.sin(2 * M5) + 0.0010 * Math.sin(2 * B6 - M6);
	        F += 0.5 / 1440;
	        oldJ = jday;
	        jday = J0 + 28 * phase + Math.floor(F);
	        phase++;
	      }

	      // 29.53059 days per lunar month
	      return (thisJD - oldJ) / 29.53059;
	    }

	    /*
	      Shouts to: https://github.com/tingletech/moon-phase
	    */

	  }, {
	    key: "getCurrentPhase",
	    value: function getCurrentPhase(phase) {
	      var sweep = [];
	      var mag = void 0;
	      // the "sweep-flag" and the direction of movement change every quarter moon
	      // zero and one are both new moon; 0.50 is full moon

	      if (phase <= 0.25) {
	        sweep = [1, 0];
	        mag = 20 - 20 * phase * 4;
	      } else if (phase <= 0.50) {
	        sweep = [0, 0];
	        mag = 20 * (phase - 0.25) * 4;
	      } else if (phase <= 0.75) {
	        sweep = [1, 1];
	        mag = 20 - 20 * (phase - 0.50) * 4;
	      } else if (phase <= 1) {
	        sweep = [0, 1];
	        mag = 20 * (phase - 0.75) * 4;
	      } else {
	        return;
	      }

	      if (phase <= 0.0625 || phase > 0.9375) {
	        // new moon
	        if (this.invert) {
	          this.rotateDisc(0);
	        } else {
	          this.rotateDisc(180);
	        }
	      } else if (phase <= 0.1875) {
	        // waxing crescent
	        this.rotateDisc(40);
	      } else if (phase <= 0.3125) {
	        // first quarter
	        this.rotateDisc(25);
	      } else if (phase <= 0.4375) {
	        // waxing gibbous
	        this.rotateDisc(13);
	      } else if (phase <= 0.5625) {
	        // full moon
	        if (this.invert) {
	          this.rotateDisc(180);
	        } else {
	          this.rotateDisc(0);
	        }
	      } else if (phase <= 0.6875) {
	        // waning gibbous
	        this.rotateDisc(-13);
	      } else if (phase <= 0.8125) {
	        // last quarter
	        this.rotateDisc(-25);
	      } else if (phase <= 0.9375) {
	        // waning crescent
	        this.rotateDisc(-40);
	      }
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      this.getCurrentPhase(this.moon_day(this.parent.rightNow));
	    }
	  }]);

	  return MoonPhase;
	}();

	module.exports = MoonPhase;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MinuteRepeater = function () {
	  function MinuteRepeater(dial, repeater, parentWatch) {
	    _classCallCheck(this, MinuteRepeater);

	    try {
	      if (!repeater) throw "The MinuteRepeater class requires that an ID of the repeater element be provided.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }

	    this.hands = dial.hands;

	    this.hourAngle = 0;
	    this.hourChimes = 0;
	    this.hourElement = null;
	    this.hourDivisor = dial.format === 12 ? 30 : 15;

	    this.allMinutes = 0;
	    this.minuteAngle = 0;
	    this.fifteenMinuteChimes = 0;
	    this.fifteenMinuteElement = null;
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
	    key: "convertAngleToIncrements",
	    value: function convertAngleToIncrements() {
	      this.hourAngle = this.parent.getCurrentRotateValue(this.hands.hour);
	      if (this.hourAngle > 360) {
	        this.hourAngle -= 360;
	      }
	      this.hourChimes = Math.floor(this.hourAngle / this.hourDivisor) || 12;

	      try {
	        if (!this.hands.minute) throw "The minute repeater, like, by definition, requires a dial which supports a minute hand.";
	      } catch (errorMsg) {
	        console.error(errorMsg);
	        return;
	      }
	      this.minuteAngle = this.parent.getCurrentRotateValue(this.hands.minute);
	      if (this.minuteAngle > 360) {
	        this.minuteAngle %= 360;
	      }
	      this.allMinutes = Math.floor(this.minuteAngle / 6);
	      this.fifteenMinuteChimes = Math.floor(this.allMinutes / 15);
	      this.minuteChimes = Math.floor(this.allMinutes - this.fifteenMinuteChimes * 15);
	    }
	  }, {
	    key: "bindEvents",
	    value: function bindEvents() {
	      var _this = this;

	      this.trigger.addEventListener('click', function () {
	        _this.togglePlaying();
	      });

	      this.hourElement.addEventListener('ended', function () {
	        _this.playHours();
	      });

	      this.fifteenMinuteElement.addEventListener('ended', function () {
	        _this.playFifteenMinutes();
	      });

	      this.minuteElement.addEventListener('ended', function () {
	        _this.playMinutes();
	      });
	    }
	  }, {
	    key: "stopAll",
	    value: function stopAll() {
	      this.hourElement.pause();
	      this.hourElement.currentTime = 0;
	      this.fifteenMinuteElement.pause();
	      this.fifteenMinuteElementcurrentTime = 0;
	      this.minuteElement.pause();
	      this.minuteElementcurrentTime = 0;

	      this.counter = 1;
	      this.isPlaying = false;
	    }
	  }, {
	    key: "togglePlaying",
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
	    key: "playHours",
	    value: function playHours() {
	      if (this.counter <= this.hourChimes) {
	        this.hourElement.play();
	        this.counter++;
	      } else if (this.counter === this.hourChimes + 1) {
	        this.counter = 1;
	        this.playFifteenMinutes();
	      }
	    }
	  }, {
	    key: "playFifteenMinutes",
	    value: function playFifteenMinutes() {
	      if (this.counter <= this.fifteenMinuteChimes) {
	        this.fifteenMinuteElement.play();
	        this.counter++;
	      } else if (this.counter === this.fifteenMinuteChimes + 1) {
	        this.counter = 1;
	        this.playMinutes();
	      }
	    }
	  }, {
	    key: "playMinutes",
	    value: function playMinutes() {
	      if (this.counter <= this.minuteChimes) {
	        this.minuteElement.play();
	        this.counter++;
	      } else if (this.counter === this.minuteChimes + 1) {
	        this.counter = 1;
	      }
	    }
	  }, {
	    key: "buildAudioElements",
	    value: function buildAudioElements() {
	      this.hourElement = document.createElement('audio');
	      this.hourElement.src = this.chimes.hour;
	      document.body.appendChild(this.hourElement);

	      this.fifteenMinuteElement = document.createElement('audio');
	      this.fifteenMinuteElement.src = this.chimes.quarter;
	      document.body.appendChild(this.fifteenMinuteElement);

	      this.minuteElement = document.createElement('audio');
	      this.minuteElement.src = this.chimes.minute;
	      document.body.appendChild(this.minuteElement);
	    }
	  }, {
	    key: "updateCursorForTrigger",
	    value: function updateCursorForTrigger() {
	      this.trigger.style.cursor = 'pointer';
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      this.buildAudioElements();
	      this.bindEvents();
	      this.updateCursorForTrigger();
	    }
	  }]);

	  return MinuteRepeater;
	}();

	module.exports = MinuteRepeater;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DayNightIndicator = function () {
	  function DayNightIndicator(dial, settings, parentWatch) {
	    _classCallCheck(this, DayNightIndicator);

	    try {
	      if (!settings.id) throw "The DayNightIndicator class requires that an ID of the indiciator element be provided.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }

	    this.element = document.getElementById(settings.id);
	    this.dial = dial;
	    this.hands = dial.hands;
	    this.parent = parentWatch;
	    this.invert = settings.invert || false;

	    this.hours = this.parent.rightNow.getHours();
	    this.isAM = this.hours < 12 ? true : false;

	    this.hourAngle = 0;
	    this.hourDivisor = dial.format === 12 ? 30 : 15;

	    this.init();
	  }

	  _createClass(DayNightIndicator, [{
	    key: "toggleAMPM",
	    value: function toggleAMPM() {
	      this.isAM = !this.isAM;
	    }
	  }, {
	    key: "removeTransitionDuration",
	    value: function removeTransitionDuration() {
	      this.element.style.transition = 'none';
	    }
	  }, {
	    key: "rotateIndicator",
	    value: function rotateIndicator() {
	      var rotateValue = 0;

	      if (this.hours >= 0 && this.hours < 6) {
	        rotateValue = this.invert ? 180 : 0;
	      } else if (this.hours >= 6 && this.hours < 12) {
	        rotateValue = 90;
	      } else if (this.hours >= 12 && this.hours < 18) {
	        rotateValue = this.invert ? 0 : 180;
	      } else {
	        rotateValue = 270;
	      }

	      if (this.invert) rotateValue = rotateValue * -1;

	      this.element.style.transform = "rotate(" + rotateValue + "deg)";
	    }
	  }, {
	    key: "getHourHandAngle",
	    value: function getHourHandAngle() {
	      this.hourAngle = this.parent.getCurrentRotateValue(this.hands.hour);
	    }
	  }, {
	    key: "convertAngleToHours",
	    value: function convertAngleToHours(name) {
	      if (name !== this.dial.name) return;

	      this.getHourHandAngle();

	      if (this.hourAngle === 360) {
	        this.toggleAMPM();
	      }

	      this.hours = Math.floor(this.hourAngle / this.hourDivisor);
	      this.hours = this.isAM ? this.hours : this.hours + 12;
	      this.hours = this.hours === 24 ? 0 : this.hours;

	      this.rotateIndicator();
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      this.removeTransitionDuration();
	      this.rotateIndicator();
	    }
	  }]);

	  return DayNightIndicator;
	}();

	module.exports = DayNightIndicator;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DayIndicator = function () {
	  function DayIndicator(settings, parentWatch) {
	    _classCallCheck(this, DayIndicator);

	    try {
	      if (!settings.id) throw "The Day Indicator class requires that an ID of the indiciator element be provided.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }

	    this.element = document.getElementById(settings.id);
	    this.parent = parentWatch;
	    this.day = this.parent.rightNow.getDay();
	    this.hours = this.parent.rightNow.getHours();
	    this.offsetHours = settings.offsetHours || false;

	    this.init();
	  }

	  _createClass(DayIndicator, [{
	    key: "getRotateValue",
	    value: function getRotateValue() {
	      var value = this.day * 51.43;

	      if (this.offsetHours) {
	        value += this.hours * 2.14;
	      }

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

	  return DayIndicator;
	}();

	module.exports = DayIndicator;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Watch = __webpack_require__(3);

	module.exports = {

	  demoWatchSettings: null,
	  demoWatch: null,

	  clearCurrentDemo: function clearCurrentDemo() {
	    this.demoWatch.stopInterval();
	    this.demoWatch = null;
	    this.demoWatchSettings = null;
	  },
	  buildAndShowDemoWatch: function buildAndShowDemoWatch(type) {
	    if (this.demoWatch) this.clearCurrentDemo();

	    switch (type) {
	      case 'dials':
	        this.demoWatchSettings = {
	          dials: [{
	            name: 'primary',
	            hands: {
	              hour: 'dial-primary-hour-hand',
	              minute: 'dial-primary-minute-hand',
	              second: 'dial-primary-second-hand'
	            }
	          }, {
	            name: 'secondary',
	            hands: {
	              hour: 'dial-secondary-hour-hand',
	              minute: 'dial-secondary-minute-hand',
	              second: 'dial-secondary-second-hand'
	            },
	            offset: '+6',
	            sweep: true
	          }]
	        };

	        break;

	      case 'date-indicator':
	        this.demoWatchSettings = {
	          dials: [{
	            hands: {
	              hour: 'date-hour-hand',
	              minute: 'date-minute-hand',
	              second: 'date-second-hand'
	            }
	          }],
	          date: {
	            id: 'date-disc'
	          }
	        };

	        break;

	      case 'day-night-indicator':
	        this.demoWatchSettings = {
	          dials: [{
	            hands: {
	              hour: 'day-night-hour-hand',
	              minute: 'day-night-minute-hand',
	              second: 'day-night-second-hand'
	            }
	          }],
	          dayNightIndicator: {
	            id: 'day-night-dial'
	          }
	        };

	        break;

	      case 'day-indicator':
	        this.demoWatchSettings = {
	          dials: [{
	            hands: {
	              hour: 'day-indicator-hour-hand',
	              minute: 'day-indicator-minute-hand',
	              second: 'day-indicator-second-hand'
	            }
	          }],
	          dayIndicator: {
	            id: 'day-indicator-disc'
	          }
	        };

	        break;

	      case 'moonphase':
	        this.demoWatchSettings = {
	          dials: [{
	            hands: {
	              hour: 'moonphase-hour-hand',
	              minute: 'moonphase-minute-hand',
	              second: 'moonphase-second-hand'
	            }
	          }],
	          moonphase: {
	            id: 'moonphase-dial'
	          }
	        };
	        break;

	      case 'minute-repeater':
	        this.demoWatchSettings = {
	          dials: [{
	            hands: {
	              hour: 'repeater-hour-hand',
	              minute: 'repeater-minute-hand',
	              second: 'repeater-second-hand'
	            }
	          }],
	          repeater: {
	            id: 'play-repeater',
	            chimes: {
	              hour: './dist/sounds/chime-01.mp4',
	              quarter: './dist/sounds/chime-02.mp4',
	              minute: './dist/sounds/chime-03.mp4'
	            }
	          }
	        };
	        break;

	      case 'power-reserve':
	        this.demoWatchSettings = {
	          dials: [{
	            hands: {
	              hour: 'reserve-hour-hand',
	              minute: 'reserve-minute-hand',
	              second: 'reserve-second-hand'
	            }
	          }],
	          reserve: {
	            id: 'reserve-hand',
	            range: [-90, 90]
	          }
	        };
	        break;

	      case 'manual-time':
	        this.demoWatchSettings = {
	          dials: [{
	            name: 'primary',
	            hands: {
	              hour: 'crown-primary-hour-hand',
	              minute: 'crown-primary-minute-hand',
	              second: 'crown-primary-second-hand'
	            }
	          }, {
	            name: 'secondary',
	            hands: {
	              hour: 'crown-secondary-hour-hand',
	              minute: 'crown-secondary-minute-hand'
	            },
	            offset: '+6'
	          }],
	          crown: {
	            id: 'the-crown'
	          }
	        };
	        break;
	    }

	    this.demoWatch = new Watch(this.demoWatchSettings);
	  }
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function () {
	  'use strict';

	  var util = __webpack_require__(1);
	  var DemoWatches = __webpack_require__(11);

	  var complications = document.querySelectorAll('.complication-link');
	  var complicationDemos = document.querySelectorAll('.complication-container');
	  var complicationNavItems = document.querySelectorAll('.secondary-nav li');
	  var viewCodeBtns = document.querySelectorAll('.view-code-btn');
	  var codeBlocks = document.querySelectorAll('.complication.code-block-container');

	  function toggleVisibleDemo(type) {
	    complicationDemos.forEach(function (demo) {
	      if (!demo.classList.contains('is-hidden')) {
	        demo.classList.add('is-hidden');
	      }
	    });

	    util.hideAllCodeBlocks(codeBlocks);
	    util.showSpecificItem(type, complicationDemos, 'data-comp');
	    DemoWatches.buildAndShowDemoWatch(type);
	  }

	  function toggleActiveCompNav(el) {
	    complicationNavItems.forEach(function (item) {
	      item.classList.remove('active');
	    });
	    el.parentElement.classList.add('active');
	  }

	  complications.forEach(function (comp) {
	    comp.addEventListener('click', function () {
	      event.preventDefault();
	      var type = this.attributes['data-comp'].value;
	      toggleVisibleDemo(type);
	      toggleActiveCompNav(this);
	    });
	  });

	  viewCodeBtns.forEach(function (btn) {
	    btn.addEventListener('click', function () {
	      event.preventDefault();
	      var type = this.attributes['data-type'].value;
	      util.showSpecificItem(type, codeBlocks, 'data-type');
	    });
	  });

	  DemoWatches.buildAndShowDemoWatch('dials');
	}();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function () {
	  var docTree = document.querySelector('.aside-nav-container');

	  if (!docTree) return;

	  var docsContainer = document.querySelector('.docs-container');
	  var docTreeGroups = document.querySelectorAll('.doc-tree-group');

	  var gettingStarted = document.querySelector('.getting-started-section');
	  var dialsSection = document.querySelector('.dials-section');
	  var indicatorSection = document.querySelector('.day-night-indicator-section');
	  var dayIndicatorSection = document.querySelector('.day-indicator-section');
	  var dateIndicatorSection = document.querySelector('.date-indicator-section');
	  var crownSection = document.querySelector('.crown-section');
	  var repeaterSection = document.querySelector('.minute-repeater-section');
	  var moonphaseSection = document.querySelector('.moonphase-section');
	  var reserveSection = document.querySelector('.reserve-section');
	  var watchSection = document.querySelector('.watch-section');

	  docTreeGroups.forEach(function (group) {
	    group.addEventListener('click', function () {
	      var type = this.attributes['data-doc-group'].value;
	      toggleDocTreeGroups(type);
	    });
	  });

	  function toggleDocTreeGroups(showGroup) {
	    docTreeGroups.forEach(function (group) {
	      if (group.attributes['data-doc-group'].value === showGroup) {
	        group.classList.add('is-expanded');
	      } else {
	        group.classList.remove('is-expanded');
	        group.classList.add('is-collapsed');
	      }
	    });
	  }

	  function checkScrollPosition(pos) {
	    if (pos >= 57) {
	      docTree.classList.add('is-fixed');
	      docsContainer.classList.add('fixed-nav');
	    } else {
	      docTree.classList.remove('is-fixed');
	      docsContainer.classList.remove('fixed-nav');
	    }

	    if (pos < gettingStarted.offsetTop + gettingStarted.clientHeight) {
	      toggleDocTreeGroups('getting-started');
	    } else if (pos > gettingStarted.offsetTop + gettingStarted.clientHeight && pos < dialsSection.offsetTop + dialsSection.clientHeight) {
	      toggleDocTreeGroups('dials');
	    } else if (pos > dialsSection.offsetTop + dialsSection.clientHeight && pos < dateIndicatorSection.offsetTop + dateIndicatorSection.clientHeight) {
	      toggleDocTreeGroups('date-indicator');
	    } else if (pos > dialsSection.offsetTop + dialsSection.clientHeight && pos < indicatorSection.offsetTop + indicatorSection.clientHeight) {
	      toggleDocTreeGroups('day-night-indicator');
	    } else if (pos > indicatorSection.offsetTop + indicatorSection.clientHeight && pos < dayIndicatorSection.offsetTop + dayIndicatorSection.clientHeight) {
	      toggleDocTreeGroups('day-indicator');
	    } else if (pos > indicatorSection.offsetTop + indicatorSection.clientHeight && pos < crownSection.offsetTop + crownSection.clientHeight) {
	      toggleDocTreeGroups('crown');
	    } else if (pos > crownSection.offsetTop + crownSection.clientHeight && pos < repeaterSection.offsetTop + repeaterSection.clientHeight) {
	      toggleDocTreeGroups('repeater');
	    } else if (pos > repeaterSection.offsetTop + repeaterSection.clientHeight && pos < moonphaseSection.offsetTop + moonphaseSection.clientHeight) {
	      toggleDocTreeGroups('moonphase');
	    } else if (pos > moonphaseSection.offsetTop + moonphaseSection.clientHeight && pos < reserveSection.offsetTop + reserveSection.clientHeight) {
	      toggleDocTreeGroups('reserve');
	    } else {
	      toggleDocTreeGroups('watch');
	    }
	  }

	  var ticking = false;
	  window.addEventListener('scroll', function () {
	    if (!ticking) {
	      window.requestAnimationFrame(function () {
	        checkScrollPosition(window.scrollY);
	        ticking = false;
	      });
	    }
	    ticking = true;
	  });
	}();

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DateIndicator = function () {
	  function DateIndicator(settings, parentWatch) {
	    _classCallCheck(this, DateIndicator);

	    try {
	      if (!settings.id) throw "The Date Indicator class requires that an ID of the indiciator element be provided.";
	    } catch (errorMsg) {
	      console.error(errorMsg);
	      return;
	    }

	    this.element = document.getElementById(settings.id);
	    this.parent = parentWatch;
	    this.date = this.parent.rightNow.getDate();

	    this.init();
	  }

	  _createClass(DateIndicator, [{
	    key: "getRotateValue",
	    value: function getRotateValue() {
	      var value = (this.date - 1) * 11.61;

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

	  return DateIndicator;
	}();

	module.exports = DateIndicator;

/***/ })
/******/ ]);