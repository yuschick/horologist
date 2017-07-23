class MinuteRepeater {
  constructor(dial, repeater, parentWatch) {

    try {
      if (!repeater)
        throw "The MinuteRepeater class requires that an ID of the repeater element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.hands = dial.hands;

    this.hourAngle = 0;
    this.hourChimes = 0;
    this.hourElement = null;
    this.hourDivisor = dial.format === 12 ?
      30 :
      15;

    this.allMinutes = 0;
    this.minuteAngle = 0;
    this.fiveMinuteChimes = 0;
    this.fiveMinuteElement = null;
    this.minuteChimes = 0;
    this.minuteElement = null;

    this.trigger = document.getElementById(repeater.id);
    this.chimes = repeater.chimes;
    this.counter = 1;
    this.isPlaying = false;
    this.parent = parentWatch;
    this.init();
  }

  convertAngleToIncrements() {
    this.hourAngle = this.parent.getCurrentRotateValue(this.hands.hour);
    if (this.hourAngle > 360) {
      this.hourAngle -= 360;
    }
    this.hourChimes = Math.floor(this.hourAngle / this.hourDivisor) || 12;

    try {
      if (!this.hands.minute)
        throw "The minute repeater, like, by definition, requires a dial which supports a minute hand.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }
    this.minuteAngle = this.parent.getCurrentRotateValue(this.hands.minute);
    if (this.minuteAngle > 360) {
      this.minuteAngle %= 360;
    }
    this.allMinutes = Math.floor(this.minuteAngle / 6);
    this.fiveMinuteChimes = Math.floor(this.allMinutes / 5);
    this.minuteChimes = Math.floor(this.allMinutes - (this.fiveMinuteChimes * 5));
  }

  bindEvents() {
    this.trigger.addEventListener('click', () => {
      this.togglePlaying();
    });

    this.hourElement.addEventListener('ended', () => {
      this.playHours();
    });

    this.fiveMinuteElement.addEventListener('ended', () => {
      this.playFiveMinutes();
    });

    this.minuteElement.addEventListener('ended', () => {
      this.playMinutes();
    });
  }

  stopAll() {
    this.hourElement.pause();
    this.hourElement.currentTime = 0;
    this.fiveMinuteElement.pause();
    this.fiveMinuteElementcurrentTime = 0;
    this.minuteElement.pause();
    this.minuteElementcurrentTime = 0;

    this.counter = 1;
    this.isPlaying = false;
  }

  togglePlaying() {
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

  playHours() {
    if (this.counter <= this.hourChimes) {
      this.hourElement.play();
      this.counter++;
    } else if (this.counter === this.hourChimes + 1) {
      this.counter = 1;
      this.playFiveMinutes();
    }
  }

  playFiveMinutes() {
    if (this.counter <= this.fiveMinuteChimes) {
      this.fiveMinuteElement.play();
      this.counter++;
    } else if (this.counter === this.fiveMinuteChimes + 1) {
      this.counter = 1;
      this.playMinutes();
    }
  }

  playMinutes() {
    if (this.counter <= this.minuteChimes) {
      this.minuteElement.play();
      this.counter++;
    } else if (this.counter === this.minuteChimes + 1) {
      this.counter = 1;
    }
  }

  buildAudioElements() {
    this.hourElement = document.createElement('audio');
    this.hourElement.src = this.chimes.hour;
    document.body.appendChild(this.hourElement);

    this.fiveMinuteElement = document.createElement('audio');
    this.fiveMinuteElement.src = this.chimes.fiveMinute;
    document.body.appendChild(this.fiveMinuteElement);

    this.minuteElement = document.createElement('audio');
    this.minuteElement.src = this.chimes.minute;
    document.body.appendChild(this.minuteElement);
  }

  init() {
    this.buildAudioElements();
    this.bindEvents();
  }
}

module.exports = MinuteRepeater;
