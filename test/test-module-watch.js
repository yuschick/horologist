require('jsdom-global')();
const assert = require('assert');
const Watch = require('../src/index');


describe('Watch Module', () => {
    it('should return an instance of the Watch class', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }]
        };
        const test = new Watch(settings);
        assert.equal(test instanceof Watch, true, `test is an instance of Watch.`);
    });

    it('should return an error from the Watch class', () => {
        const test = () => new Watch({});
        assert.throws(test, ReferenceError, 'At least one dial is required for the Watch class.');
    });
});