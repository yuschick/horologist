import content from '../../content';
import { getDOMElementRotateValue, repeatAction } from '../../utils';
import { Watch } from '../Watch';

const monoPusherId = 'mono-pusher';
const dualPusherId = 'dual-pusher';
const triPusherId = 'tri-pusher';

const tenthsSecondsHandId = 'subSeconds-seconds-hand';
const secondsHandId = 'seconds-hand';
const minutesHandId = 'minutes-hand';
const hoursHandId = 'hours-hand';

const splitSecondsHandId = 'split-seconds-id';
const splitMinutesHandId = 'split-minutes-id';
const splitHoursHandId = 'split-hours-id';

const customSubSecondsDuration = 20;
const customSecondsDuration = 30;
const customMinutesDuration = 30;
const customHoursDuration = 6;

const hands = {
    subSeconds: tenthsSecondsHandId,
    seconds: secondsHandId,
    minutes: minutesHandId,
    hours: hoursHandId,
};

describe('Chronograph - Mono Pusher', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                durations: {
                    subSeconds: customSubSecondsDuration,
                    seconds: customSecondsDuration,
                    minutes: customMinutesDuration,
                    hours: customHoursDuration,
                },
                hands,
                pushers: {
                    mono: monoPusherId,
                },
            },
        });

        test.start();
    });

    it('should return a watch object with a chronograph property', () => {
        expect(test).toHaveProperty('chronograph');
    });

    it('should throw an error if the mono pusher cannot be found', () => {
        expect(() => {
            new Watch({ chronograph: { pushers: { mono: 'error' }, hands } });
        }).toThrow(content.chronograph.errors.mono_pusher_not_found);
    });

    it('should have the correct type set', () => {
        expect(test.chronograph?.type.isMonoPusher).toBe(true);
    });

    it('should correctly handle state changes for a mono pusher chronograph', () => {
        const element = document.getElementById(monoPusherId);
        const event = new MouseEvent('click');

        expect(element).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        element?.dispatchEvent(event);
        expect(test.chronograph?.state.isReady).toEqual(false);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.interval).toBeDefined();

        element?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toBe(false);
        expect(test.chronograph?.state.isPaused).toBe(true);
        expect(test.chronograph?.interval).toBeUndefined();

        element?.dispatchEvent(event);
        expect(test.chronograph?.state.isPaused).toBe(false);
        expect(test.chronograph?.state.isReady).toBe(true);
    });

    it('should correctly handle custom dial durations', () => {
        const element = document.getElementById(monoPusherId);
        const event = new MouseEvent('click');

        expect(element).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);
        element?.dispatchEvent(event);

        repeatAction(1, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });

        expect(
            getDOMElementRotateValue(test.chronograph?.hands?.subSeconds as HTMLElement),
        ).toEqual(360 / test.chronograph!.iterationMax);

        repeatAction(customSubSecondsDuration, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });

        expect(test.chronograph?.rotations.seconds).toEqual(360 / customSecondsDuration);

        repeatAction(customSubSecondsDuration * 60 * 10, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });

        expect(test.chronograph?.rotations.minutes).toEqual(360 / customMinutesDuration);
        expect(test.chronograph?.rotations.hours).toEqual(360 / customHoursDuration / 60);
    });
});

describe('Chronograph - Dual Pusher - Standard', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        dualPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
        splitSecondsHandId,
        splitMinutesHandId,
        splitHoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                hands,
                pushers: {
                    mono: monoPusherId,
                    dual: dualPusherId,
                },
            },
        });

        test.start();
    });

    it('should throw an error if the dual pusher cannot be found', () => {
        expect(() => {
            new Watch({
                chronograph: { pushers: { mono: monoPusherId, dual: 'error' }, hands },
            });
        }).toThrow(content.chronograph.errors.dual_pusher_not_found);
    });

    it('should be correctly typed as a dual pusher', () => {
        expect(test.chronograph?.type.isDualPusher).toBe(true);
    });

    it('should correctly handle state changes', () => {
        const monoPusher = document.getElementById(monoPusherId);
        const dualPusher = document.getElementById(dualPusherId);
        const event = new MouseEvent('click');

        expect(monoPusher).toBeDefined();
        expect(dualPusher).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isReady).toEqual(false);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.interval).toBeDefined();

        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isReady).toEqual(false);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.interval).toBeDefined();

        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isReady).toEqual(true);

        monoPusher?.dispatchEvent(event);
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.state.isReady).toEqual(true);
    });
});

describe('Chronograph - Dual Pusher - Flyback', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        dualPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
        splitSecondsHandId,
        splitMinutesHandId,
        splitHoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                hands,
                pushers: {
                    mono: monoPusherId,
                    dual: dualPusherId,
                },
                flyback: true,
            },
        });

        test.start();
    });

    it('should be correctly typed as a flyback', () => {
        expect(test.chronograph?.type.isFlyback).toBe(true);
    });

    it('should correctly handle state changes', () => {
        const monoPusher = document.getElementById(monoPusherId);
        const dualPusher = document.getElementById(dualPusherId);
        const event = new MouseEvent('click');

        // IS READY
        expect(monoPusher).toBeDefined();
        expect(dualPusher).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isReady).toEqual(false);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.interval).toBeDefined();

        // TRIGGER FLYBACK
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.rotations.seconds).toEqual(0);
        expect(test.chronograph?.rotations.minutes).toEqual(0);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO READY
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.rotations.seconds).toEqual(0);
        expect(test.chronograph?.rotations.minutes).toEqual(0);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.state.isReady).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();
    });
});

describe('Chronograph - Dual Pusher - Rattrapante', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        dualPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
        splitSecondsHandId,
        splitMinutesHandId,
        splitHoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                hands: {
                    ...hands,
                    rattrapante: {
                        seconds: splitSecondsHandId,
                        minutes: splitMinutesHandId,
                        hours: splitHoursHandId,
                    },
                },
                pushers: {
                    mono: monoPusherId,
                    dual: dualPusherId,
                },
            },
        });

        test.start();
    });

    it('should be correctly typed as a rattrapante', () => {
        expect(test.chronograph?.type.isSplit).toBe(true);
    });

    it('should correctly handle state changes', () => {
        const monoPusher = document.getElementById(monoPusherId);
        const dualPusher = document.getElementById(dualPusherId);
        const event = new MouseEvent('click');

        // IS READY
        expect(monoPusher).toBeDefined();
        expect(dualPusher).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // Move the hands
        repeatAction(60, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });

        // Store the latest rotation values
        let rotations = { ...test.chronograph?.rotations };

        // GO TO SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(true);

        // Move the constant hands to test that split hands remain
        test.chronograph?.incrementHands();
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(rotations?.seconds);

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // LEAVE SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(false);

        // Ensure split hands are synced with constant hands
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(test.chronograph?.rotations?.seconds);

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO READY
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isReady).toEqual(true);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(false);
    });
});

describe('Chronograph - Dual Pusher - Rattrapante With Flyback', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        dualPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
        splitSecondsHandId,
        splitMinutesHandId,
        splitHoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                hands: {
                    ...hands,
                    rattrapante: {
                        seconds: splitSecondsHandId,
                        minutes: splitMinutesHandId,
                        hours: splitHoursHandId,
                    },
                },
                pushers: {
                    mono: monoPusherId,
                    dual: dualPusherId,
                },
                flyback: true,
            },
        });

        test.start();
    });

    it('should be correctly typed as a flyback rattrapante', () => {
        expect(test.chronograph?.type.isFlyback).toBe(true);
        expect(test.chronograph?.type.isSplit).toBe(true);
    });

    it('should correctly handle state changes', () => {
        const monoPusher = document.getElementById(monoPusherId);
        const dualPusher = document.getElementById(dualPusherId);
        const event = new MouseEvent('click');

        // IS READY
        expect(monoPusher).toBeDefined();
        expect(dualPusher).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // Move the hands
        repeatAction(60, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });
        // Store the latest rotation values
        let rotations = { ...test.chronograph?.rotations };

        // GO TO SPLIT SET WITH FLYBACK
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(true);

        // Ensure Flyback resets to 0 while Split stays in place
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(rotations?.seconds);
        expect(test.chronograph?.rotations.seconds).toEqual(0);

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.state.isSplitSet).toEqual(true);
        expect(test.chronograph?.interval).toBeDefined();

        // Move the hands
        repeatAction(10, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });

        // Ensure constant hands move while split hands stay in place
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(rotations?.seconds);
        expect(test.chronograph?.rotations.seconds).toEqual(360 / 60);

        // LEAVE SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(false);

        // Ensure split hands are synced with constant hands
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(test.chronograph?.rotations?.seconds);

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO READY
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isReady).toEqual(true);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(false);
    });
});

describe('Chronograph - Tri Pusher - Standard', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        dualPusherId,
        triPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
        splitSecondsHandId,
        splitMinutesHandId,
        splitHoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                hands,
                pushers: {
                    mono: monoPusherId,
                    dual: dualPusherId,
                    tri: triPusherId,
                },
            },
        });

        test.start();
    });

    it('should throw an error if the tri pusher cannot be found', () => {
        expect(() => {
            new Watch({
                chronograph: {
                    pushers: { mono: monoPusherId, dual: dualPusherId, tri: 'error' },
                    hands,
                },
            });
        }).toThrow(content.chronograph.errors.tri_pusher_not_found);
    });

    it('should be correctly typed as a tri pusher', () => {
        expect(test.chronograph?.type.isTriPusher).toBe(true);
    });

    it('should correctly handle state changes', () => {
        const monoPusher = document.getElementById(monoPusherId);
        const dualPusher = document.getElementById(dualPusherId);
        const triPusher = document.getElementById(triPusherId);
        const event = new MouseEvent('click');

        // IS READY
        expect(monoPusher).toBeDefined();
        expect(dualPusher).toBeDefined();
        expect(triPusher).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO READY
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isReady).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO READY
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isReady).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();
    });
});

describe('Chronograph - Tri Pusher - Flyback', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        dualPusherId,
        triPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
        splitSecondsHandId,
        splitMinutesHandId,
        splitHoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                hands,
                pushers: {
                    mono: monoPusherId,
                    dual: dualPusherId,
                    tri: triPusherId,
                },
                flyback: true,
            },
        });

        test.start();
    });

    it('should be correctly typed as a flyback tri pusher', () => {
        expect(test.chronograph?.type.isTriPusher).toBe(true);
        expect(test.chronograph?.type.isFlyback).toBe(true);
    });

    it('should correctly handle state changes', () => {
        const monoPusher = document.getElementById(monoPusherId);
        const dualPusher = document.getElementById(dualPusherId);
        const triPusher = document.getElementById(triPusherId);
        const event = new MouseEvent('click');

        // IS READY
        expect(monoPusher).toBeDefined();
        expect(dualPusher).toBeDefined();
        expect(triPusher).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // Move the hands
        repeatAction(10, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });

        // Ensure hands have moved
        expect(test.chronograph?.rotations.seconds).toEqual(360 / 60);

        // TRIGGER FLYBACK
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(getDOMElementRotateValue(test.chronograph?.hands.seconds as HTMLElement)).toEqual(0);
        expect(test.chronograph?.rotations.seconds).toEqual(0);

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO READY
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isReady).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();
    });
});

describe('Chronograph - Tri Pusher - Rattrapante', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        dualPusherId,
        triPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
        splitSecondsHandId,
        splitMinutesHandId,
        splitHoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                hands: {
                    ...hands,
                    rattrapante: {
                        seconds: splitSecondsHandId,
                        minutes: splitMinutesHandId,
                        hours: splitHoursHandId,
                    },
                },
                pushers: {
                    mono: monoPusherId,
                    dual: dualPusherId,
                    tri: triPusherId,
                },
            },
        });

        test.start();
    });

    it('should be correctly typed as a rattrapante tri pusher', () => {
        expect(test.chronograph?.type.isTriPusher).toBe(true);
        expect(test.chronograph?.type.isSplit).toBe(true);
    });

    it('should correctly handle state changes', () => {
        const monoPusher = document.getElementById(monoPusherId);
        const dualPusher = document.getElementById(dualPusherId);
        const triPusher = document.getElementById(triPusherId);
        const event = new MouseEvent('click');

        // IS READY
        expect(monoPusher).toBeDefined();
        expect(dualPusher).toBeDefined();
        expect(triPusher).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // Move the hands
        repeatAction(60, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });
        // Store the latest rotation values
        let rotations = { ...test.chronograph?.rotations };

        // GO TO SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(true);

        // Move the constant hands to test that split hands remain in place
        repeatAction(60, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(rotations?.seconds);

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // LEAVE SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(false);

        // Ensure split hands are synced with constant hands
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(test.chronograph?.rotations?.seconds);

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO READY
        triPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isReady).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();
    });
});

describe('Chronograph - Tri Pusher - FLyback Rattrapante', () => {
    let test: Watch;

    const allElements = [
        monoPusherId,
        dualPusherId,
        triPusherId,
        tenthsSecondsHandId,
        secondsHandId,
        minutesHandId,
        hoursHandId,
        splitSecondsHandId,
        splitMinutesHandId,
        splitHoursHandId,
    ];

    beforeAll(() => {
        // Append all the elements to the DOM
        allElements.forEach((id) => (document.body.innerHTML += `<div id="${id}" />`));
    });

    beforeEach(() => {
        test = new Watch({
            chronograph: {
                hands: {
                    ...hands,
                    rattrapante: {
                        seconds: splitSecondsHandId,
                        minutes: splitMinutesHandId,
                        hours: splitHoursHandId,
                    },
                },
                pushers: {
                    mono: monoPusherId,
                    dual: dualPusherId,
                    tri: triPusherId,
                },
                flyback: true,
            },
        });

        test.start();
    });

    it('should be correctly typed as a rattrapante tri pusher', () => {
        expect(test.chronograph?.type.isTriPusher).toBe(true);
        expect(test.chronograph?.type.isSplit).toBe(true);
        expect(test.chronograph?.type.isFlyback).toBe(true);
    });

    it('should correctly handle state changes', () => {
        const monoPusher = document.getElementById(monoPusherId);
        const dualPusher = document.getElementById(dualPusherId);
        const triPusher = document.getElementById(triPusherId);
        const event = new MouseEvent('click');

        // IS READY
        expect(monoPusher).toBeDefined();
        expect(dualPusher).toBeDefined();
        expect(triPusher).toBeDefined();
        expect(test.chronograph?.state.isReady).toEqual(true);

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO ACTIVE
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isPaused).toEqual(false);
        expect(test.chronograph?.interval).toBeDefined();

        // Move the hands
        repeatAction(60, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });
        // Store the latest rotation values
        let rotations = { ...test.chronograph?.rotations };

        // GO TO SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(true);

        // Move the constant hands to test that split hands remain in place
        repeatAction(60, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(rotations?.seconds);

        // LEAVE SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(false);

        // Ensure split hands are synced with constant hands
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(test.chronograph?.rotations?.seconds);

        // TRIGGER FLYBACK
        triPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(getDOMElementRotateValue(test.chronograph?.hands.seconds as HTMLElement)).toEqual(0);
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(0);
        expect(test.chronograph?.rotations.seconds).toEqual(0);

        // Move the hands
        repeatAction(60, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });
        // Store the latest rotation values
        rotations = { ...test.chronograph?.rotations };

        // GO TO SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(true);

        // Move the constant hands to test that split hands remain in place
        repeatAction(60, () => {
            test.chronograph!.iterationCount += 1;
            test.chronograph?.incrementHands();
        });
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(rotations?.seconds);

        // TRIGGER FLYBACK
        triPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(getDOMElementRotateValue(test.chronograph?.hands.seconds as HTMLElement)).toEqual(0);
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(rotations.seconds);
        expect(test.chronograph?.rotations.seconds).toEqual(0);

        // LEAVE SPLIT SET
        dualPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(true);
        expect(test.chronograph?.state.isSplitSet).toEqual(false);

        // Ensure split hands are synced with constant hands
        expect(
            getDOMElementRotateValue(test.chronograph?.hands.split?.seconds as HTMLElement),
        ).toEqual(test.chronograph?.rotations?.seconds);

        // GO TO PAUSED
        monoPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isPaused).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();

        // GO TO READY
        triPusher?.dispatchEvent(event);
        expect(test.chronograph?.state.isActive).toEqual(false);
        expect(test.chronograph?.state.isReady).toEqual(true);
        expect(test.chronograph?.interval).toBeUndefined();
    });
});
