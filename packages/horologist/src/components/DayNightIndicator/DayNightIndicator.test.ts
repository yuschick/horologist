import content from '../../content';
import { Watch } from '../Watch';

describe('Day/Night Indicator', () => {
    const dials = [
        {
            id: 'test',
            hands: {
                seconds: {
                    id: 'seconds',
                },
            },
            timezone: 'Europe/Helsinki',
        },
    ];
    const id = 'test-id';
    const date = new Date('2022/7/20 13:30:10 GMT+3:00');
    const rotateIncrement = 360 / 4;
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" /><div id="seconds" />`;
        test = new Watch({ dials, dayNight: { id }, settings: { date } });
    });

    it('should return a watch object with a dayNight property', () => {
        expect(test).toHaveProperty('dayNight');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ dials, dayNight: { id: 'error' } });
        }).toThrow(content.day_night_indicator.errors.element_not_found);
    });

    it('should return the correct rotational value', () => {
        const value = test.dayNight?.getRotationValue();

        expect(value).toEqual(rotateIncrement * 2);
    });

    it('should return the correct rotational value when reversed', () => {
        const date = new Date('2000/6/28 19:25:00');
        const test = new Watch({ dials, dayNight: { id, reverse: true }, settings: { date } });
        const value = test.dayNight?.getRotationValue();

        expect(value).toEqual(rotateIncrement * 3 * -1);
    });

    it('should return the correct rotational value with offset hours', () => {
        const date = new Date('2000/6/28 10:25:00 GMT+3:00');
        const test = new Watch({ dials, dayNight: { id, offsetHours: true }, settings: { date } });

        const offsetIncrement = rotateIncrement / 6;
        const value = test.dayNight?.getRotationValue();

        expect(value).toEqual(rotateIncrement + 4 * offsetIncrement);
    });

    it('should return a value based on a dial target', () => {
        document.body.innerHTML += `<div id="seconds-hand" />`;
        document.body.innerHTML += `<div id="two-seconds-hand" />`;
        let test = new Watch({
            dials: [
                {
                    id: 'one',
                    hands: { seconds: { id: 'seconds-hand' } },
                    timezone: 'Europe/Helsinki',
                },
                {
                    id: 'two',
                    hands: { seconds: { id: 'two-seconds-hand' } },
                    timezone: 'America/Los_Angeles',
                },
            ],
            dayNight: {
                dial: 'two',
                id,
            },
            settings: { date },
        });

        test.start();

        let value = test.dayNight?.getRotationValue();
        expect(value).toEqual(0);

        test = new Watch({
            dials: [
                {
                    id: 'one',
                    hands: { seconds: { id: 'seconds-hand' } },
                    timezone: 'Europe/Helsinki',
                },
                {
                    id: 'two',
                    hands: { seconds: { id: 'two-seconds-hand' } },
                    timezone: 'America/Los_Angeles',
                },
            ],
            dayNight: {
                id,
            },
            settings: { date },
        });

        test.start();

        value = test.dayNight?.getRotationValue();
        expect(value).toEqual(rotateIncrement * 2);
    });
});
