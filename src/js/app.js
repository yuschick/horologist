(function() {
  'use strict';

  const Watch = require('./modules/Watch');
  const settings = {
    dials: [{
      name: 'local-time',
      hands: {
        hour: 'primary-hours-hand',
        minute: 'primary-minutes-hand'
      },
      offset: '+3'
    }, {
      name: 'home-time',
      hands: {
        hour: 'secondary-hours-hand',
        second: 'secondary-minutes-hand'
      },
      offset: '-4',
      format: 24,
      sweep: true
    }],
    reserve: {
      id: 'power-reserve-hand',
      range: [-90, 90]
    },
    crown: {
      id: 'crown',
      blackout: [{
        selector: '.blackout',
        className: 'active'
      }, {
        selector: '.main_dial',
        className: 'faded'
      }]
    },
    repeater: {
      id: 'repeater-btn',
      chimes: {
        hour: './dist/sounds/chime-01.mp4',
        fiveMinute: './dist/sounds/chime-02.mp4',
        minute: './dist/sounds/chime-03.mp4'
      }
    },
    // dayNightIndicator: {
    //   id: 'power-reserve-hand',
    //   invert: true
    // }
  };

  let VoutilainenGMR = new Watch(settings);

  /**
  Custom Form Settings
  **/
  const homeTime = document.getElementById('home-field');
  const localTime = document.getElementById('local-field');

  homeTime.addEventListener('change', () => {
    VoutilainenGMR.stopInterval();
    settings.dials[1].offset = homeTime.value.toString();
    VoutilainenGMR = new Watch(settings);
  });
  localTime.addEventListener('change', () => {
    VoutilainenGMR.stopInterval();
    settings.dials[0].offset = localTime.value.toString();
    VoutilainenGMR = new Watch(settings);
  });
})();
