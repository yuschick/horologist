require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Moonphase', () => {
    it('should return a Watch instance with a "moonphase" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            moonphase: {
                id: 'moonphase-disc',
            }
        };
        const test = new Watch(settings);
        test.should.have.property('moonphase');
    });

    it('should error with no ID key.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            moonphase: {
                invert: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The MoonPhase class requires that an ID of the moonphase element be provided.');
    });
});