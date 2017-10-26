require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Month Indicator', () => {
    it('should return a Watch instance with a "month" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            month: {
                id: 'month-disc'
            }
        };
        const test = new Watch(settings);
        test.should.have.property('monthIndicator');
    });

    it('should return an error from the Watch class for not providing a month element ID', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            month: {}
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Month class requires that an ID of the element be provided.');
    });

    it('should return the correct rotateValue', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            month: {
                id: 'month-disc',
                invert: true
            }
        };
        let test = new Watch(settings);

        test.monthIndicator.month = 2;
        assert.equal(test.monthIndicator.getRotateValue(), -60);
    });
});