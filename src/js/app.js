const Watch = require('./../index');

(function() {
    let settings = {};
    let demo = null;

    /*
     * Dual Time Demo
     */
    settings = {
        dials: [{
            name: 'primary',
            hands: {
                hour: 'dial-primary-hour-hand',
                minute: 'dial-primary-minute-hand',
                second: 'dial-primary-second-hand',
            },
        }, {
            name: 'secondary',
            hands: {
                hour: 'dial-secondary-hour-hand',
                minute: 'dial-secondary-minute-hand',
                second: 'dial-secondary-second-hand',
            },
            sweep: true,
            timezone: 'America/New_York'
        }]
    };

    demo = new Watch(settings);

    /*
     * Minute Repeater Demo
     */
    settings = {
        dials: [{
            name: 'primary',
            hands: {
                hour: 'repeater-hour-hand',
                minute: 'repeater-minute-hand',
                second: 'repeater-second-hand',
            },
            sweep: true
        }],
        repeater: {
            id: 'repeater-btn',
            chimes: {
                hour: './dist/sounds/chime-01.mp4',
                minute: './dist/sounds/chime-02.mp4'
            }
        }
    };

    demo = new Watch(settings);

    /*
     * Chronograph  Demo
     */
    settings = {
        dials: [{
            name: 'primary',
            hands: {
                hour: 'chronograph-hour-hand',
                minute: 'chronograph-minute-hand',
                second: 'chronograph-second-hand',
            },
            sweep: true
        }],
        chronograph: {
            buttons: {
                primary: 'chronograph-primary-btn',
                secondary: 'chronograph-secondary-btn',
                tertiary: 'chronograph-tertiary-btn',

            },
            hands: {
                tenth: 'chrono-tenth-hand',
                second: 'chrono-second-hand',
                minute: 'chrono-minute-hand',
                hour: 'chrono-hour-hand',
                lap: 'chrono-lap-hand',
            },
            flyback: true
        }
    };

    demo = new Watch(settings);

    /*
     * Grande Complication  Demo
     */
    settings = {
        dials: [{
            hands: {
                hour: 'grande-hour-hand',
                minute: 'grande-minute-hand',
                second: 'grande-second-hand',
            },
        }],
        chronograph: {
            buttons: {
                primary: 'grande-primary-button',
                secondary: 'grande-secondary-button'
            },
            hands: {
                tenth: 'grande-chrono-tenth-second-hand',
                second: 'grande-chrono-second-hand',
                minute: 'grande-chrono-minute-hand',
                hour: 'grande-chrono-hour-hand'
            },
            flyback: true
        },
        repeater: {
            id: 'grande-repeater-button',
            chimes: {
                minute: './../dist/sounds/chime-01.mp4',
                hour: './../dist/sounds/chime-02.mp4'
            }
        },
        dayNightIndicator: {
            id: 'grande-daynight-disc'
        },
        moonphase: {
            id: 'grande-moonphase-disc'
        },
        day: {
            id: 'grande-day-disc',
            invert: true
        },
        date: {
            id: 'grande-date-disc'
        },
        month: {
            id: 'grande-month-disc',
            invert: true
        },
        week: {
            id: 'grande-week-display-ring'
        },
        year: {
            id: 'grande-year-indicator-disc'
        },
        eqTime: {
            id: 'grande-equation-hand',
            range: [-38, 38]
        }
    };

    demo = new Watch(settings);
})();