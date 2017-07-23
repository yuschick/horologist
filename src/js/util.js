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
  }
}
