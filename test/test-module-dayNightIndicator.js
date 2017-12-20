require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Day Night Indicator', () => {
    it('should return a Watch instance with a "dayNightIndicator" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            dayNightIndicator: {
                id: 'day-night-disc'
            }
        };
        const test = new Watch(settings);
        test.should.have.property('dayNightIndicator');
    });

    it('should return a Watch instance with a "dayNightIndicator" property with only a string declaration.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            dayNightIndicator: 'day-night-disc'
        };
        const test = new Watch(settings);
        test.should.have.property('dayNightIndicator');
    });

    it('should return an error from the Watch class for not providing a dayNightIndicator ID', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            dayNightIndicator: {}
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The DayNightIndicstor class requires that an ID of the element be provided.');
    });
});