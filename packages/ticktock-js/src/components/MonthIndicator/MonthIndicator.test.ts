import { getDate, getDaysInMonth, getMonth } from 'date-fns';
import content from '../../content';
import { Watch } from '../Watch';

describe('Month Indicator', () => {
    const id = 'test-id';
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ month: { id } });
    });

    it('should return a watch object with a month property', () => {
        expect(test).toHaveProperty('month');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ month: { id: 'error' } });
        }).toThrow(content.month_indicator.errors.element_not_found);
    });

    it('should return the correct rotational value', () => {
        const now = new Date();
        const month = getMonth(now);
        const monthIncrement = 360 / 12;
        const value = test.month?.getRotationValue();
        expect(value).toEqual(month * monthIncrement);
    });

    it('should return the correct rotational value when reversed', () => {
        const test = new Watch({ month: { id, reverse: true } });

        const now = new Date();
        const month = getMonth(now);
        const monthIncrement = 360 / 12;
        const value = test.month?.getRotationValue();
        expect(value).toEqual(month * monthIncrement * -1);
    });

    it('should return the correct rotational value with offset date', () => {
        const test = new Watch({ month: { id, offsetDate: true } });

        const now = new Date();
        const month = getMonth(now);
        const date = getDate(now);
        const monthIncrement = 360 / 12;
        const dateIncrement = monthIncrement / getDaysInMonth(now);
        const monthValue = month * monthIncrement;
        const dateValue = date * dateIncrement;

        const value = test.month?.getRotationValue();

        expect(value).toEqual(monthValue + dateValue);
    });
});
