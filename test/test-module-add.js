const assert = require('assert');
const add = require('../src/js/modules/add');

describe('Add Module', function() {
  describe('add()', function() {
    it('should return 3 when given arguments 1, 2', function() {
      assert.equal(3, add.add(1, 2));
    });
    it('should convert any number strings to numbers', function() {
      assert.equal(5, add.add('2', '3'));
    });
    it('should return an error if missing an argument', function() {
      assert.equal('Required argument(s) missing', add.add(1));
    });
    it('should accept a variable amount of numbers but require at least one', function() {
      assert.equal(20, add.add(1, '10', 5, 2, 2));
    });
  });
});
