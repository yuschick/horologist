import content from '../../content';
import { Watch } from '../Watch';

describe('Day Indicator', () => {
    const id = 'test-id';
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ day: { id } });
    });

    it('should return a watch object with a year property', () => {
        expect(test).toHaveProperty('day');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ day: { id: 'error' } });
        }).toThrow(content.day_indicator.errors.element_not_found);
    });

    it('should return the correct rotational value', () => {
        const now = new Date();
        const day = now.getDay();
        const dayIncrement = 360 / 7;
        const value = test.day?.getRotationValue();
        expect(value).toEqual(day * dayIncrement);
    });

    it('should return the correct rotational value when reversed', () => {
        const test = new Watch({ day: { id, reverse: true } });

        const now = new Date();
        const day = now.getDay();
        const dayIncrement = 360 / 7;
        const value = test.day?.getRotationValue();
        expect(value).toEqual(day * dayIncrement * -1);
    });

    it('should return the correct rotational value with offset hours', () => {
        const test = new Watch({ day: { id, offsetHours: true } });

        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const dayIncrement = 360 / 7;
        const hourIncrement = dayIncrement / 24;
        const dayValue = day * dayIncrement;
        const hourValue = hour * hourIncrement;

        const value = test.day?.getRotationValue();

        expect(value).toEqual(dayValue + hourValue);
    });
});
