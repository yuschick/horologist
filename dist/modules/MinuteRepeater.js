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