'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Crown Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The crown class allows a user to manually set the watche's time and wind a
// power reserve. The crown by default toggles an active class when triggered.

var Crown = function () {
    function Crown(settings, parentWatch) {
        _classCallCheck(this, Crown);

        if (!settings.id) throw new ReferenceError("The Crown class requires that an ID of the crown element be provided.");

        this.crown = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.crownActive = false;

        if (!this.parent.testing) this.init();
    }

    _createClass(Crown, [{
        key: 'toggleCrown',
        value: function toggleCrown() {
            this.crownActive = !this.crownActive;
            this.parent.dialInstances.forEach(function (instance) {
                if (instance.toggleActiveCrown) instance.toggleActiveCrown();
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