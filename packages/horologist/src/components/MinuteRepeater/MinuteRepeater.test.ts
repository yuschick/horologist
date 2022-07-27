import content from '../../content';
import { Watch } from '../Watch';
import { MinuteRepeaterChimeCounts } from './MinuteRepeater.types';

describe('Minute Repeater', () => {
    const date = new Date('2022/7/13 7:17:00');
    const id = 'test-id';
    let test: Watch;

    beforeAll(() => {
        // Mock the pause and play methods to avoid Jest errors unrelated to the tests
        jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
        jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(async () => {});

        document.body.innerHTML = `<div id="${id}" />`;
        test = new Watch({ repeater: { id }, settings: { date } });
    });

    it('should return a watch object with a repeater property', () => {
        expect(test).toHaveProperty('repeater');
    });

    it('should throw an error if the element cannot be found', () => {
        expect(() => {
            new Watch({ repeater: { id: 'error' } });
        }).toThrow(content.minute_repeater.errors.element_not_found);
    });

    it('should return the correct chime counts', () => {
        const target: MinuteRepeaterChimeCounts = {
            hour: 7,
            minute: 2,
            quarter: 1,
        };

        const counts = test.repeater?.getChimeCounts();
        expect(counts).toEqual(target);
    });

    it('should return the correct evening chime counts', () => {
        const date = new Date('2000/12/5 19:57:00');
        const test = new Watch({ repeater: { id }, settings: { date } });
        const target: MinuteRepeaterChimeCounts = {
            hour: 7,
            minute: 12,
            quarter: 3,
        };

        const counts = test.repeater?.getChimeCounts();
        expect(counts).toEqual(target);
    });

    it('should execute the onPlay callback', () => {
        const onPlay = jest.fn();
        const test = new Watch({ repeater: { id, onPlay }, settings: { date } });
        const element = document.getElementById(id);
        const event = new MouseEvent('click');

        test.start();
        element?.dispatchEvent(event);

        expect(onPlay).toHaveBeenCalledTimes(1);
    });

    it('should execute the onStop callback', () => {
        const onStop = jest.fn();
        const test = new Watch({ repeater: { id, onStop }, settings: { date } });
        const element = document.getElementById(id);
        const event = new MouseEvent('click');

        test.start();
        element?.dispatchEvent(event);
        element?.dispatchEvent(event);

        expect(onStop).toHaveBeenCalledTimes(1);
    });

    it('should add the correct activeClass', () => {
        const element = document.getElementById(id);
        const event = new MouseEvent('click');

        test.start();
        element?.dispatchEvent(event);
        expect(element?.classList).toContain('active');
    });

    it('should add the correct custom activeClass', () => {
        const activeClass = 'unicorn';
        const test = new Watch({ repeater: { id }, settings: { activeClass } });
        const element = document.getElementById(id);
        const event = new MouseEvent('click');

        test.start();
        element?.dispatchEvent(event);
        expect(element?.classList).toContain(activeClass);
    });
});
