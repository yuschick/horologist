module.exports = {
  getCurrentRotateValue(el) {
    let val = el.style.transform;
    let num = val.replace('rotate(', '').replace('deg)', '');
    return Number(num);
  }
}
