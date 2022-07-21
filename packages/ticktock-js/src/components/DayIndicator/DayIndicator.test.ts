import content from '../../content';
import { Watch } from '../Watch';

describe('Day Indicator', () => {
    const id = 'test-id';
    const date = new Date('2022/7/20 13:30:10');
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ day: { id }, settings: { date } });
    });

    it('should return a watch object with a day property', () => {
        expect(test).toHaveProperty('day');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ day: { id: 'error' } });
        }).toThrow(content.day_indicator.errors.element_not_found);
    });

    it('should return the correct rotational value', () => {
        const day = date.getDay();
        const dayIncrement = 360 / 7;
        const value = test.day?.getRotationValue();

        expect(day).toEqual(3);
        expect(value).toEqual(day * dayIncrement);
    });

    it('should return the correct rotational value when reversed', () => {
        const test = new Watch({ day: { id, reverse: true }, settings: { date } });

        const day = date.getDay();
        const dayIncrement = 360 / 7;
        const value = test.day?.getRotationValue();

        expect(day).toEqual(3);
        expect(value).toEqual(day * dayIncrement * -1);
    });

    it('should return the correct rotational value with offset hours', () => {
        const test = new Watch({ day: { id, offsetHours: true }, settings: { date } });

        const day = date.getDay();
        const hour = date.getHours();
        const dayIncrement = 360 / 7;
        const hourIncrement = dayIncrement / 24;
        const dayValue = day * dayIncrement;
        const hourValue = hour * hourIncrement;

        const value = test.day?.getRotationValue();

        expect(day).toEqual(3);
        expect(hour).toEqual(13);
        expect(value).toEqual(dayValue + hourValue);
    });
});
