import content from '../../content';
import { Watch } from '../Watch';

describe('Day/Night Indicator', () => {
    const id = 'test-id';
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ dayNight: { id } });
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
        const now = new Date();
        const hour = now.getHours();
        const rotateIncrement = 360 / 4;
        let rotateValue = 0;
        const value = test.dayNight?.getRotationValue();

        if (hour < 6) rotateValue = 0;
        if (hour >= 6 && hour < 12) rotateValue = rotateIncrement * 1;
        if (hour >= 12 && hour < 18) rotateValue = rotateIncrement * 2;
        if (hour >= 18) rotateValue = rotateIncrement * 3;

        expect(value).toEqual(rotateValue);
    });

    it('should return the correct rotational value when reversed', () => {
        const test = new Watch({ dayNight: { id, reverse: true } });

        const now = new Date();
        const hour = now.getHours();
        const rotateIncrement = 360 / 4;
        let rotateValue = 0;
        const value = test.dayNight?.getRotationValue();

        if (hour < 6) rotateValue = 0;
        if (hour >= 6 && hour < 12) rotateValue = rotateIncrement * 1;
        if (hour >= 12 && hour < 18) rotateValue = rotateIncrement * 2;
        if (hour >= 18) rotateValue = rotateIncrement * 3;

        expect(value).toEqual(rotateValue * -1);
    });

    it('should return the correct rotational value with offset hours', () => {
        const test = new Watch({ dayNight: { id, offsetHours: true } });

        const now = new Date();
        const hour = now.getHours();
        const rotateIncrement = 360 / 4;
        const offsetIncrement = rotateIncrement / 6;
        let rotateValue = 0;
        let offsetHours = 0;
        const value = test.dayNight?.getRotationValue();

        if (hour < 6) {
            rotateValue = 0;
            offsetHours = hour - 0;
        }
        if (hour >= 6 && hour < 12) {
            rotateValue = rotateIncrement * 1;
            offsetHours = hour - 6;
        }
        if (hour >= 12 && hour < 18) {
            rotateValue = rotateIncrement * 2;
            offsetHours = hour - 12;
        }
        if (hour >= 18) {
            rotateValue = rotateIncrement * 3;
            offsetHours = hour - 18;
        }

        expect(value).toEqual(rotateValue + offsetHours * offsetIncrement);
    });
});
