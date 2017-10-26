'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// PowerReserve Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The powerreserve class gradually ticks down an indicator which is meant to
// represent the amount of power that remains in the movement for automatic and
// manually-wound watches. Upon draining and reaching its minimum rotation value
// the interval on the parent watch class is cleared and functionality of all
// components, with the exception of the crown, are stopped.

var PowerReserve = function () {
    function PowerReserve(settings, parentWatch) {
        _classCallCheck(this, PowerReserve);

        this.errorChecking(settings);

        this.element = document.getElementById(settings.id);
        this.interval = null;
        this.parent = parentWatch;
        this.minAngle = settings.range[0];
        this.maxAngle = settings.range[1];
        this.increment = 0.5;

        if (!this.parent.testing) this.init();
    }

    _createClass(PowerReserve, [{
        key: 'errorChecking',
        value: function errorChecking(settings) {
            if (!settings.id) throw new ReferenceError('The PowerReserve class requires that an ID of the power reserve element be provided.');
            if (!settings.range) throw new ReferenceError('The PowerReserve class requires that a range of the power reserve element be provided.');
        }
    }, {
        key: 'decrementReserve',
        value: function decrementReserve() {
            var currentRotate = this.parent.getCurrentRotateValue(this.element);

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
            var currentRotate = this.parent.getCurrentRotateValue(this.element);

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