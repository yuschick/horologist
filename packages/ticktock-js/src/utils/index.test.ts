import * as utils from './';

describe('rotate', () => {
    const element = document.createElement('div');
    const value = 30;

    it('should set the correct transform value', () => {
        utils.rotate({ element, value });

        expect(element.style.transform).toEqual(`rotate(${value}deg)`);
    });

    it('should append the correct transform value', () => {
        const transform = 'scale(1.1)';
        element.style.transform = transform;

        utils.rotate({ element, value });

        expect(element.style.transform).toEqual(`${transform} rotate(${value}deg)`);
    });
});
