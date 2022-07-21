import { Moon } from 'lunarphase-js';

import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { MoonphaseClass, MoonphaseOptions, Phase } from './Moonphase.types';

/*
 * The moonphase component determines the moon's position for a given
 * date, and rotates an element to correspond to the phase.
 */
export class Moonphase implements MoonphaseClass {
    date: Date;
    element: HTMLElement | null;
    hasError: boolean;
    reverse: boolean;

    constructor(options: MoonphaseOptions, settings: WatchSettings) {
        this.date = settings.now;
        this.element = document.getElementById(options.id);
        this.reverse = options.reverse || false;

        this.hasError = false;
        this.errorChecking();
    }

    /*
     * @return boolean
     * Check for any critical errors within the setup of the complication
     * and set this.hasError accordingly
     */
    errorChecking() {
        this.hasError = false;
        if (!this.element) {
            this.hasError = true;
            throw new Error(content.moonphase.errors.element_not_found);
        }
        return this.hasError;
    }

    /*
     * @return number
     * Based on the given date, return the appropriate rotation value
     * aligned with the date's phase of the moon
     */
    getRotationValue() {
        const phase: Phase = Moon.lunarPhase(this.date);
        const phaseMap = Object.freeze({
            New: 0,
            'Waxing Crescent': 45,
            'First Quarter': 90,
            'Waxing Gibbous': 135,
            Full: 180,
            'Waning Gibbous': 225,
            'Last Quarter': 270,
            'Waning Crescent': 315,
        });

        let value = phaseMap[phase];
        value *= this.reverse ? -1 : 1;
        return value;
    }

    /*
     * If no errors are thrown, start the complication
     */
    init() {
        if (this.hasError) return;
        const value = this.getRotationValue();

        // Can cast this.element here since the error checking passed
        rotate({ element: this.element as HTMLElement, value });
    }
}
