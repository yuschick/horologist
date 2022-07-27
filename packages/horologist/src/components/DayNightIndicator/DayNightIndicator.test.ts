import content from '../../content';
import { Watch } from '../Watch';

describe('Day/Night Indicator', () => {
    const id = 'test-id';
    const date = new Date('2022/7/20 13:30:10');
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ dayNight: { id }, settings: { date } });
    });

    it('should return a watch object with a dayNight property', () => {
        expect(test).toHaveProperty('dayNight');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ dayNight: { id: 'error' } });
        }).toThrow(content.day_night_indicator.errors.element_not_found);
    });

    it('should return the correct rotational value', () => {
        const rotateIncrement = 360 / 4;
        const value = test.dayNight?.getRotationValue();

        expect(value).toEqual(rotateIncrement * 2);
    });

    it('should return the correct rotational value when reversed', () => {
        const date = new Date('2000/6/28 19:25:00');
        const test = new Watch({ dayNight: { id, reverse: true }, settings: { date } });
        const rotateIncrement = 360 / 4;
        const value = test.dayNight?.getRotationValue();

        expect(value).toEqual(rotateIncrement * 3 * -1);
    });

    it('should return the correct rotational value with offset hours', () => {
        const date = new Date('2000/6/28 10:25:00');
        const test = new Watch({ dayNight: { id, offsetHours: true }, settings: { date } });

        const rotateIncrement = 360 / 4;
        const offsetIncrement = rotateIncrement / 6;
        const value = test.dayNight?.getRotationValue();

        expect(value).toEqual(rotateIncrement + 4 * offsetIncrement);
    });
});
