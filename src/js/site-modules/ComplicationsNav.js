module.exports = (function() {
  'use strict'
  const util = require('../util');
  const DemoWatches = require('./DemoWatches');

  const complications = document.querySelectorAll('.complication-link');
  const complicationDemos = document.querySelectorAll('.complication-container');
  const complicationNavItems = document.querySelectorAll('.secondary-nav li');
  const viewCodeBtns = document.querySelectorAll('.view-code-btn');
  const codeBlocks = document.querySelectorAll('.complication.code-block-container');

  function toggleVisibleDemo(type) {
    complicationDemos.forEach(demo => {
      if (!demo.classList.contains('is-hidden')) {
        demo.classList.add('is-hidden');
      }
    });

    util.hideAllCodeBlocks(codeBlocks);
    util.showSpecificItem(type, complicationDemos, 'data-comp');
    DemoWatches.buildAndShowDemoWatch(type);
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


  viewCodeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      event.preventDefault();
      const type = this.attributes['data-type'].value;
      util.showSpecificItem(type, codeBlocks, 'data-type');
    });
  });

  DemoWatches.buildAndShowDemoWatch('dials');
})();
