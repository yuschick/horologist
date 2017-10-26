require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Equation of Time', () => {
    it('should return a Watch instance with a "equationOfTime" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            eqTime: {
                id: 'eq-hand'
            }
        };
        const test = new Watch(settings);
        test.should.have.property('equationOfTime');
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
            eqTime: {
                range: [-38, 38]
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Equation of Time Class requires that an ID of the indicator element be provided.');
    });

    it('should error with too many range values.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            eqTime: {
                id: 'eq-hand',
                range: [-38, 38, 25]
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The range property requires two numericd values.');
    });
});