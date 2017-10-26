require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Foudroyante', () => {
    it('should return a Watch instance with a "foudroyante" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            foudroyante: {
                id: 'jumping-second-hand',
                steps: 5
            }
        };
        const test = new Watch(settings);
        test.should.have.property('foudroyante');
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
            foudroyante: {
                steps: 6
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Foudroyante class requires that an ID of the indiciator element be provided.');
    });

    it('should error with no steps key.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            foudroyante: {
                id: 'jumping-second-hand'
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Foudroyante requires a steps value.');
    });

    it('should error with steps value outside of acceptable range (2-10).', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            foudroyante: {
                id: 'jumping-second-hand',
                steps: 25
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Foudroyante requires a step value between 2-10.');
    });

    it('should return the correct degreeIncrement value.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'hour-hand',
                    minute: 'minute-hand',
                    second: 'second-hand',
                }
            }],
            foudroyante: {
                id: 'jumping-second-hand',
                steps: 5
            }
        };
        const test = new Watch(settings);
        assert.equal(test.foudroyante.degreeIncrement, 72);
    });

});