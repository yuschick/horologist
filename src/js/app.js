const util = require('./util');

(function() {
  "use strict"
  const Watch = require('./modules/Watch');

  /*
  UTIL FUNCTIONS (extract to module)
  */
  function showSpecificItem(val, src, prop) {
    let comp;
    src.forEach(item => {
      comp = item.attributes[prop].value;
      if (comp === val) {
        item.classList.toggle('is-hidden');
        return;
      }
    });
  }

  function hideAllCodeBlocks() {
    codeBlocks.forEach(block => {
      if (!block.classList.contains('is-hidden')) {
        block.classList.add('is-hidden');
      }
    });
  }

  /*
  HEADER WATCH (extract to module)
  */
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

  /*
  DEMO WATCHES (extract to module)
  */
  let demoWatchSettings = null;
  let demoWatch = null;
  buildAndShowDemoWatch('dials');

  function clearCurrentDemo() {
    demoWatch.stopInterval();
    demoWatch = null;
    demoWatchSettings = null;
  }

  function buildAndShowDemoWatch(type) {
    if (demoWatch) clearCurrentDemo();

    switch (type) {
      case 'dials':
        demoWatchSettings = {
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
        demoWatchSettings = {
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
    }

    demoWatch = new Watch(demoWatchSettings);
  }



  /*
  COMPLICATIONS DEMOS NAV AND TOGGLE
  */
  const complications = document.querySelectorAll('.complication-link');
  const complicationDemos = document.querySelectorAll('.complication-container');
  const complicationNavItems = document.querySelectorAll('.secondary-nav li');

  function toggleVisibleDemo(type) {
    complicationDemos.forEach(demo => {
      if (!demo.classList.contains('is-hidden')) {
        demo.classList.add('is-hidden');
      }
    });

    hideAllCodeBlocks();
    showSpecificItem(type, complicationDemos, 'data-comp');
    buildAndShowDemoWatch(type);
  }

  function toggleActiveCompNav(el) {
    complicationNavItems.forEach(item => {
      item.classList.remove('active');
    });
    el.parentElement.classList.add('active');
  }

  complications.forEach(comp => {
    comp.addEventListener('click', function() {
      event.preventDefault();
      const type = this.attributes['data-comp'].value;
      toggleVisibleDemo(type);
      toggleActiveCompNav(this);
    });
  });

  /*
  SHOW DEMO CODE (extract to module)
  */
  const viewCodeBtns = document.querySelectorAll('.view-code-btn');
  const codeBlocks = document.querySelectorAll('.complication.code-block-container');

  viewCodeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      event.preventDefault();
      const type = this.attributes['data-type'].value;
      showSpecificItem(type, codeBlocks, 'data-type');
    });
  });
})();
