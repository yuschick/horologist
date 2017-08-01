class DayIndicator {
  constructor(settings, parentWatch) {

    try {
      if (!settings.id)
        throw "The Day Indicator class requires that an ID of the indiciator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.parent = parentWatch;
    this.day = this.parent.rightNow.getDay();
    this.hours = this.parent.rightNow.getHours();
    this.offsetHours = settings.offsetHours || false;

    this.init();
  }

  getRotateValue() {
    let value = (this.day * 51.43);

    if (this.offsetHours) {
      value += this.hours * 2.14;
    }

    return value;
  }

  rotateElement() {
    this.element.style.transform = `rotate(${this.getRotateValue()}deg)`;
  }

  init() {
    this.rotateElement();
  }
}

module.exports = DayIndicator;
