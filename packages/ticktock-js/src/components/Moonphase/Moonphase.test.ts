import content from '../../content';
import { Watch } from '../Watch';

describe('Moonphase', () => {
    const id = 'test-id';
    const date = new Date('2022/7/21');
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ moonphase: { id }, settings: { date } });
    });

    it('should return a watch object with a moonphase property', () => {
        expect(test).toHaveProperty('moonphase');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ moonphase: { id: 'error' } });
        }).toThrow(content.moonphase.errors.element_not_found);
    });

    it('should return the correct rotational value', () => {
        const value = test.moonphase?.getRotationValue();
        expect(value).toEqual(270);
    });

    it('should return the correct rotational value when reversed', () => {
        test = new Watch({
            moonphase: { id, reverse: true },
            settings: { date: new Date('2022/6/14') },
        });
        const value = test.moonphase?.getRotationValue();
        expect(value).toEqual(-180);
    });
});
