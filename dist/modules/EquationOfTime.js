"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Equation of Time Class
// @params settings: object
// @params parentWatch: Watch instance
//
// Notes
// Logic taken from: http://www2.arnes.si/~gljsentvid10/sunset_rise.html

var Timezone = require('moment-timezone');

var EquationOfTime = function () {
    function EquationOfTime(settings, parentWatch) {
        _classCallCheck(this, EquationOfTime);

        this.errorChecking(settings);

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;

        this.range = settings.range || [-45, 45];
        this.minRange = this.range[0];
        this.maxRange = this.range[1];
        this.minIncrement = this.minRange / 14;
        this.maxIncrement = this.maxRange / 16;

        this.timezone = Timezone.tz.guess();
        this.rightNow = this.parent.rightNow.tz(this.timezone);

        this.dateObj = {
            hours: this.rightNow.hours(),
            minutes: this.rightNow.minutes(),
            seconds: this.rightNow.seconds(),
            date: this.rightNow.date(),
            month: this.rightNow.month() + 1,
            year: this.rightNow.year()
        };
        this.UT = this.dateObj.hours + this.dateObj.minutes / 60 + this.dateObj.seconds / 3600;
        this.RA = null;
        this.A = null;
        this.JD = null;
        this.eqTime = null;

        this.init();
    }

    _createClass(EquationOfTime, [{
        key: "errorChecking",
        value: function errorChecking(settings) {
            try {
                if (!settings.id) throw "The Equation of Time Class requires that an ID of the indicator element be provided.";
            } catch (errorMsg) {
                console.error(errorMsg);
                return;
            }
        }
    }, {
        key: "rotateHands",
        value: function rotateHands() {
            var increment = this.eqTime > 0 ? this.maxIncrement : this.minIncrement;
            var rotateVal = this.eqTime * increment;
            this.element.style.transform = "rotate(" + rotateVal + "deg)";
        }
    }, {
        key: "JulDay",
        value: function JulDay() {
            var d = this.dateObj.date;
            var m = this.dateObj.month;
            var y = this.dateObj.year;
            var u = this.UT;

            if (y < 1900) y = y + 1900;
            if (m <= 2) {
                m = m + 12;
                y = y - 1;
            }
            this.A = Math.floor(y / 100);
            this.JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d - 13 - 1524.5 + u / 24.0;
            return this.JD;
        }
    }, {
        key: "EPS",
        value: function EPS(T) {
            var K = Math.PI / 180.0;
            var LS = this.sunL(T);
            var LM = 218.3165 + 481267.8813 * T;
            var eps0 = 23.0 + 26.0 / 60.0 + 21.448 / 3600.0 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600;
            var omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + T * T * T / 450000;
            var deltaEps = (9.20 * Math.cos(K * omega) + 0.57 * Math.cos(K * 2 * LS) + 0.10 * Math.cos(K * 2 * LM) - 0.09 * Math.cos(K * 2 * omega)) / 3600;
            return eps0 + deltaEps;
        }
    }, {
        key: "sunL",
        value: function sunL(T) {
            var L = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
            L = L % 360;
            if (L < 0) L = L + 360;
            return L;
        }
    }, {
        key: "declination",
        value: function declination() {
            var K = Math.PI / 180.0;
            var jd = this.JulDay();
            var T = (jd - 2451545.0) / 36525.0;
            var L0 = 280.46645 + (36000.76983 + 0.0003032 * T) * T;
            var M = 357.52910 + (35999.05030 - (0.0001559 * T + 0.00000048 * T) * T) * T;
            M = K * M;
            var C = (1.914600 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000290 * Math.sin(3 * M);
            var theta = L0 + C;
            var omega = 125.04 - 1934.136 * T;
            var lambda = theta - 0.00569 - 0.00478 * Math.sin(K * omega);
            var eps0 = 23.0 + 26.0 / 60.0 + 21.448 / 3600.0 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600;
            var eps = eps0 + 0.00256 * Math.cos(K * omega);
            // let declin = Math.sin(K * eps) * Math.sin(K * lambda);
            // declin = Math.asin(declin) / K;
            this.RA = Math.atan2(Math.cos(K * eps) * Math.sin(K * lambda), Math.cos(K * lambda)) / K;
            if (this.RA < 0) this.RA = this.RA + 360;
        }
    }, {
        key: "deltaPSI",
        value: function deltaPSI(T) {
            var K = Math.PI / 180.0;
            var deltaPsi = void 0,
                omega = void 0,
                LS = void 0,
                LM = void 0;
            LS = this.sunL(T);
            LM = 218.3165 + 481267.8813 * T;
            LM = LM % 360;
            if (LM < 0) LM = LM + 360;
            omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + T * T * T / 450000;
            deltaPsi = -17.2 * Math.sin(K * omega) - 1.32 * Math.sin(K * 2 * LS) - 0.23 * Math.sin(K * 2 * LM) + 0.21 * Math.sin(K * 2 * omega);
            deltaPsi = deltaPsi / 3600.0;
            return deltaPsi;
        }
    }, {
        key: "getEOT",
        value: function getEOT() {
            var K = Math.PI / 180.0;
            var T = (this.JulDay() - 2451545.0) / 36525.0;
            var eps = this.EPS(T);
            this.declination(this.dateObj);
            var LS = this.sunL(T);
            var deltaPsi = this.deltaPSI(T);
            var E = LS - 0.0057183 - this.RA + deltaPsi * Math.cos(K * eps);

            if (E > 5) E = E - 360.0;
            E = E * 4;
            E = Math.round(1000 * E) / 1000;

            this.eqTime = E.toFixed(2);

            this.rotateHands();
        }
    }, {
        key: "init",
        value: function init() {
            this.getEOT();
        }
    }]);

    return EquationOfTime;
}();

module.exports = EquationOfTime;