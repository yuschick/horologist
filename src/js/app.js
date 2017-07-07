(function() {
  'use strict';

  const Watch = require('./modules/Watch');
  const settings = {
    dials: [
      {
        id: 'local-time',
        hands: {
          hour: 'primary-hours-hand',
          minute: 'primary-minutes-hand'
        },
        offset: '+3'
      }, {
        id: 'home-time',
        hands: {
          hour: 'secondary-hours-hand',
          second: 'secondary-minutes-hand'
        },
        offset: '-4',
        format: 24
      }
    ],
    reserve: {
      id: 'power-reserve-hand',
      range: [-90, 90]
    },
    crown: {
      id: 'crown',
      blackout: [
        {
          selector: '.blackout',
          className: 'active'
        }, {
          selector: '.main_dial',
          className: 'faded'
        }
      ]
    }
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
