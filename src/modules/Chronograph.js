// Chronograph Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The chronograph complication requires a buttons and hands object
// the buttons object contains the start and reset buttons which control the hands
// The hands are designed and used to indicate tenth seconds, seconds, and minutes
// for timing events. Flyback and Split-Second (rattrapante) functionality is supported for timing laps.
//
// MONO-PUSHER
// Pusher 1: Click to start
// Pusher 1: Click to pause
// Pusher 1: Click to reset
//
// DUAL-PUSHER
// Standard
// Pusher 1: Starts the time
// Pusher 1: Pauses all hands
// Pusher 2: Resets all hands
//
// Flyback
// Pusher 1: Starts the time
// Pusher 2: Resets all hands then continues
//
// Rattrapante
// Pusher 1: Starts the time
// Pusher 2: Stops the lap hand
// Pusher 2: Resets lap hand to current second hand
// Pusher 1: Stops all hands
// Pusher 2: Resets all hands
//
// TRI-PUSHER
// Pusher 1: Starts the time
// Pusher 2: Pauses the lap hand
// Pusher 2: Resets the lap hand back to constant second hand
// Pusher 3: Stops all hands
// Pusher 1: Resets all hands to original position

class Chronograph {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        this.buttons = {
            primary: document.getElementById(settings.buttons.primary),
            secondary: document.getElementById(settings.buttons.secondary) || null,
            tertiary: document.getElementById(settings.buttons.tertiary) || null
        };

        this.hands = {
            tenth: document.getElementById(settings.hands.tenth) || null,
            second: document.getElementById(settings.hands.second),
            minute: document.getElementById(settings.hands.minute),
            hour: document.getElementById(settings.hands.hour) || null,
            lap: document.getElementById(settings.hands.lap) || null,
        };

        this.flyback = settings.flyback || false;
        this.rattrapante = settings.rattrapante || false;

        this.monopusher = false;
        this.dualpusher = false;
        this.tripusher = false;

        this.interval;
        this.counter = 1;
        this.isRunning = false;
        this.isPaused = false;
        this.lapActive = false;
        this.parent = parentWatch;

        this.init();
    }

    errorChecking(settings) {
        try {
            if (!settings.buttons || !settings.hands)
                throw "The Chronograph requires a settings object containing both the buttons and hands.";
        } catch (errorMsg) {
            console.error(errorMsg);
            return;
        }

        try {
            if (!settings.hands.second || !settings.hands.minute)
                throw "The Chronograph requires at least a second and minute hands.";
        } catch (errorMsg) {
            console.error(errorMsg);
            return;
        }

        try {
            if (!settings.buttons.secondary && !settings.buttons.tertiary && settings.rattrapante)
                throw "A monopusher chronograph cannot support rattrapante functionality";
        } catch (errorMsg) {
            console.error(errorMsg);
            return;
        }

        try {
            if (!settings.buttons.secondary && !settings.buttons.tertiary && settings.flyback)
                throw "A monopusher chronograph cannot support flyuback functionality";
        } catch (errorMsg) {
            console.error(errorMsg);
            return;
        }

        try {
            if (settings.rattrapante && !settings.hands.lap)
                throw "A rattrapante Chronograph requires a 'lap' hand.";
        } catch (errorMsg) {
            console.error(errorMsg);
            return;
        }
    }

    checkForChronographType() {
        if (this.buttons.primary && !this.buttons.secondary && !this.buttons.tertiary) {
            this.monopusher = true;
        } else if (this.buttons.primary && this.buttons.secondary && !this.buttons.tertiary) {
            this.dualpusher = true;
        } else if (this.buttons.primary && this.buttons.secondary && this.buttons.tertiary) {
            this.tripusher = true;
            this.rattrapante = true;
        } else {
            throw "The Chronograph class expects the hands to be added sequentially beginning with primary, secondary, and, lastly, tertiary.";
        }
    }

    bindEvents() {
        this.buttons.primary.addEventListener('click', () => {
            this.toggleActiveState(this.buttons.primary);

            if (this.monopusher) {
                if (!this.isRunning && !this.isPaused) {
                    this.isRunning = true;
                    this.startInterval();
                } else if (this.isRunning && !this.isPaused) {
                    this.isRunning = false;
                    this.isPaused = true;
                    this.clearInterval();
                } else if (!this.isRunning && this.isPaused) {
                    this.isPaused = false;
                    this.resetHands();
                }

            } else if (this.dualpusher) {
                this.isRunning = !this.isRunning;

                if (this.isRunning) {
                    this.startInterval();
                } else {
                    this.clearInterval();
                }

            } else if (this.tripusher) {
                if (!this.isRunning && !this.isPaused) {
                    this.isRunning = true;
                    this.startInterval();
                } else if (!this.isRunning && this.isPaused) {
                    this.isRunning = false;
                    this.isPaused = false;
                    this.counter = 1;
                    this.clearInterval();
                    this.resetHands();
                }
            }
        });

        this.buttons.primary.addEventListener('transitionend', () => {
            if (this.buttons.primary.classList.contains('active')) this.toggleActiveState(this.buttons.primary);
        });

        if (this.buttons.secondary) {
            this.buttons.secondary.addEventListener('click', () => {
                this.toggleActiveState(this.buttons.secondary);

                if (this.dualpusher) {
                    this.resetHands();
                    this.counter = 1;

                    if ((!this.rattrapante && !this.flyback) || !this.isRunning) {
                        this.clearInterval();
                        this.isRunning = false;
                    }
                } else if (this.tripusher) {
                    if (this.isRunning) {
                        this.resetHands();
                    }
                }
            });

            this.buttons.secondary.addEventListener('transitionend', () => {
                if (this.buttons.secondary.classList.contains('active')) this.toggleActiveState(this.buttons.secondary);
            });
        }

        if (this.buttons.tertiary) {
            this.buttons.tertiary.addEventListener('click', () => {
                this.toggleActiveState(this.buttons.tertiary);
                this.isRunning = !this.isRunning;

                if (this.isRunning) {
                    this.startInterval();
                    this.isPaused = false;
                } else {
                    this.clearInterval();
                    this.isRunning = false;
                    this.isPaused = true;
                }
            });

            this.buttons.tertiary.addEventListener('transitionend', () => {
                if (this.buttons.tertiary.classList.contains('active')) this.toggleActiveState(this.buttons.tertiary);
            });
        }
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
        if (this.rattrapante && this.isRunning) {
            if (!this.flyback) {
                this.lapActive = !this.lapActive;
                if (!this.lapActive) {
                    this.hands.lap.style.transform = `rotate(${this.parent.getCurrentRotateValue(this.hands.second)}deg)`;
                }
            } else {
                this.lapActive = true;
                this.hands.lap.style.transform = `rotate(${this.parent.getCurrentRotateValue(this.hands.second)}deg)`;
                this.hands.second.style.transform = 'rotate(0deg)';
                if (this.hands.tenth) this.hands.tenth.style.transform = 'rotate(0deg)';
            }
        } else {
            Object.keys(this.hands).map(hand => {
                if (this.hands[hand]) this.hands[hand].style.transform = 'rotate(0deg)';
            });
            this.lapActive = false;
        }
    }

    rotateHands() {
        let tenthValue = this.hands.tenth ? this.parent.getCurrentRotateValue(this.hands.tenth) : 0;
        let secondValue = this.parent.getCurrentRotateValue(this.hands.second);
        let minuteValue = this.parent.getCurrentRotateValue(this.hands.minute);
        let hourValue = this.hands.hour ? this.parent.getCurrentRotateValue(this.hands.hour) : 0;

        if (this.hands.tenth) this.hands.tenth.style.transform = `rotate(${tenthValue + 0.6}deg)`;

        if (this.counter % 10 === 0) {
            this.hands.second.style.transform = `rotate(${secondValue + 6}deg)`;
            if (!this.lapActive && this.hands.lap) this.hands.lap.style.transform = `rotate(${secondValue + 6}deg)`;
        }

        if (this.counter % 600 === 0) {
            this.hands.minute.style.transform = `rotate(${minuteValue + 6}deg)`;
            if (this.hands.hour) this.hands.hour.style.transform = `rotate(${hourValue + 0.5}deg)`;
            this.counter = 0;
        }
    }

    toggleActiveState(btn) {
        btn.classList.toggle('active');
    }

    init() {
        this.checkForChronographType();
        this.bindEvents();

        Object.keys(this.buttons).map(btn => {
            if (this.buttons[btn]) {
                this.buttons[btn].style.cursor = 'pointer';
            }
        });
    }
}

module.exports = Chronograph;