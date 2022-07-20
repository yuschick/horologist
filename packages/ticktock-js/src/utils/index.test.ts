import * as utils from './';

describe('rotate', () => {
    const element = document.createElement('div');

    it('should set the correct transform value', () => {
        utils.rotate({ element, value: 30 });

        expect(element.style.transform).toEqual('rotate(30deg)');
    });
});
