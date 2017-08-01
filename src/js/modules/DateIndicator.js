class DateIndicator {
  constructor(settings, parentWatch) {

    try {
      if (!settings.id)
        throw "The Date Indicator class requires that an ID of the indiciator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.parent = parentWatch;
    this.date = this.parent.rightNow.getDate();

    this.init();
  }

  getRotateValue() {
    let value = (this.date - 1) * 11.61;

    return value;
  }

  rotateElement() {
    this.element.style.transform = `rotate(${this.getRotateValue()}deg)`;
  }

  init() {
    this.rotateElement();
  }
}

module.exports = DateIndicator;
