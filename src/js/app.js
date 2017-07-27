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

      case 'moonphase':
        demoWatchSettings = {
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
        demoWatchSettings = {
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
        demoWatchSettings = {
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
        demoWatchSettings = {
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


  /*
  DOCS SECTION FIXED ON SCROLL
  */
  const docTree = document.querySelector('.docs-tree-container');
  const docsContainer = document.querySelector('.docs-container');
  const docTreeGroups = document.querySelectorAll('.doc-tree-group');

  const gettingStarted = document.querySelector('.getting-started-section');
  const dialsSection = document.querySelector('.dials-section');
  const indicatorSection = document.querySelector('.day-night-indicator-section');
  const crownSection = document.querySelector('.crown-section');
  const repeaterSection = document.querySelector('.minute-repeater-section');
  const moonphaseSection = document.querySelector('.moonphase-section');
  const reserveSection = document.querySelector('.reserve-section');
  const watchSection = document.querySelector('.watch-section');

  docTreeGroups.forEach(group => {
      group.addEventListener('click', function() {
        const type = this.attributes['data-doc-group'].value;
        toggleDocTreeGroups(type);
      });
  });

  function toggleDocTreeGroups(showGroup) {
    docTreeGroups.forEach(group => {
      if (group.attributes['data-doc-group'].value === showGroup) {
        group.classList.add('is-expanded');
      } else {
        group.classList.remove('is-expanded');
        group.classList.add('is-collapsed');
      }
    });
  }


function checkScrollPosition(pos) {
  if (pos >= 57) {
    docTree.classList.add('is-fixed');
    docsContainer.classList.add('fixed-nav');
  } else {
    docTree.classList.remove('is-fixed');
    docsContainer.classList.remove('fixed-nav');
  }

  if (pos < (gettingStarted.offsetTop + gettingStarted.clientHeight)) {
    toggleDocTreeGroups('getting-started');
  } else if (pos > (gettingStarted.offsetTop + gettingStarted.clientHeight) && pos < (dialsSection.offsetTop + dialsSection.clientHeight)) {
    toggleDocTreeGroups('dials');
  } else if (pos > (dialsSection.offsetTop + dialsSection.clientHeight) && pos < (indicatorSection.offsetTop + indicatorSection.clientHeight)) {
    toggleDocTreeGroups('day-night-indicator');
  } else if (pos > (indicatorSection.offsetTop + indicatorSection.clientHeight) && pos < (crownSection.offsetTop + crownSection.clientHeight)) {
    toggleDocTreeGroups('crown');
  } else if (pos > (crownSection.offsetTop + crownSection.clientHeight) && pos < (repeaterSection.offsetTop + repeaterSection.clientHeight)) {
    toggleDocTreeGroups('repeater');
  } else if (pos > (repeaterSection.offsetTop + repeaterSection.clientHeight) && pos < (moonphaseSection.offsetTop + moonphaseSection.clientHeight)) {
    toggleDocTreeGroups('moonphase');
  } else if (pos > (moonphaseSection.offsetTop + moonphaseSection.clientHeight) && pos < (reserveSection.offsetTop + reserveSection.clientHeight)) {
    toggleDocTreeGroups('reserve');
  } else {
    toggleDocTreeGroups('watch');
  }

}

let ticking = false;
window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      checkScrollPosition(window.scrollY);
      ticking = false;
    });
  }
  ticking = true;
});
})();
