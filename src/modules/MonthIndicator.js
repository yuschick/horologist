class MonthIndicator {
  constructor(settings, parentWatch) {

    try {
      if (!settings.id)
        throw "The Month Indicator class requires that an ID of the indicator element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.element = document.getElementById(settings.id);
    this.parent = parentWatch;
    this.month = this.parent.rightNow.getMonth();

    this.init();
  }

  getRotateValue() {
    let value = this.month * 30;

    return value;
  }

  rotateElement() {
    this.element.style.transform = `rotate(${this.getRotateValue()}deg)`;
  }

  init() {
    this.rotateElement();
  }
}

module.exports = MonthIndicator;
