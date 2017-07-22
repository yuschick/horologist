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
  getCurrentRotateValue(el) {
    let val = el.style.transform;
    let num = val.replace('rotate(', '').replace('deg)', '');
    return Number(num);
  }
}
