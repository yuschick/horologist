import content from '../../content';
import { Watch } from '../Watch';
import { EquationOfTime } from './EquationOfTime';

describe('Day/Night Indicator', () => {
    const id = 'test-id';
    const range = { max: 45, min: -45 };
    const date = new Date('2022/7/20');
    let test: Watch;

    beforeEach(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ eq: { id, range }, settings: { date } });
    });

    it('should return a watch object with a eq property', () => {
        expect(test).toHaveProperty('eq');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ eq: { id: 'error', range } });
        }).toThrow(content.eq_time.errors.element_not_found);
    });

    it('should return to the correct minus eq time value', () => {
        const eq = test.eq?.getEquationOfTime();
        expect(eq).toBeLessThan(-6);
    });

    it('should return to the correct positive eq time value', () => {
        const date = new Date('2022/12/3');
        const test = new Watch({ eq: { id, range }, settings: { date } });
        const eq = test.eq?.getEquationOfTime();
        expect(eq).toBeGreaterThan(10);
    });

    it('should return the correct rotational value', () => {
        const eq = (test.eq as EquationOfTime).getEquationOfTime();
        const increment = range.min / 14;
        const value = test.eq?.getRotationValue();
        expect(value).toEqual(eq * increment);
    });
});
