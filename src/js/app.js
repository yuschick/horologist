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

  function findSpecificDemo(type) {
    let comp;
    complicationDemos.forEach(demo => {
      comp = demo.attributes['data-comp'].value;
      if (comp === type) {
        demo.classList.remove('is-hidden');
        return;
      }
    });
  }

  function toggleVisibleDemo(type) {
    complicationDemos.forEach(demo => {
      if (!demo.classList.contains('is-hidden')) {
        demo.classList.add('is-hidden');
      }
    });

    findSpecificDemo(type);
  }

  function toggleActiveCompNav(el) {
    complicationNavItems.forEach(item => {
      item.classList.remove('active');
    });
    el.parentElement.classList.add('active');
  }

  const complications = document.querySelectorAll('.complication-link');
  const complicationDemos = document.querySelectorAll('.complication-container');
  const complicationNavItems = document.querySelectorAll('.secondary-nav li');

  complications.forEach(comp => {
    comp.addEventListener('click', function() {
      event.preventDefault();
      const type = this.attributes['data-comp'].value;
      toggleVisibleDemo(type);
      toggleActiveCompNav(this);
    });
  });
})();
