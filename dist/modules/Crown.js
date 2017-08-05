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
    this.parent = parentWatch;
    this.crownActive = false;
    this.init();
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