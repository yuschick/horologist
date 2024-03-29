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

describe('getDOMElementRotateValue', () => {
    const element = document.createElement('div');
    const rotateValue = 30;

    it('should return 0 when no rotate value is found', () => {
        const result = utils.getDOMElementRotateValue(element);
        expect(result).toEqual(0);
    });

    it('should return the correct rotate value when one exists', () => {
        element.style.transform = `rotate(${rotateValue}deg)`;
        const result = utils.getDOMElementRotateValue(element);
        expect(result).toEqual(rotateValue);
    });

    it('should return the correct rotate value when other transforms are present', () => {
        element.style.transform = `scale(1.1) rotate(${rotateValue}deg) translateX(1px)`;
        const result = utils.getDOMElementRotateValue(element);
        expect(result).toEqual(rotateValue);
    });
});

describe('repeatAction', () => {
    let count = 1;
    utils.repeatAction(10, () => count++);
    expect(count).toEqual(11);
});

describe('setElementTransition', () => {
    let element: HTMLElement | undefined;
    const baseTransition = 'all 1s ease';
    const newTransition = 'rotate 1s ease';

    beforeEach(() => {
        element = document.createElement('div');
    });

    it('should add the transition to an element with no existing transition', () => {
        utils.setElementTransition({ element: element as HTMLElement, value: newTransition });
        expect((element as HTMLElement).style.transition).toEqual(newTransition);
    });

    it('should append the new transition to an existing transition', () => {
        (element as HTMLElement).style.transition = baseTransition;
        utils.setElementTransition({ element: element as HTMLElement, value: newTransition });
        expect((element as HTMLElement).style.transition).toEqual(
            `${baseTransition}, ${newTransition}`,
        );
    });
});
