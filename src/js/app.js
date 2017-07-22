const util = require('./util');

(function() {
  "use strict"
  const Watch = require('./modules/Watch');
  const settings = {
    dials: [{
      name: 'header-dial',
      hands: {
        hour: 'hour-hand',
        minute: 'minute-hand',
        second: 'second-hand'
      }
    }]
  };

  let headerWatch = new Watch(settings);
})();
