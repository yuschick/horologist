import content from '../../content';
import { Watch } from '../Watch';
import { PowerReserve } from './PowerReserve';

describe('Power Reserve', () => {
    let test: Watch;
    const id = 'test-id';
    const range = {
        full: 90,
        empty: -90,
    };

    beforeEach(() => {
        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ reserve: { id, range } });
    });

    it('should return a watch object with a week property', () => {
        expect(test).toHaveProperty('reserve');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ reserve: { id: 'error', range } });
        }).toThrow(content.power_reserve.errors.element_not_found);
    });

    it('should return the correct rotational value', () => {
        const value = test.reserve?.getRotationValue('decrement');
        expect(value).toEqual(range.full - 0.5);
    });

    it('should return the correct rotational value when inverted', () => {
        const range = { full: 0, empty: 90 };
        const test = new Watch({ reserve: { id, range } });
        const value = test.reserve?.getRotationValue('decrement');
        expect(value).toEqual(range.full + 0.5);
    });

    it('should return the correct rotational value with custom rate', () => {
        const rate = 1.5;
        const test = new Watch({ reserve: { id, range, rate } });
        const value = test.reserve?.getRotationValue('decrement');
        expect(value).toEqual(range.full - rate);
    });

    it('should not increment the reserve when full', () => {
        const test = new Watch({ reserve: { id, range } });

        test.reserve?.rotate('increment');
        expect(test.reserve?.currentRotation).toEqual(range.full);
    });

    it('should not increment the reserve when full and inverted', () => {
        const range = { full: 0, empty: 90 };
        const test = new Watch({ reserve: { id, range } });

        test.reserve?.rotate('increment');
        expect(test.reserve?.currentRotation).toEqual(range.full);
    });

    it('should not decrement when the reserve is empty', () => {
        const test = new Watch({ reserve: { id, range, rate: 90 } });
        jest.spyOn(test, 'clearInterval');
        test.reserve?.init();
        expect(test.reserve?.currentRotation).toEqual(90);

        test.reserve?.rotate('decrement');
        expect(test.reserve?.currentRotation).toEqual(0);

        test.reserve?.rotate('decrement');
        expect(test.reserve?.currentRotation).toEqual(-90);

        test.reserve?.rotate('decrement');
        expect(test.reserve?.currentRotation).toEqual(-90);
        expect(test.clearInterval).toHaveBeenCalledTimes(1);
    });

    it('should restart when incrementing after reaching range empty', () => {
        const test = new Watch({ reserve: { id, range, rate: 90 } });
        jest.spyOn(test, 'clearInterval');
        jest.spyOn(test, 'startInterval');

        test.reserve?.init();
        expect(test.reserve?.currentRotation).toEqual(90);

        test.reserve?.rotate('decrement');
        expect(test.reserve?.currentRotation).toEqual(0);

        test.reserve?.rotate('decrement');
        expect(test.reserve?.currentRotation).toEqual(-90);

        test.reserve?.rotate('decrement');
        expect(test.reserve?.currentRotation).toEqual(-90);
        expect(test.clearInterval).toHaveBeenCalledTimes(1);

        test.reserve?.rotate('increment');
        expect(test.reserve?.currentRotation).toEqual(0);
        expect(test.startInterval).toHaveBeenCalledTimes(1);
    });

    it('should call the rotate method when using the winding key', () => {
        test.reserve?.init();
        jest.spyOn(test.reserve as PowerReserve, 'rotate');

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        document.dispatchEvent(event);

        expect(test.reserve?.rotate).toHaveBeenCalledTimes(1);
    });

    it('should call the rotate method when using a custom winding key', () => {
        const key = 'ArrowDown';
        const test = new Watch({ reserve: { id, range, windingKey: key } });
        const event = new KeyboardEvent('keydown', { key });

        test.reserve?.init();
        jest.spyOn(test.reserve as PowerReserve, 'rotate');

        document.dispatchEvent(event);

        expect(test.reserve?.rotate).toHaveBeenCalledTimes(1);
    });

    it('should call the onEmpty function when emptied', () => {
        const onEmpty = jest.fn();
        const test = new Watch({ reserve: { id, range, rate: 180, onEmpty } });

        test.reserve?.rotate('decrement');
        expect(test.reserve?.currentRotation).toEqual(-90);

        test.reserve?.rotate('decrement');
        expect(test.reserve?.currentRotation).toEqual(-90);
        expect(onEmpty).toHaveBeenCalledTimes(1);
    });
});
