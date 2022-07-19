// PowerReserve Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The powerreserve class gradually ticks down an indicator which is meant to
// represent the amount of power that remains in the movement for automatic and
// manually-wound watches. Upon draining and reaching its minimum rotation value
// the interval on the parent watch class is cleared and functionality of all
// components, with the exception of the crown, are stopped.

class PowerReserve {
  constructor(settings, parentWatch) {
    this.errorChecking(settings);

    this.element = document.getElementById(settings.id);
    this.interval = null;
    this.parent = parentWatch;
    this.minAngle = settings.range[0];
    this.maxAngle = settings.range[1];
    this.increment = 0.5;
    this.invert = settings.invert || false;

    if (!this.parent.testing) this.init();
  }

  errorChecking(settings) {
    if (!settings.id)
      throw new ReferenceError(
        "The PowerReserve class requires that an ID of the power reserve element be provided."
      );
    if (!settings.range)
      throw new ReferenceError(
        "The PowerReserve class requires that a range of the power reserve element be provided."
      );
  }

  decrementReserve() {
    let currentRotate = this.parent.getCurrentRotateValue(this.element);

    if (currentRotate <= this.minAngle) {
      this.parent.stopInterval();
    } else {
      let newRotate = Number(currentRotate) - this.increment / 2;
      if (this.invert) newRotate *= -1;
      this.element.style.transform = `rotate(${newRotate}deg)`;
    }
  }

  incrementReserve() {
    let currentRotate = this.parent.getCurrentRotateValue(this.element);

    if (
      currentRotate <= this.maxAngle - this.increment &&
      currentRotate >= this.minAngle
    ) {
      let newRotate = Number(currentRotate) + this.increment;
      if (this.invert) newRotate *= -1;
      this.element.style.transform = `rotate(${newRotate}deg)`;
    }
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.decrementReserve();
    }, 1000);
  }

  stopInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  init() {
    const initAngle = this.invert ? this.maxAngle * -1 : this.maxAngle;
    this.element.style.transform = `rotate(${initAngle}deg)`;
  }
}

module.exports = PowerReserve;
