require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Power Reserve', () => {
    it('should return a Watch instance with a "powerReserve" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            reserve: {
                id: 'reserve-hand',
                range: [-90, 90]
            }
        };
        const test = new Watch(settings);
        test.should.have.property('powerReserve');
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
            reserve: {
                range: [-90, 90]
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The PowerReserve class requires that an ID of the power reserve element be provided.');
    });

    it('should error with no range key.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            reserve: {
                id: 'reserve-hand'
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The PowerReserve class requires that a range of the power reserve element be provided.');
    });
});