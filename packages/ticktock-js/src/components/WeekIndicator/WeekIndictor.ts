import { getDay, getISODay, getWeek, getISOWeek } from 'date-fns';

import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { WeekIndicatorClass, WeekIndicatorOptions } from './WeekIndicator.types';

/*
 * The week indicator receives a date object and rotates an element
 * to depict the current week of the year, whether standard or iso week.
 * If iso, the getISODay is used where Monday is 1 and Sunday is 7.
 * Otherwise, getDay is used, where Sunday is 0 and Saturday is 6.
 */
export class WeekIndicator implements WeekIndicatorClass {
    day: number;
    element: HTMLElement | null;
    hasError: boolean;
    iso: boolean;
    maxWeeks: 52 | 53;
    offsetDays: boolean;
    reverse: boolean;
    week: number;

    constructor(options: WeekIndicatorOptions, settings: WatchSettings) {
        this.day = options.iso ? getISODay(settings.now) : getDay(settings.now);
        this.element = document.getElementById(options.id);
        this.iso = options.iso || false;
        this.maxWeeks = this.iso ? 53 : 52;
        this.offsetDays = options.offsetDays || false;
        this.reverse = options.reverse || false;
        this.week = this.iso ? getISOWeek(settings.now) : getWeek(settings.now);

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
        return this.hasError;
    }

    /*
     * @return number
     * Based on the current week of the year and ISO settings, return
     * the corresponding rotational value. Optionally, the rotations
     * can account for offsetting the current day of the week.
     */
    getRotationValue() {
        const weekIncrement = 360 / this.maxWeeks;
        let value = this.week * weekIncrement;

        if (this.offsetDays) {
            const dayIncrement = weekIncrement / 7;
            value += this.day * dayIncrement;
        }

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