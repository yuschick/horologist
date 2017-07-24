class Crown {
  constructor(settings, parentWatch) {

    try {
      if (!settings.id)
        throw "The Crown class requires that an ID of the crown element be provided.";
    } catch (errorMsg) {
      console.error(errorMsg);
      return;
    }

    this.crown = document.getElementById(settings.id);
    this.blackoutElements = settings.blackout;
    this.parent = parentWatch;
    this.crownActive = false;
    this.setSecondary = false;
    this.init();
  }

  toggleBlackout() {
    this.setSecondary = !this.setSecondary;
    this.blackoutElements.forEach((el) => {
      document.querySelector(el.selector).classList.toggle(el.className);
    });
  }

  toggleCrown() {
    this.crownActive = !this.crownActive;
    this.parent.dialInstances.forEach((instance) => {
      if (instance.toggleActiveCrown)
        instance.toggleActiveCrown();
      if (instance.setSecondary)
        instance.toggleSecondaryTime();
    });

    if (this.crownActive) {
      this.parent.stopInterval();
      this.crown.classList.add('active');
      this.parent.dialInstances.forEach((instance) => {
        if (instance.toggleSettingTime)
          instance.toggleSettingTime();
      });
    } else {
      this.parent.startInterval();
      this.crown.classList.remove('active');
      if (this.setSecondary) {
        this.toggleBlackout();
      }
      this.parent.dialInstances.forEach((instance) => {
        if (instance.toggleSettingTime)
          instance.toggleSettingTime();
        if (instance.updateToManualTime)
          instance.updateToManualTime();
      });
    }
  }

  updateCursorForTrigger() {
    this.crown.style.cursor = 'pointer';
  }

  init() {
    this.updateCursorForTrigger();
    this.crown.addEventListener('click', () => {
      this.toggleCrown();
    });
  }
}

module.exports = Crown;
