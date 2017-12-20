require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Year Indicator', () => {
    it('should return a Watch instance with a "year" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            year: {
                id: 'year-hand'
            }
        };
        const test = new Watch(settings);
        test.should.have.property('yearIndicator');
    });

    it('should return a Watch instance with a "year" property with only a string declaration.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            year: 'year-hand'
        };
        const test = new Watch(settings);
        test.should.have.property('yearIndicator');
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
            year: {
                invert: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Year Indicator class requires that an ID of the indicator element be provided.');
    });

    it('should return the correct rotateValue', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            year: {
                id: 'year-disc',
                invert: true
            }
        };
        let test = new Watch(settings);

        test.yearIndicator.year = 2020;
        assert.equal(test.yearIndicator.getRotateValue(), -270);
    });
});