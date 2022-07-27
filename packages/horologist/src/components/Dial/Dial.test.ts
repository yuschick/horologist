import content from '../../content';
import { Watch } from '../Watch';
import { transitions } from './Dial';

let test: Watch;
const secondsHandsId = 'seconds-hand-id';
const minutesHandsId = 'minutes-hand-id';
const hoursHandsId = 'hours-hand-id';
const dial1 = {
    hands: {
        seconds: {
            id: secondsHandsId,
        },
    },
};

describe('Dial - General', () => {
    afterAll(() => {
        document.body.innerHTML = '';
    });

    beforeAll(() => {
        const elements = [secondsHandsId, minutesHandsId, hoursHandsId];
        elements.forEach((el) => (document.body.innerHTML += `<div id="${el}" />`));
        test = new Watch({ dials: [dial1] });
        test.start();
    });

    it('should return a watch object with a dials property', () => {
        expect(test).toHaveProperty('dials');
    });

    it('should return a watch object with a dials property with multiple dials', () => {
        const test = new Watch({ dials: [dial1, dial1] });
        expect(test).toHaveProperty('dials');
        expect(test.dials).toHaveLength(2);
    });

    it('should throw an error if the retrograde max exceeds 360', () => {
        expect(() => {
            new Watch({
                dials: [{ hands: { seconds: { id: secondsHandsId, retrograde: { max: 400 } } } }],
            });
        }).toThrow(content.dial.errors.retrograde_exceeds_max);
    });

    it('should throw an error if seconds hand element cannot be found', () => {
        expect(() => {
            new Watch({
                dials: [{ hands: { seconds: { id: 'error' } } }],
            });
        }).toThrow(content.dial.errors.seconds_hand_not_found);
    });

    it('should throw an error if minutes hand element cannot be found', () => {
        expect(() => {
            new Watch({
                dials: [{ hands: { minutes: { id: 'error' } } }],
            });
        }).toThrow(content.dial.errors.minutes_hand_not_found);
    });

    it('should throw an error if minutes split ones element cannot be found', () => {
        expect(() => {
            new Watch({
                dials: [
                    { hands: { minutes: { split: { ones: 'error', tenths: minutesHandsId } } } },
                ],
            });
        }).toThrow(content.dial.errors.minutes_ones_hand_not_found);
    });

    it('should throw an error if minutes split tenths element cannot be found', () => {
        expect(() => {
            new Watch({
                dials: [
                    { hands: { minutes: { split: { tenths: 'error', ones: minutesHandsId } } } },
                ],
            });
        }).toThrow(content.dial.errors.minutes_tenths_hand_not_found);
    });

    it('should throw an error if hours hand element cannot be found', () => {
        expect(() => {
            new Watch({
                dials: [{ hands: { hours: { id: 'error' } } }],
            });
        }).toThrow(content.dial.errors.hours_hand_not_found);
    });

    it('should throw an error if hours split ones element cannot be found', () => {
        expect(() => {
            new Watch({
                dials: [
                    {
                        hands: {
                            hours: { split: { ones: 'error', tenths: hoursHandsId } },
                        },
                    },
                ],
            });
        }).toThrow(content.dial.errors.hours_ones_hand_not_found);
    });

    it('should throw an error if hours split tenths element cannot be found', () => {
        expect(() => {
            new Watch({
                dials: [
                    {
                        hands: {
                            hours: { split: { tenths: 'error', ones: hoursHandsId } },
                        },
                    },
                ],
            });
        }).toThrow(content.dial.errors.hours_tenths_hand_not_found);
    });

    it('should apply the default seconds hand transition', () => {
        const hand = document.getElementById(secondsHandsId);

        expect(hand).toBeTruthy();
        expect(hand?.style.transition).toEqual(transitions.default);
    });

    it('should apply the sweep seconds hand transition', () => {
        const secondsId = 'seconds-hand-sweep';
        document.body.innerHTML = `<div id="${secondsId}" />`;
        const test = new Watch({
            dials: [{ hands: { seconds: { id: secondsId, sweep: true } } }],
        });
        test.start();
        const hand = document.getElementById(secondsId);

        expect(hand).toBeTruthy();
        expect(hand?.style.transition).toEqual(transitions.sweep);
    });

    it('should apply the jump seconds hand transition', () => {
        const secondsId = 'seconds-hand-jump';
        document.body.innerHTML = `<div id="${secondsId}" />`;
        const test = new Watch({
            dials: [{ hands: { seconds: { id: secondsId, jump: true } } }],
        });
        test.start();
        const hand = document.getElementById(secondsId);

        expect(hand).toBeTruthy();
        expect(hand?.style.transition).toEqual(transitions.jump);
    });
});

describe('Dial - Standard Display', () => {
    const date = new Date('2022/7/15 10:30:30');
    afterAll(() => {
        document.body.innerHTML = '';
    });

    beforeAll(() => {
        const elements = [secondsHandsId, minutesHandsId, hoursHandsId];
        elements.forEach((el) => (document.body.innerHTML += `<div id="${el}" />`));
        test = new Watch({
            dials: [
                {
                    hands: {
                        seconds: { id: secondsHandsId },
                        minutes: { id: minutesHandsId },
                        hours: { id: hoursHandsId },
                    },
                },
            ],
            settings: { date },
        });
        test.start();
    });

    it('should rotate the seconds hand to 30 seconds', () => {
        const element = document.getElementById(secondsHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(186deg)'); // offset one second due to transition offset
    });

    it('should rotate the minutes hand to 30 minutes', () => {
        const element = document.getElementById(minutesHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(180deg)');
    });

    it('should rotate the hours hand to 10 hours + 30 minutes', () => {
        const element = document.getElementById(hoursHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(315deg)');
    });

    it('should rotate the hours hand to 10 hours, jump enabled', () => {
        const test = new Watch({
            dials: [
                {
                    hands: {
                        seconds: { id: secondsHandsId },
                        minutes: { id: minutesHandsId },
                        hours: { id: hoursHandsId, jump: true },
                    },
                },
            ],
            settings: { date },
        });
        test.start();

        const element = document.getElementById(hoursHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(300deg)');
    });

    it('should rotate the hours hand to 10 hours in 24 hour format', () => {
        const test = new Watch({
            dials: [
                {
                    format: 24,
                    hands: {
                        seconds: { id: secondsHandsId },
                        minutes: { id: minutesHandsId },
                        hours: { id: hoursHandsId },
                    },
                },
            ],
            settings: { date },
        });
        test.start();

        const element = document.getElementById(hoursHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(157.5deg)');
    });

    it('should rotate the hours hand to 10 hours in 24 hour format, jump enabled', () => {
        const test = new Watch({
            dials: [
                {
                    format: 24,
                    hands: {
                        seconds: { id: secondsHandsId },
                        minutes: { id: minutesHandsId },
                        hours: { id: hoursHandsId, jump: true },
                    },
                },
            ],
            settings: { date },
        });
        test.start();

        const element = document.getElementById(hoursHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(150deg)');
    });

    it('should rotate the hands when reversed', () => {
        const test = new Watch({
            dials: [
                {
                    hands: {
                        minutes: { id: minutesHandsId, reverse: true },
                        hours: { id: hoursHandsId, reverse: true },
                    },
                },
            ],
            settings: { date },
        });
        test.start();

        const minutes = document.getElementById(minutesHandsId);
        const hours = document.getElementById(hoursHandsId);

        expect(minutes).toBeDefined();
        expect(hours).toBeDefined();

        expect(minutes?.style.transform).toEqual('rotate(-180deg)');
        expect(hours?.style.transform).toEqual('rotate(-315deg)');
    });
});

describe('Dial - Retrograde Displays', () => {
    const date = new Date('2022/7/15 10:30:30');
    afterAll(() => {
        document.body.innerHTML = '';
    });

    beforeAll(() => {
        const elements = [secondsHandsId, minutesHandsId, hoursHandsId];
        elements.forEach((el) => (document.body.innerHTML += `<div id="${el}" />`));
        test = new Watch({
            dials: [
                {
                    hands: {
                        seconds: { id: secondsHandsId, retrograde: { max: 180 } },
                        minutes: { id: minutesHandsId, retrograde: { max: 180 } },
                        hours: { id: hoursHandsId, retrograde: { max: 180 } },
                    },
                },
            ],
            settings: { date },
        });
        test.start();
    });

    it('should rotate the seconds hand to 30 seconds of the retrograde', () => {
        const element = document.getElementById(secondsHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(93deg)'); // offset one second due to transition offset
    });

    it('should rotate the minutes hand to 30 minutes', () => {
        const element = document.getElementById(minutesHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(90deg)');
    });

    it('should rotate the hours hand to 10 hours + 30 minutes', () => {
        const element = document.getElementById(hoursHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(157.5deg)');
    });

    it('should rotate the hours hand to 10 hours, jump enabled', () => {
        const test = new Watch({
            dials: [
                {
                    hands: {
                        hours: { id: hoursHandsId, jump: true, retrograde: { max: 180 } },
                    },
                },
            ],
            settings: { date },
        });
        test.start();

        const element = document.getElementById(hoursHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(150deg)');
    });

    it('should rotate the seconds hand with a custom retrograde duration', () => {
        const date = new Date('2022/7/15 10:30:35');
        const test = new Watch({
            dials: [
                {
                    hands: {
                        seconds: {
                            id: secondsHandsId,
                            retrograde: { max: 180, duration: 10 },
                            jump: true,
                        },
                    },
                },
            ],
            settings: { date },
        });
        test.start();

        const element = document.getElementById(secondsHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(90deg)');
    });

    it('should rotate the seconds hand with a custom retrograde duration on first second', () => {
        const date = new Date('2022/7/15 10:30:40');
        const test = new Watch({
            dials: [
                {
                    hands: {
                        seconds: {
                            id: secondsHandsId,
                            retrograde: { max: 180, duration: 10 },
                            jump: true,
                        },
                    },
                },
            ],
            settings: { date },
        });
        test.start();

        const element = document.getElementById(secondsHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(0deg)');
    });

    it('should rotate the seconds hand with a custom retrograde duration on last second', () => {
        const date = new Date('2022/7/15 10:30:39');
        const test = new Watch({
            dials: [
                {
                    hands: {
                        seconds: {
                            id: secondsHandsId,
                            retrograde: { max: 180, duration: 10 },
                            jump: true,
                        },
                    },
                },
            ],
            settings: { date },
        });
        test.start();

        const element = document.getElementById(secondsHandsId);

        expect(element).toBeDefined();
        expect(element?.style.transform).toEqual('rotate(162deg)');
    });
});

describe('Dial - Split Displays', () => {
    const date = new Date('2022/7/15 23:45:00');
    const minutesOnes = 'minutes-ones';
    const minutesTenths = 'minutes-tenths';
    const hoursOnes = 'hours-ones';
    const hoursTenths = 'hours-tenths';
    afterAll(() => {
        document.body.innerHTML = '';
    });

    beforeAll(() => {
        const elements = [minutesOnes, minutesTenths, hoursOnes, hoursTenths];
        elements.forEach((el) => (document.body.innerHTML += `<div id="${el}" />`));
        test = new Watch({
            dials: [
                {
                    hands: {
                        minutes: { split: { ones: minutesOnes, tenths: minutesTenths } },
                        hours: { split: { ones: hoursOnes, tenths: hoursTenths } },
                    },
                },
            ],
            settings: { date },
        });
        test.start();
    });

    it('should rotate the minutes hands to 45 minutes', () => {
        const ones = document.getElementById(minutesOnes);
        const tenths = document.getElementById(minutesTenths);

        expect(ones).toBeDefined();
        expect(tenths).toBeDefined();
        expect(ones?.style.transform).toEqual('rotate(180deg)');
        expect(tenths?.style.transform).toEqual('rotate(240deg)');
    });

    it('should rotate the hours hands to 11', () => {
        const ones = document.getElementById(hoursOnes);
        const tenths = document.getElementById(hoursTenths);

        expect(ones).toBeDefined();
        expect(tenths).toBeDefined();
        expect(ones?.style.transform).toEqual('rotate(36deg)');
        expect(tenths?.style.transform).toEqual('rotate(180deg)');
    });

    it('should rotate the hours hands to 23 in 24 hour format', () => {
        const test = new Watch({
            dials: [
                {
                    format: 24,
                    hands: {
                        hours: { split: { ones: hoursOnes, tenths: hoursTenths } },
                    },
                },
            ],
            settings: { date },
        });
        test.start();
        const ones = document.getElementById(hoursOnes);
        const tenths = document.getElementById(hoursTenths);

        expect(ones).toBeDefined();
        expect(tenths).toBeDefined();
        expect(ones?.style.transform).toEqual('rotate(108deg)');
        expect(tenths?.style.transform).toEqual('rotate(240deg)');
    });

    it('should rotate the hours hands to 23 in 24 hour format and reversed', () => {
        const test = new Watch({
            dials: [
                {
                    format: 24,
                    hands: {
                        hours: { split: { ones: hoursOnes, tenths: hoursTenths }, reverse: true },
                    },
                },
            ],
            settings: { date },
        });
        test.start();
        const ones = document.getElementById(hoursOnes);
        const tenths = document.getElementById(hoursTenths);

        expect(ones).toBeDefined();
        expect(tenths).toBeDefined();
        expect(ones?.style.transform).toEqual('rotate(-108deg)');
        expect(tenths?.style.transform).toEqual('rotate(-240deg)');
    });
});
