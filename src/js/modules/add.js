module.exports = {
  // The add method requires at least two arguments but can add an variable number of parameters
  // It will attempt to convert any string into a Number
  // It then returns the total of all parameters as a Number
  add(num1, ...nums) {
    if (!num1 || !nums.length) return 'Required argument(s) missing';
    return Number(nums.reduce((a, b) => parseInt(a) + parseInt(b), parseInt(num1)));
  }
}
