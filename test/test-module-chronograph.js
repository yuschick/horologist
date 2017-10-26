require('jsdom-global')();
const chai = require('chai');
const assert = require('assert');
const Watch = require('../src/index');

chai.should();

describe('Chronograph', () => {
    it('should return a Watch instance with a "chronograph" property.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            chronograph: {
                buttons: {
                    primary: 'chronograph-primary-btn',
                    secondary: 'chronograph-secondary-btn',
                    tertiary: 'chronograph-tertiary-btn',

                },
                hands: {
                    tenth: 'chrono-tenth-hand',
                    second: 'chrono-second-hand',
                    minute: 'chrono-minute-hand',
                    hour: 'chrono-hour-hand',
                    lap: 'chrono-lap-hand',
                }
            }
        };
        const test = new Watch(settings);
        test.should.have.property('chronograph');
    });

    it('should return a Watch instance with a "chronograph" property with bare minium settings.', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            chronograph: {
                buttons: {
                    primary: 'chronograph-primary-btn',
                },
                hands: {
                    second: 'chrono-second-hand',
                    minute: 'chrono-minute-hand',
                }
            }
        };
        const test = new Watch(settings);
        test.should.have.property('chronograph');
    });

    it('should return an error from the Watch class for not supplying a hands property', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            chronograph: {
                buttons: {
                    primary: 'chronograph-primary-btn',
                    secondary: 'chronograph-secondary-btn',
                    tertiary: 'chronograph-tertiary-btn',

                }
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Chronograph requires a settings object containing both the buttons and hands.');
    });

    it('should return an error from the Watch class for not containing a second hand', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            chronograph: {
                buttons: {
                    primary: 'chronograph-primary-btn',

                },
                hands: {
                    minute: 'chrono-minute-hand',
                }
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'The Chronograph requires at least a second and minute hands.');
    });

    it('should return an error from the Watch class for trying to combine a monopusher and rattrapante', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            chronograph: {
                buttons: {
                    primary: 'chronograph-primary-btn',

                },
                hands: {
                    minute: 'chrono-minute-hand',
                },
                rattrapante: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'A monopusher chronograph cannot support rattrapante functionality.');
    });

    it('should return an error from the Watch class for trying to combine a monopusher and flyback functionality', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            chronograph: {
                buttons: {
                    primary: 'chronograph-primary-btn',

                },
                hands: {
                    minute: 'chrono-minute-hand',
                },
                flyback: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, 'A monopusher chronograph cannot support flyuback functionality.');
    });

    it('should return an error from the Watch class for not having a lap hand with a rattrapante complication', () => {
        const settings = {
            testing: true,
            dials: [{
                hands: {
                    hour: 'chronograph-hour-hand',
                },
            }],
            chronograph: {
                buttons: {
                    primary: 'chronograph-primary-btn',
                    secondary: 'chronograph-secondary-btn',

                },
                hands: {
                    second: 'chrono-second-hand',
                    minute: 'chrono-minute-hand',
                },
                rattrapante: true
            }
        };
        const test = () => new Watch(settings);
        assert.throws(test, ReferenceError, "A rattrapante Chronograph requires a 'lap' hand.");
    });
});