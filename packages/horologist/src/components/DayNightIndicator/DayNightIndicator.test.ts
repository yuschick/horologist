import content from '../../content';
import { Watch } from '../Watch';

describe('Day/Night Indicator', () => {
    const date = new Date('2022/7/20 13:30:10');
    const dateSubDial = new Date('2022/7/20 03:30:10');
    const dials = [
        {
            id: 'test',
            hands: {
                seconds: {
                    id: 'seconds',
                },
            },
            date,
        },
    ];
    const id = 'test-id';
    const rotateIncrement = 360 / 4;
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" /><div id="seconds" />`;
        test = new Watch({ dials, dayNight: { id } });
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
        const test = new Watch({ dials, dayNight: { id, reverse: true } });
        const value = test.dayNight?.getRotationValue();

        expect(value).toEqual(rotateIncrement * 2 * -1);
    });

    it('should return the correct rotational value with offset hours', () => {
        const test = new Watch({ dials, dayNight: { id, offsetHours: true }, settings: { date } });

        const offsetIncrement = rotateIncrement / 6;
        const value = test.dayNight?.getRotationValue();

        expect(value).toEqual(rotateIncrement * 2 + offsetIncrement);
    });

    it('should return a value based on a dial target', () => {
        document.body.innerHTML += `<div id="seconds-hand" />`;
        document.body.innerHTML += `<div id="two-seconds-hand" />`;
        let test = new Watch({
            dials: [
                {
                    id: 'one',
                    hands: { seconds: { id: 'seconds-hand' } },
                    date,
                },
                {
                    id: 'two',
                    hands: { seconds: { id: 'two-seconds-hand' } },
                    date: new Date('2022/7/7 03:30:10'),
                },
            ],
            dayNight: {
                dial: 'two',
                id,
            },
        });

        test.start();

        let value = test.dayNight?.getRotationValue();
        expect(value).toEqual(0);

        test = new Watch({
            dials: [
                {
                    id: 'one',
                    hands: { seconds: { id: 'seconds-hand' } },
                    date,
                },
                {
                    id: 'two',
                    hands: { seconds: { id: 'two-seconds-hand' } },
                    date: dateSubDial,
                },
            ],
            dayNight: {
                id,
            },
        });

        test.start();

        value = test.dayNight?.getRotationValue();
        expect(value).toEqual(rotateIncrement * 2);
    });
});
