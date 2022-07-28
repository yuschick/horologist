import { getDay, getISODay, getWeek, getISOWeek } from 'date-fns';

import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { WeekIndicatorClass, WeekIndicatorOptions } from './WeekIndicator.types';

export class WeekIndicator implements WeekIndicatorClass {
    day: number;
    element: HTMLElement | null;
    hasError: boolean;
    maxWeeks: 52 | 53;
    options: WeekIndicatorOptions;
    week: number;

    constructor(options: WeekIndicatorOptions, settings: WatchSettings) {
        this.options = options;
        this.day = options.iso ? getISODay(settings.now) : getDay(settings.now);
        this.element = document.getElementById(options.id);
        this.maxWeeks = this.options.iso ? 53 : 52;
        this.week = this.options.iso ? getISOWeek(settings.now) : getWeek(settings.now);

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
            throw new Error(content.week_indicator.errors.element_not_found);
        }
        if (this.options.retrograde && this.options.retrograde.max > 360) {
            this.hasError = true;
            throw new Error(content.week_indicator.errors.retrograde_exceeds_max);
        }
        return this.hasError;
    }

    /*
     * @return number
     * Based on the current week of the year and ISO settings, return
     * the corresponding rotational value. Optionally, the rotations
     * can account for offsetting the current day of the week.
     */
    getRotationValue() {
        const baseIncrementValue = this.options.retrograde ? this.options.retrograde.max : 360;
        const weekIncrement = baseIncrementValue / this.maxWeeks;
        let value = this.week * weekIncrement;

        if (this.options.offsetDays) {
            const dayIncrement = weekIncrement / 7;
            value += this.day * dayIncrement;
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
