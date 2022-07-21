import { getDay, getISOWeek, getWeek } from 'date-fns';
import content from '../../content';
import { Watch } from '../Watch';

describe('Week Indicator', () => {
    const id = 'test-id';
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ week: { id } });
    });

    it('should return a watch object with a week property', () => {
        expect(test).toHaveProperty('week');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ week: { id: 'error' } });
        }).toThrow(content.week_indicator.errors.element_not_found);
    });

    it('should return the correct rotational value', () => {
        const now = new Date();
        const week = getWeek(now);
        const weekIncrement = 360 / 52;
        const value = test.week?.getRotationValue();
        expect(value).toEqual(week * weekIncrement);
    });

    it('should return the correct rotational value for ISO week', () => {
        const test = new Watch({ week: { id, iso: true } });

        const now = new Date();
        const week = getISOWeek(now);
        const weekIncrement = 360 / 53;
        const value = test.week?.getRotationValue();
        expect(value).toEqual(week * weekIncrement);
    });

    it('should return the correct rotational value when reversed', () => {
        const test = new Watch({ week: { id, reverse: true } });

        const now = new Date();
        const week = getWeek(now);
        const weekIncrement = 360 / 52;
        const value = test.week?.getRotationValue();
        expect(value).toEqual(week * weekIncrement * -1);
    });

    it('should return the correct rotational value with offset days', () => {
        const test = new Watch({ week: { id, offsetDays: true } });

        const now = new Date();
        const week = getWeek(now);
        const day = getDay(now);
        const weekIncrement = 360 / 52;
        const dayIncrement = weekIncrement / 7;
        const weekValue = week * weekIncrement;
        const dayValue = day * dayIncrement;

        const value = test.week?.getRotationValue();

        expect(value).toEqual(weekValue + dayValue);
    });
});
