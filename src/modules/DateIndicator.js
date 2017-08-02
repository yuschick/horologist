class DateIndicator {
  constructor(settings, parentWatch) {
    if (this.checkForErrors(settings)) return;

    if (settings.split) {
      this.split = true;
      this.ones = document.getElementById(settings.split.ones);
      this.tenths = document.getElementById(settings.split.tenths);
    }
    else {
      this.element = document.getElementById(settings.id);
    }
    this.parent = parentWatch;
    this.date = this.parent.rightNow.getDate();

    this.init();
  }

  checkForErrors(settings) {
    try {
      if (!settings.id && !settings.split)
        throw "The Date Indicator class requires that an ID of the indiciator element be provided.";
    }
    catch (errorMsg) {
      console.error(errorMsg);
      return true;
    }

    try {
      if (settings.id && settings.split)
        throw "Choose EITHER a primary or split indicator.";
    }
    catch (errorMsg) {
      console.error(errorMsg);
      return true;
    }

    try {
      if (settings.split && (!settings.split.ones || !settings.split.tenths))
        throw "When choosing a split date display please provide the IDs for both the ones and tenths discs.";
    }
    catch (errorMsg) {
      console.error(errorMsg);
      return true;
    }
  }

  getRotateValue(type = null) {
    let value = 0;

    if (this.split) {
      if (type === 'ones') {
        let ones = this.date % 10;
        value = ones > 1 ? (ones - 1) * 36 : 36;
      } else {
        let tenths = Math.floor(this.date / 10);
        value = tenths * 90;
      }
    } else {
      value = (this.date - 1) * 11.61;
    }

    console.log(value);

    return value;
  }

  rotateElement() {
    if (this.split) {
      this.ones.style.transform = `rotate(${this.getRotateValue('ones')}deg)`;
      this.tenths.style.transform = `rotate(${this.getRotateValue('tenths')}deg)`;
    } else {
      this.element.style.transform = `rotate(${this.getRotateValue()}deg)`;
    }
  }

  init() {
    this.rotateElement();
  }
}

module.exports = DateIndicator;
