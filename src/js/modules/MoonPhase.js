class MoonPhase {
  constructor(settings, parentWatch) {

    try {
      if (!settings.id)
        throw "The MoonPhase class requires that an ID of the moonphase element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.parent = parentWatch;
    this.element = document.getElementById(settings.id);
    this.invert = settings.invert || false;

    this.init();
  }

  rotateDisc(val) {
    val = this.invert ?
      val * -1 :
      val;
    this.element.style.transform = `rotate(${val}deg)`;
  }

  getCurrentPhase() {
    /* Shouts to:  http://jivebay.com/calculating-the-moon-phase/ */
    let rightNow = this.parent.rightNow,
      year = rightNow.getFullYear(),
      month = rightNow.getMonth(),
      date = rightNow.getDate(),
      c,
      e,
      jd,
      b,
      diff;

    if (month < 3) {
      year--;
      month += 12;
    }

    month++;

    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + date - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);

    diff = jd * 10;
    diff = +diff.toFixed(2);

    if (b >= 8) {
      b = 0;
    }

    switch (b) {
      case 0:
        // New Moon
        if (this.invert) {
          this.rotateDisc(0);
        } else {
          this.rotateDisc(180);
        }
        break;
      case 1:
        // Waxing Crescent
        this.rotateDisc(83);
        break;
      case 2:
        // First Quarter
        this.rotateDisc(60);
        break;
      case 3:
        // Waxing Gibbous
        this.rotateDisc(37);
        break;
      case 4:
        // Full
        if (this.invert) {
          this.rotateDisc(180);
        } else {
          this.rotateDisc(0);
        }
        break;
      case 5:
        // Waning Gibbous
        this.rotateDisc(-37);
        break;
      case 6:
        // Third quarter
        this.rotateDisc(-60);
        break;
      case 7:
        // Waning Crescent
        this.rotateDisc(-83);
        break;
      default:
        console.log('Error');
    }
  }

  init() {
    this.getCurrentPhase();
  }
}

module.exports = MoonPhase;
