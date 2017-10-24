const assert = require('assert');
const Watch = require('../src/index');

describe('Watch Module', function() {
    describe('new Watch()', function() {
        it('should return an instance of the Watch class', function() {
            const settings = {
                testing: true
            };
            const test = new Watch(settings);
            assert.equal(test instanceof Watch, true, `test is an instance of Watch.`);
        });
    });
});