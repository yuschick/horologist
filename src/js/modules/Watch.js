const Dial = require('./Dial');
const Crown = require('./Crown');
const PowerReserve = require('./PowerReserve');
const MoonPhase = require('./MoonPhase');
const MinuteRepeater = require('./MinuteRepeater');
const DayNightIndicator = require('./DayNightIndicator');
const DayIndicator = require('./DayIndicator');
const DateIndicator = require('./DateIndicator');
const MonthIndicator = require('./MonthIndicator');
const YearIndicator = require('./YearIndicator');

class Watch {
  constructor(settings) {

    try {
      if (!settings.dials)
        throw "At least one dial is required for the Watch class.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.dialInstances = [];
    this.activeDial = 0;
    this.globalInterval = null;
    this.rightNow = new Date();

    settings.dials.forEach((dial) => {
      let tempDial = new Dial(dial, this);
      this.dialInstances.push(tempDial);
    });

    if (settings.crown) {
      this.crown = new Crown(settings.crown, this);
    }

    if (settings.reserve) {
      this.powerReserve = new PowerReserve(settings.reserve, this);
    }

    if (settings.moonphase) {
      this.moonphase = new MoonPhase(settings.moonphase, this);
    }

    if (settings.repeater) {
      this.repeaterDial = settings.repeater.dial || 0;
      this.repeater = new MinuteRepeater(this.dialInstances[this.repeaterDial], settings.repeater, this);
    }

    if (settings.dayNightIndicator) {
      this.dayNightIndicatorDial = settings.dayNightIndicator.dial || 0;
      this.dayNightIndicator = new DayNightIndicator(this.dialInstances[this.dayNightIndicatorDial], settings.dayNightIndicator, this);
    }

    if (settings.day || settings.dayIndicator) {
      this.dayIndicator = new DayIndicator(settings.day, this);
    }

    if (settings.date) {
      this.dateIndicator = new DateIndicator(settings.date, this);
    }

    if (settings.month) {
      this.monthIndicator = new MonthIndicator(settings.month, this);
    }

    if (settings.year) {
      this.yearIndicator = new YearIndicator(settings.year, this);
    }

    this.init();
  }

  getCurrentRotateValue(el) {
    let val = el.style.transform;
    let num = val.replace('rotate(', '').replace('deg)', '');
    return Number(num);
  }

  resetActiveDial() {
    this.activeDial = 0;
  }

  keyBindings() {
    window.addEventListener('keydown', () => {
      switch (event.keyCode) {
        case 37:
          if (this.powerReserve)
            this.powerReserve.incrementReserve();
          break;
        case 13:
          if (this.crown)
            this.crown.toggleCrown();
          break;
      }

      if (this.crown) {
        if (this.crown.crownActive) {
          event.preventDefault();
          switch (event.keyCode) {
            case 37:
              if (this.powerReserve)
                this.powerReserve.incrementReserve();
              break;
            case 38:
              this.dialInstances[this.activeDial].rotateHands();
              break;
            case 39:
              this.activeDial++;

              if (this.activeDial >= this.dialInstances.length) this.activeDial = 0;

              break;
            case 40:
              this.dialInstances[this.activeDial].rotateHands('back');
              break;
          }
        }
      }

    });
  }

  startInterval() {
    this.globalInterval = setInterval(() => {

      this.dialInstances.forEach((dial) => {
        dial.getCurrentTime();
        dial.rotateHands();
      });

      if (this.powerReserve) {
        this.powerReserve.decrementReserve();
      }

      /**
      To be accurate, yes, the moonphase should stop if the power reserve empties
      But is that worth making this call every second?
      **/
      if (this.moonphase) {
        this.moonphase.getCurrentPhase();
      }

    }, 1000);
  }

  stopInterval() {
    clearInterval(this.globalInterval);
    this.globalInterval = null;

    if (this.repeater) {
      this.repeater.stopAll();
    }
  }

  init() {
    this.startInterval();
    this.keyBindings();
  }
}

module.exports = Watch;
