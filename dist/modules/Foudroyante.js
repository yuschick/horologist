'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Foudroyante Class
// @params settings: object
// @params parentWatch: Watch instance
//
// Based upon the amount in the steps property, the target element (defined by id)
// will jump [steps] amount of times around its dial per second. For example,
// if steps is set to 6, the hand will jump 60 (360 / 6) degrees every 1/6 of a second.

var Foudroyante = function () {
    function Foudroyante(settings, parentWatch) {
        _classCallCheck(this, Foudroyante);

        this.errorChecking(settings);

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.steps = settings.steps;
        this.degreeIncrement = 360 / this.steps;
        this.currentAngle = 0;

        this.interval;
    }

    _createClass(Foudroyante, [{
        key: 'errorChecking',
        value: function errorChecking(settings) {
            if (!settings.id) throw new ReferenceError('The Foudroyante class requires that an ID of the indiciator element be provided.');
            if (!settings.steps) throw new ReferenceError('The Foudroyante requires a steps value.');
            if (settings.steps < 2 || settings.steps > 10) throw new ReferenceError('The Foudroyante requires a step value between 2-10.');
        }
    }, {
        key: 'defineInterval',
        value: function defineInterval() {
            var _this = this;

            this.interval = setInterval(function () {
                _this.rotateHand();
            }, 1000 / this.steps);
        }
    }, {
        key: 'clearInterval',
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
        key: 'rotateHand',
        value: function rotateHand() {
            if (this.currentAngle === 360 - this.degreeIncrement) {
                this.currentAngle = 0;
            } else {
                this.currentAngle += this.degreeIncrement;
            }
            this.element.style.transform = 'rotate(' + this.currentAngle + 'deg)';
        }
    }, {
        key: 'init',
        value: function init() {
            this.defineInterval();
        }
    }]);

    return Foudroyante;
}();

module.exports = Foudroyante;