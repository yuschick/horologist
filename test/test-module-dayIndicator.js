require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Day Indicator', () => {
    it('should return a Watch instance with a "dayIndicator" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            day: {
                id: 'day-disc'
            }
        };
        const test = new Watch(settings);
        test.should.have.property('dayIndicator');
    });

    it('should return a Watch instance with a "dayIndicator" property with only a string declaration.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            day: 'day-disc'
        };
        const test = new Watch(settings);
        test.should.have.property('dayIndicator');
    });

    it('should return an error from the Watch class for not providing a dayIndicator ID', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            day: {
                invert: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Day Indicator class requires that an ID of the element be provided.');
    });

    it('should return the correct rotateValue', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            day: {
                id: 'day-disc'
            }
        };
        let test = new Watch(settings);

        test.dayIndicator.day = 2;
        assert.equal(test.dayIndicator.getRotateValue(), 102.86);
    });
});