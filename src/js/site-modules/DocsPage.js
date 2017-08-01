module.exports = (function() {
  const docTree = document.querySelector('.aside-nav-container');

  if (!docTree) return;

  const docsContainer = document.querySelector('.docs-container');
  const docTreeGroups = document.querySelectorAll('.doc-tree-group');

  const gettingStarted = document.querySelector('.getting-started-section');
  const dialsSection = document.querySelector('.dials-section');
  const indicatorSection = document.querySelector('.day-night-indicator-section');
  const dayIndicatorSection = document.querySelector('.day-indicator-section');
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
    } else if (pos > (indicatorSection.offsetTop + indicatorSection.clientHeight) && pos < (dayIndicatorSection.offsetTop + dayIndicatorSection.clientHeight)) {
      toggleDocTreeGroups('day-indicator');
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
