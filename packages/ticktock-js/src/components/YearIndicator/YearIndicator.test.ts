import content from '../../content';
import { Watch } from '../Watch';
import { YearIndicatorClass } from './YearIndicator.types';

describe('Year Indicator', () => {
    const id = 'test-id';
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ year: { id } });
    });

    it('should return a watch object with a year property', () => {
        expect(test).toHaveProperty('year');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ year: { id: 'error' } });
        }).toThrow(content.year_indicator.errors.element_not_found);
    });

    it('should return cycle position 1 for 2021', () => {
        const cycleYear = test.year?.getYearInCycle(2021);
        expect(cycleYear).toEqual(1);
    });

    it('should return the correct rotational value', () => {
        const value = test.year?.getRotationValue(3);
        expect(value).toEqual(180);
    });

    it('should return the correct rotational value when reversed', () => {
        const test = new Watch({ year: { id, reverse: true } });
        const value = test.year?.getRotationValue(3);
        expect(value).toEqual(-180);
    });

    it('should return correct rotational value with offset months', () => {
        const test = new Watch({ year: { id, offsetMonths: true } });

        const now = new Date();
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth();
        const monthIncrement = 7.5;

        const cycleYear = (test.year as YearIndicatorClass).getYearInCycle(nowYear);
        const value = test.year?.getRotationValue(cycleYear);

        const yearRotateValue = (cycleYear - 1) * 90;
        const monthOffsetValue = nowMonth * monthIncrement;

        expect(value).toEqual(yearRotateValue + monthOffsetValue);
    });

    it('should return cycle position 2 for 2022', () => {
        const cycleYear = test.year?.getYearInCycle(2022);
        expect(cycleYear).toEqual(2);
    });

    it('should return cycle position 3 for 2023', () => {
        const cycleYear = test.year?.getYearInCycle(2023);
        expect(cycleYear).toEqual(3);
    });

    it('should return cycle position 4 for 2024', () => {
        const cycleYear = test.year?.getYearInCycle(2024);
        expect(cycleYear).toEqual(4);
    });
});