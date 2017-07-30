module.exports = {
  localStorage: {
    set(prop, value) {
      localStorage.setItem(prop, JSON.stringify(value));
    },
    get(prop) {
      let data = localStorage[prop] === undefined ?
        false :
        JSON.parse(localStorage[prop]);
      return data;
    },
    clear(prop) {
      localStorage.removeItem(prop);
      console.log(`${prop} cleared from localStorage.`);
    }
  },

  showSpecificItem(val, src, prop) {
    let comp;
    src.forEach(item => {
      comp = item.attributes[prop].value;
      if (comp === val) {
        item.classList.toggle('is-hidden');
        return;
      }
    });
  },

  hideAllCodeBlocks(allBlocks) {
    allBlocks.forEach(block => {
      if (!block.classList.contains('is-hidden')) {
        block.classList.add('is-hidden');
      }
    });
  }
}
