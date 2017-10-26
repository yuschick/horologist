require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Date Indicator', () => {
    it('should return a Watch instance with a "dateIndicator" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            date: {
                id: 'date-disc',
            }
        };
        const test = new Watch(settings);
        test.should.have.property('dateIndicator');
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
            date: {
                retrograde: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Date Indicator class requires that an ID of the indiciator element be provided.');
    });

    it('should error with ID and Split conflict.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            date: {
                id: 'date-hand',
                split: {
                    ones: 'ones-disc',
                    tenths: 'tenths-disc',
                }
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'Choose EITHER a primary or split indicator.');
    });

    it('should error with Retrograde and Split conflict.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            date: {
                id: 'date-hand',
                split: {
                    ones: 'ones-disc',
                    tenths: 'tenths-disc',
                },
                retrograde: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'Choose EITHER a retrograde or split indicator.');
    });

    it('should error with missing hands in Split definition.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            date: {
                id: 'date-hand',
                split: {
                    ones: 'ones-disc'
                },
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'When choosing a split date display please provide the IDs for both the ones and tenths discs.');
    });
});