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

	var util = __webpack_require__(1);

	(function () {
	  "use strict";

	  var Watch = __webpack_require__(2);

	  /*
	  UTIL FUNCTIONS (extract to module)
	  */
	  function showSpecificItem(val, src, prop) {
	    var comp = void 0;
	    src.forEach(function (item) {
	      comp = item.attributes[prop].value;
	      if (comp === val) {
	        item.classList.toggle('is-hidden');
	        return;
	      }
	    });
	  }

	  function hideAllCodeBlocks() {
	    codeBlocks.forEach(function (block) {
	      if (!block.classList.contains('is-hidden')) {
	        block.classList.add('is-hidden');
	      }
	    });
	  }

	  /*
	  HEADER WATCH (extract to module)
	  */
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

	  /*
	  DEMO WATCHES (extract to module)
	  */
	  var demoWatchSettings = null;
	  var demoWatch = null;
	  buildAndShowDemoWatch('dials');

	  function clearCurrentDemo() {
	    demoWatch.stopInterval();
	    demoWatch = null;
	    demoWatchSettings = null;
	  }

	  function buildAndShowDemoWatch(type) {
	    if (demoWatch) clearCurrentDemo();

	    switch (type) {
	      case 'dials':
	        demoWatchSettings = {
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

	        // demoWatch = new Watch(demoWatchSettings);
	        break;

	      case 'day-night-indicator':
	        demoWatchSettings = {
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

	      case 'moonphase':
	        demoWatchSettings = {
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
	        demoWatchSettings = {
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
	        demoWatchSettings = {
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
	        demoWatchSettings = {
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
	              minute: 'crown-secondary-minute-hand',
	              second: 'crown-secondary-second-hand'
	            },
	            offset: '+6',
	            sweep: true
	          }],
	          crown: {
	            id: 'the-crown',
	            blackout: [{
	              selector: '#blackout',
	              className: 'active'
	            }]
	          }
	        };
	        break;
	    }

	    demoWatch = new Watch(demoWatchSettings);
	  }

	  /*
	  COMPLICATIONS DEMOS NAV AND TOGGLE
	  */
	  var complications = document.querySelectorAll('.complication-link');
	  var complicationDemos = document.querySelectorAll('.complication-container');
	  var complicationNavItems = document.querySelectorAll('.secondary-nav li');

	  function toggleVisibleDemo(type) {
	    complicationDemos.forEach(function (demo) {
	      if (!demo.classList.contains('is-hidden')) {
	        demo.classList.add('is-hidden');
	      }
	    });

	    hideAllCodeBlocks();
	    showSpecificItem(type, complicationDemos, 'data-comp');
	    buildAndShowDemoWatch(type);
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

	  /*
	  SHOW DEMO CODE (extract to module)
	  */
	  var viewCodeBtns = document.querySelectorAll('.view-code-btn');
	  var codeBlocks = document.querySelectorAll('.complication.code-block-container');

	  viewCodeBtns.forEach(function (btn) {
	    btn.addEventListener('click', function () {
	      event.preventDefault();
	      var type = this.attributes['data-type'].value;
	      showSpecificItem(type, codeBlocks, 'data-type');
	    });
	  });
	})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

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
	      console.log(prop + " cleared from localStorage.");
	    }
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dial = __webpack_require__(3);
	var Crown = __webpack_require__(4);
	var PowerReserve = __webpack_require__(5);
	var MoonPhase = __webpack_require__(6);
	var MinuteRepeater = __webpack_require__(7);
	var DayNightIndicator = __webpack_require__(8);

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
/* 3 */
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
	    this.setSecondary = false;
	    this.transition = {};

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
	        var hourOffset = this.setSecondary ? this.rotateValues.hourJump : this.rotateValues.hoursRotateValOffset;
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
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	  }, {
	    key: "getCurrentPhase",
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
	          if (this.invert) {
	            this.rotateDisc(0);
	          } else {
	            this.rotateDisc(180);
	          }
	          break;
	        case 1:
	          // Waxing Crescent
	          this.rotateDisc(83);
	          break;
	        case 2:
	          // First Quarter
	          this.rotateDisc(60);
	          break;
	        case 3:
	          // Waxing Gibbous
	          this.rotateDisc(37);
	          break;
	        case 4:
	          // Full
	          if (this.invert) {
	            this.rotateDisc(180);
	          } else {
	            this.rotateDisc(0);
	          }
	          break;
	        case 5:
	          // Waning Gibbous
	          this.rotateDisc(-37);
	          break;
	        case 6:
	          // Third quarter
	          this.rotateDisc(-60);
	          break;
	        case 7:
	          // Waning Crescent
	          this.rotateDisc(-83);
	          break;
	        default:
	          console.log('Error');
	      }
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      this.getCurrentPhase();
	    }
	  }]);

	  return MoonPhase;
	}();

	module.exports = MoonPhase;

/***/ }),
/* 7 */
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
/* 8 */
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

/***/ })
/******/ ]);