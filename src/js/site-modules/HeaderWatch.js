module.exports = (function() {
  "use strict"
  const Watch = require('../modules/Watch');
  const settings = {
    dials: [{
      name: 'header-dial',
      hands: {
        hour: 'hour-hand',
        minute: 'minute-hand',
        second: 'second-hand'
      },
      sweep: true
    }]
  };
  let headerWatch = new Watch(settings);
})();
