"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Moonphase Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The moonphase class still uses the native Date constructor in JavaScript.
// Based on the current date it returns, the moon's position is calculated and
// a numeric value is returned. Based on this value, the moonphase indicator is
// rotated.

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
    this.rightNow = new Date();
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

      phase = phase.toFixed(5) * 3.6;
      this.rotateDisc(phase * 100);

      /*
        if (phase <= 0.0625 || phase > 0.9375) {
          if (this.invert) {
            this.rotateDisc(0); // new moon
          } else {
            this.rotateDisc(180); // new moon
          }
          this.rotateDisc(phase * 3.6);
        } else if (phase <= 0.1875) {
          this.rotateDisc(40); // waxing crescent
        } else if (phase <= 0.3125) {
          this.rotateDisc(25); // first quarter
        } else if (phase <= 0.4375) {
          this.rotateDisc(13); // waxing gibbous
        } else if (phase <= 0.5625) {
          if (this.invert) {
            this.rotateDisc(180); // full moon
          } else {
            this.rotateDisc(0); // full moon
          }
        } else if (phase <= 0.6875) {
          this.rotateDisc(-13);// waning gibbous
        } else if (phase <= 0.8125) {
          this.rotateDisc(-25); // last quarter
        } else if (phase <= 0.9375) {
          this.rotateDisc(-40); // waning crescent
        }
      */
    }
  }, {
    key: "init",
    value: function init() {
      this.getCurrentPhase(this.moon_day(this.rightNow));
    }
  }]);

  return MoonPhase;
}();

module.exports = MoonPhase;