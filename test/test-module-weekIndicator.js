require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Week Indicator', () => {
    it('should return a Watch instance with a "weekIndicator" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            week: {
                id: 'year-hand'
            }
        };
        const test = new Watch(settings);
        test.should.have.property('weekIndicator');
    });

    it('should return a Watch instance with a "weekIndicator" property with only a string declaration.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            week: 'week-hand'
        };
        const test = new Watch(settings);
        test.should.have.property('weekIndicator');
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
            week: {
                invert: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Week Indicator class requires that an ID of the element be provided.');
    });

    it('should contain 53 weeks when iso property is set to true', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            week: {
                id: 'week-disc',
                iso: true
            }
        };
        let test = new Watch(settings);
        assert.equal(test.weekIndicator.weekAmount, 53);
    });
});