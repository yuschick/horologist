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

	"use strict";

	var util = __webpack_require__(1);

	(function () {
	  "use strict";

	  var ls = util.localStorage;
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

/***/ })
/******/ ]);