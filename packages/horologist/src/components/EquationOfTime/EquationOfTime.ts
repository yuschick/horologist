import { equationOfTime } from 'suntimes';

import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { EquationOfTimeClass, EquationOfTimeOptions } from './EquationOfTime.types';

export class EquationOfTime implements EquationOfTimeClass {
    element: HTMLElement | null;
    eq: number;
    hasError: boolean;
    maxIncrement: number;
    minIncrement: number;
    now: Date;
    options: EquationOfTimeOptions;

    constructor(options: EquationOfTimeOptions, settings: WatchSettings) {
        this.options = options;
        this.element = document.getElementById(options.id);
        this.now = settings.now;
        this.eq = this.getEquationOfTime();

        this.maxIncrement = this.options.range.max / 16;
        this.minIncrement = this.options.range.min / 14;

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
            throw new Error(content.eq_time.errors.element_not_found);
        }
        return this.hasError;
    }

    /*
     * @return number
     * Calculate the equation of time with the this.now date object
     */
    getEquationOfTime() {
        const eq = equationOfTime(new Date(this.now));
        return eq;
    }

    /*
     * @return number
     * Calculate the rotation value for the current this.eq value.
     * If the eq time is greater than 0, use the max increment, up to 16 minutes
     * Otherwise, use the min increment, down to 14 minutes.
     */
    getRotationValue() {
        const increment = this.eq > 0 ? this.maxIncrement : this.minIncrement;
        const value = this.eq * increment;
        return value;
    }

    /*
     * If no errors are thrown, start the complication
     */
    init() {
        if (this.hasError) return;
        this.rotate();
    }

    /*
     * Rotate the eq element relative to the rotational value
     */
    rotate() {
        if (!this.element) return;

        const value = this.getRotationValue();
        rotate({ element: this.element, value });
    }
}
