import { getDay, getISOWeek, getWeek } from 'date-fns';
import content from '../../content';
import { Watch } from '../Watch';

describe('Week Indicator', () => {
    const id = 'test-id';
    const date = new Date('2022/7/20 13:30:10');
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ week: { id }, settings: { date } });
    });

    it('should return a watch object with a week property', () => {
        expect(test).toHaveProperty('week');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ week: { id: 'error' } });
        }).toThrow(content.week_indicator.errors.element_not_found);
    });

    it('should throw an error if the retrograde max exceeds 360', () => {
        expect(() => {
            new Watch({ week: { id, retrograde: { max: 400 } } });
        }).toThrow(content.week_indicator.errors.retrograde_exceeds_max);
    });

    it('should return the correct rotational value', () => {
        const week = getWeek(date);
        const weekIncrement = 360 / 52;
        const value = test.week?.getRotationValue();
        expect(value).toEqual(week * weekIncrement);
    });

    it('should return the correct rotational value when retrograde display', () => {
        const max = 180;
        const test = new Watch({ week: { id, retrograde: { max } }, settings: { date } });

        const week = getWeek(date);
        const weekIncrement = max / 52;
        const value = test.week?.getRotationValue();
        expect(value).toEqual(week * weekIncrement);
    });

    it('should return the correct rotational value for ISO week', () => {
        const test = new Watch({ week: { id, iso: true }, settings: { date } });

        const week = getISOWeek(date);
        const weekIncrement = 360 / 53;
        const value = test.week?.getRotationValue();
        expect(value).toEqual(week * weekIncrement);
    });

    it('should return the correct rotational value when reversed', () => {
        const test = new Watch({ week: { id, reverse: true }, settings: { date } });

        const week = getWeek(date);
        const weekIncrement = 360 / 52;
        const value = test.week?.getRotationValue();
        expect(value).toEqual(week * weekIncrement * -1);
    });

    it('should return the correct rotational value with offset days', () => {
        const date = new Date('2013/7/9');
        const test = new Watch({ week: { id, offsetDays: true }, settings: { date } });

        const weekIncrement = 360 / 52;
        const dayIncrement = weekIncrement / 7;
        const weekValue = 28 * weekIncrement;
        const dayValue = 2 * dayIncrement;

        const value = test.week?.getRotationValue();

        expect(getWeek(date)).toEqual(28);
        expect(getDay(date)).toEqual(2);
        expect(value).toEqual(weekValue + dayValue);
    });
});
