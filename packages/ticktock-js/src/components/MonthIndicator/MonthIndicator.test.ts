import { getDate, getDaysInMonth, getMonth } from 'date-fns';
import content from '../../content';
import { Watch } from '../Watch';

describe('Month Indicator', () => {
    const id = 'test-id';
    const date = new Date('2022/7/20 13:30:10');
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ month: { id }, settings: { date } });
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
        const month = getMonth(date);
        const monthIncrement = 360 / 12;
        const value = test.month?.getRotationValue();
        expect(value).toEqual(month * monthIncrement);
    });

    it('should return the correct rotational value when reversed', () => {
        const date = new Date('2022/11/20 13:30:10');
        const test = new Watch({ month: { id, reverse: true }, settings: { date } });

        const month = getMonth(date);
        const monthIncrement = 360 / 12;
        const value = test.month?.getRotationValue();
        expect(value).toEqual(month * monthIncrement * -1);
    });

    it('should return the correct rotational value with offset date', () => {
        const date = new Date('2022/2/12 13:30:10');
        const test = new Watch({ month: { id, offsetDate: true }, settings: { date } });

        const monthIncrement = 360 / 12;
        const dateIncrement = monthIncrement / getDaysInMonth(date);
        const monthValue = 1 * monthIncrement;
        const dateValue = 12 * dateIncrement;

        const value = test.month?.getRotationValue();

        expect(date.getMonth()).toEqual(1);
        expect(date.getDate()).toEqual(12);
        expect(value).toEqual(monthValue + dateValue);
    });
});
