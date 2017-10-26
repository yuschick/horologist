require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Minute Repeater', () => {
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
            repeater: {}
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The MinuteRepeater class requires that an ID of the repeater element be provided.');
    });

    it('should error with no minute hand.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                }
            }],
            repeater: {
                id: 'repeater-btn'
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The minute repeater, like, by definition, requires a dial which supports a minute hand.');
    });
});