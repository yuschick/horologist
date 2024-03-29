import { Watch } from '../../index';
import content from '../../content';

describe('Foudroyante', () => {
    const id = 'test-id';
    const steps = 5;
    let test: Watch;

    beforeAll(() => {
        document.body.innerHTML = `<div id="${id}" />`;
    });

    beforeEach(() => {
        test = new Watch({ foudroyante: { id, steps } });
    });

    it('should return a watch object with a foudroyante property', () => {
        expect(test).toHaveProperty('foudroyante');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ foudroyante: { id: 'error', steps } });
        }).toThrow(content.foudroyante.errors.element_not_found);
    });

    it('should calculate the correct step increment', () => {
        expect(test.foudroyante?.stepRotation).toEqual(360 / steps);
    });

    it('should set the correct rotation value', () => {
        test.foudroyante?.rotate();
        expect(test.foudroyante?.currentRotation).toEqual(360 / steps);

        test.foudroyante?.rotate();
        expect(test.foudroyante?.currentRotation).toEqual((360 / steps) * 2);
    });
});
