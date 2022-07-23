import { getDate } from 'date-fns';
import content from '../../content';
import { Watch } from '../Watch';

describe('Date Indicator', () => {
    const id = 'test-id';
    const date = new Date('2022/7/20 13:30:10');
    let test: Watch;

    beforeEach(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ date: { id }, settings: { date } });
    });

    it('should return a watch object with a date property', () => {
        expect(test).toHaveProperty('date');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ date: { id: 'error' } });
        }).toThrow(content.date_indicator.errors.element_not_found);
    });

    it('should throw an error if the retrograde max exceeds 360', () => {
        expect(() => {
            new Watch({ date: { id, retrograde: { max: 400 } } });
        }).toThrow(content.date_indicator.errors.retrograde_exceeds_max);
    });

    it('should throw an error if the ones element cannot be found', () => {
        expect(() => {
            new Watch({ date: { ones: 'error', tenths: id } });
        }).toThrow(content.date_indicator.errors.ones_element_not_found);
    });

    it('should throw an error if the tenths element cannot be found', () => {
        expect(() => {
            new Watch({ date: { tenths: 'error', ones: id } });
        }).toThrow(content.date_indicator.errors.tenths_element_not_found);
    });

    it('should return the correct rotational value for a single display', () => {
        const dateValue = getDate(date) - 1;
        const dateIncrement = 360 / 31;
        const value = dateValue * dateIncrement;
        expect(value).toEqual(19 * dateIncrement);
    });

    it('should return the correct rotational value for a single display when reversed', () => {
        const test = new Watch({ date: { id, reverse: true }, settings: { date } });
        const dateIncrement = 360 / 31;

        expect(test.date?.getRotationValue()).toEqual(19 * dateIncrement * -1);
    });

    it('should return the correct rotational values for a split display', () => {
        document.body.innerHTML = `<div id="ones-id" /><div id="tenths-id" />`;
        const test = new Watch({
            date: { ones: 'ones-id', tenths: 'tenths-id' },
            settings: { date },
        });
        const onesIncrement = 360 / 10;
        const tenthsIncrement = 360 / 4;
        const dateValue = getDate(date);
        const ones = dateValue % 10;
        const tenths = Math.floor(dateValue / 10);

        const values = test.date?.getSplitRotationValues();
        expect(values).toEqual({ ones: ones * onesIncrement, tenths: tenths * tenthsIncrement });
    });

    it('should return the correct rotational values for a split display when reversed', () => {
        document.body.innerHTML += `<div id="ones-id" /><div id="tenths-id" />`;
        const test = new Watch({
            date: { ones: 'ones-id', tenths: 'tenths-id', reverse: true },
            settings: { date },
        });
        const onesIncrement = 360 / 10;
        const tenthsIncrement = 360 / 4;
        const dateValue = getDate(date);
        const ones = dateValue % 10;
        const tenths = Math.floor(dateValue / 10);

        const values = test.date?.getSplitRotationValues();
        expect(values).toEqual({
            ones: ones * onesIncrement * -1,
            tenths: tenths * tenthsIncrement * -1,
        });
    });

    it('should return the correct rotational value for a retrograde display', () => {
        const max = 180;
        const test = new Watch({ date: { id, retrograde: { max } }, settings: { date } });

        const dateIncrement = max / 31;
        expect(test.date?.getRetrogradeRotationValue()).toEqual(19 * dateIncrement);
    });

    it('should return the correct rotational value for a retrograde display when reversed', () => {
        const max = 180;
        const test = new Watch({
            date: { id, retrograde: { max }, reverse: true },
            settings: { date },
        });

        const dateIncrement = max / 31;
        expect(test.date?.getRetrogradeRotationValue()).toEqual(19 * dateIncrement * -1);
    });
});
