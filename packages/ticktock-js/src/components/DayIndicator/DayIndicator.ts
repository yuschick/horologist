import { getDay, getHours } from 'date-fns';

import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { DayIndicatorClass, DayIndicatorOptions } from './DayIndicator.types';

/*
 * The Day Indicator rotates an element based on the current day
 * of the week with each day equalling 51.43deg rotation. Additionally,
 * th display can offset the hours of the current day, in which case,
 * an additional 2.14deg are added to the rotation value.
 * Sunday is treated as the first day of the week, by default
 * The Day Indicator supports two display types.
 *
 * Single Display
 * Most common, where the days are shown either with a single disc or hand
 *
 * Retrograde Display
 * Generally shown in a half circle, but indicated still with a single hand
 */
export class DayIndicator implements DayIndicatorClass {
    day: number;
    element: HTMLElement | null;
    hasError: boolean;
    hour: number;
    options: DayIndicatorOptions;

    constructor(options: DayIndicatorOptions, settings: WatchSettings) {
        this.options = options;
        this.day = getDay(settings.now); // 0-6
        this.element = document.getElementById(options.id);
        this.hour = getHours(settings.now); // 0-23

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
            throw new Error(content.day_indicator.errors.element_not_found);
        }
        if (this.options.retrograde && this.options.retrograde.max > 360) {
            this.hasError = true;
            throw new Error(content.day_indicator.errors.retrograde_exceeds_max);
        }
        return this.hasError;
    }

    /*
     * @return number
     * Based on the day of the week, return the appropriate rotation value
     * Optionally, adjust the rotation to offset the current hours
     */
    getRotationValue() {
        const baseIncrementValue = this.options.retrograde ? this.options.retrograde.max : 360;
        const dayIncrement = baseIncrementValue / 7;
        let value = this.day * dayIncrement;

        if (this.options.offsetHours) {
            const hourIncrement = dayIncrement / 24;
            value += this.hour * hourIncrement;
        }

        value *= this.options.reverse ? -1 : 1;
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
