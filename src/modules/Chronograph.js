// Chronograph Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The chronograph complication requires a buttons and hands object
// the buttons object contains the start and reset buttons which control the hands
// The hands are designed and used to indicate tenth seconds, seconds, and minutes
// for timing events. Flyback functionality is supported for timing laps.

class Chronograph {
  constructor(settings, parentWatch) {

    try {
      if (!settings.buttons || !settings.hands)
        throw "The Chronograph requires a settings object containing both the buttons and hands.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.buttons = {
      start: document.getElementById(settings.buttons.start),
      reset: document.getElementById(settings.buttons.reset)
    };

    this.hands = {
      tenth: document.getElementById(settings.hands.tenth),
      second: document.getElementById(settings.hands.second),
      minute: document.getElementById(settings.hands.minute)
    };

    this.flyback = settings.flyback || false;

    this.interval;
    this.counter = 1;
    this.isRunning = false;
    this.parent = parentWatch;

    this.init();
  }

  bindEvents() {
    this.buttons.start.addEventListener('click', () => {
      this.isRunning = !this.isRunning;
      this.toggleButtonClasses(this.buttons.start);

      if (this.isRunning) {
        this.startInterval();
      } else {
        this.clearInterval();
      }
    });

    this.buttons.start.addEventListener('transitionend', () => {
      if (this.buttons.start.classList.contains('active')) this.toggleButtonClasses(this.buttons.start);
    });

    this.buttons.reset.addEventListener('click', () => {
      this.resetHands();
      this.toggleButtonClasses(this.buttons.reset);

      if (!this.flyback || !this.isRunning) {
        this.clearInterval();
        this.isRunning = false;
      }

      this.counter = 1;
    });

    this.buttons.reset.addEventListener('transitionend', () => {
      if (this.buttons.reset.classList.contains('active')) this.toggleButtonClasses(this.buttons.reset);
    });
  }

  clearInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.rotateHands();
      this.counter++;
    }, 100);
  }

  resetHands() {
    Object.keys(this.hands).map(hand => {
      this.hands[hand].style.transform = 'rotate(0deg)';
    });
  }

  toggleButtonClasses(btn) {
    btn.classList.toggle('active');
  }

  rotateHands() {
    let tenthValue = this.parent.getCurrentRotateValue(this.hands.tenth);
    let secondValue = this.parent.getCurrentRotateValue(this.hands.second);
    let minuteValue = this.parent.getCurrentRotateValue(this.hands.minute);

    this.hands.tenth.style.transform = `rotate(${tenthValue + 0.6}deg)`;

    if (this.counter % 10 === 0) {
      this.hands.second.style.transform = `rotate(${secondValue + 6}deg)`;
    }

    if (this.counter % 600 === 0) {
      this.hands.minute.style.transform = `rotate(${minuteValue + 6}deg)`;
      this.counter = 0;
    }
  }

  init() {
    this.bindEvents();

    Object.keys(this.buttons).map(btn => {
      this.buttons[btn].style.cursor = 'pointer';
    });
  }
}

module.exports = Chronograph;
