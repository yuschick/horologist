class PowerReserve {
  constructor(settings, parentWatch) {

    try {
      if (!settings.id)
        throw "The PowerReserve class requires that an ID of the power reserve element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.interval = null;
    this.parent = parentWatch;
    this.minAngle = settings.range[0];
    this.maxAngle = settings.range[1];
    this.increment = 0.5;
    this.init();
  }

  decrementReserve() {
    let currentRotate = this.parent.getCurrentRotateValue(this.element);

    if (currentRotate <= this.minAngle) {
      this.parent.stopInterval();
    } else {
      let newRotate = Number(currentRotate) - (this.increment / 2);
      this.element.style.transform = `rotate(${newRotate}deg)`;
    }
  }

  incrementReserve() {
    let currentRotate = this.parent.getCurrentRotateValue(this.element);

    if (currentRotate <= (this.maxAngle - this.increment) && currentRotate >= this.minAngle) {
      let newRotate = Number(currentRotate) + this.increment;
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
    this.element.style.transform = `rotate(${this.maxAngle}deg)`;
  }
}

module.exports = PowerReserve;
