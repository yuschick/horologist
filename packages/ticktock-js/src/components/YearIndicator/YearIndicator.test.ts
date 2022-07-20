import content from '../../content';
import { Watch } from '../Watch';

describe('Year Indicator', () => {
    const id = 'test-id';

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
    });

    it('should return a watch object with a year property', () => {
        const test = new Watch({ year: { id } });
        expect(test).toHaveProperty('year');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ year: { id: 'error' } });
        }).toThrow(content.year_indicator.errors.element_not_found);
    });

    it('should return cycle position 1 for 2021', () => {
        const test = new Watch({ year: { id } });
        const cycleYear = test.year?.getYearInCycle(2021);
        expect(cycleYear).toEqual(1);
    });

    it('should return cycle position 2 for 2022', () => {
        const test = new Watch({ year: { id } });
        const cycleYear = test.year?.getYearInCycle(2022);
        expect(cycleYear).toEqual(2);
    });

    it('should return cycle position 3 for 2023', () => {
        const test = new Watch({ year: { id } });
        const cycleYear = test.year?.getYearInCycle(2023);
        expect(cycleYear).toEqual(3);
    });

    it('should return cycle position 4 for 2024', () => {
        const test = new Watch({ year: { id } });
        const cycleYear = test.year?.getYearInCycle(2024);
        expect(cycleYear).toEqual(4);
    });
});
