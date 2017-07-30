'use strict';
const Watch = require('../modules/Watch');

module.exports = {

  demoWatchSettings: null,
  demoWatch: null,

  clearCurrentDemo() {
    this.demoWatch.stopInterval();
    this.demoWatch = null;
    this.demoWatchSettings = null;
  },

  buildAndShowDemoWatch(type) {
    if (this.demoWatch) this.clearCurrentDemo();

    switch (type) {
      case 'dials':
        this.demoWatchSettings = {
          dials: [{
              name: 'primary',
              hands: {
                hour: 'dial-primary-hour-hand',
                minute: 'dial-primary-minute-hand',
                second: 'dial-primary-second-hand'
              }
            },
            {
              name: 'secondary',
              hands: {
                hour: 'dial-secondary-hour-hand',
                minute: 'dial-secondary-minute-hand',
                second: 'dial-secondary-second-hand'
              },
              offset: '+6',
              sweep: true
            }
          ]
        };

        // demoWatch = new Watch(demoWatchSettings);
        break;

      case 'day-night-indicator':
        this.demoWatchSettings = {
          dials: [{
            hands: {
              hour: 'day-night-hour-hand',
              minute: 'day-night-minute-hand',
              second: 'day-night-second-hand'
            }
          }],
          dayNightIndicator: {
            id: 'day-night-dial'
          }
        };

        break;

      case 'moonphase':
        this.demoWatchSettings = {
          dials: [{
            hands: {
              hour: 'moonphase-hour-hand',
              minute: 'moonphase-minute-hand',
              second: 'moonphase-second-hand'
            }
          }],
          moonphase: {
            id: 'moonphase-dial'
          }
        };
        break;

      case 'minute-repeater':
        this.demoWatchSettings = {
          dials: [{
            hands: {
              hour: 'repeater-hour-hand',
              minute: 'repeater-minute-hand',
              second: 'repeater-second-hand'
            }
          }],
          repeater: {
            id: 'play-repeater',
            chimes: {
              hour: './dist/sounds/chime-01.mp4',
              quarter: './dist/sounds/chime-02.mp4',
              minute: './dist/sounds/chime-03.mp4'
            }
          }
        };
        break;

      case 'power-reserve':
        this.demoWatchSettings = {
          dials: [{
            hands: {
              hour: 'reserve-hour-hand',
              minute: 'reserve-minute-hand',
              second: 'reserve-second-hand'
            }
          }],
          reserve: {
            id: 'reserve-hand',
            range: [-90, 90]
          }
        };
        break;

      case 'manual-time':
        this.demoWatchSettings = {
          dials: [{
              name: 'primary',
              hands: {
                hour: 'crown-primary-hour-hand',
                minute: 'crown-primary-minute-hand',
                second: 'crown-primary-second-hand'
              }
            },
            {
              name: 'secondary',
              hands: {
                hour: 'crown-secondary-hour-hand',
                minute: 'crown-secondary-minute-hand'
              },
              offset: '+6'
            }
          ],
          crown: {
            id: 'the-crown'
          }
        };
        break;
    }

    this.demoWatch = new Watch(this.demoWatchSettings);
  }
};
