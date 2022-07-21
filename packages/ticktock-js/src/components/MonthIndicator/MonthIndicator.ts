import { getDate, getDaysInMonth, getMonth } from 'date-fns';

import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { MonthIndicatorClass, MonthIndicatorOptions } from './MonthIndicator.types';

/*
 * The Month Indicator rotates an element to reflect the current
 * month of the year. Optionally, the element can be rotated an
 * additional amount to offset the current date of the month.
 */
export class MonthIndicator implements MonthIndicatorClass {
    date: number;
    daysInMonth: number;
    element: HTMLElement | null;
    hasError: boolean;
    month: number;
    offsetDate: boolean;
    reverse: boolean;

    constructor(options: MonthIndicatorOptions, settings: WatchSettings) {
        this.date = getDate(settings.now);
        this.daysInMonth = getDaysInMonth(settings.now);
        this.element = document.getElementById(options.id);
        this.month = getMonth(settings.now);
        this.offsetDate = options.offsetDate || false;
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
            throw new Error(content.month_indicator.errors.element_not_found);
        }
        return this.hasError;
    }

    /*
     * @return number
     * Based on the month of the year, return the appropriate rotation value
     * Optionally, adjust the rotation to offset the current date
     */
    getRotationValue() {
        const monthIncrement = 360 / 12;
        let value = this.month * monthIncrement;

        if (this.offsetDate) {
            const dateIncrement = monthIncrement / this.daysInMonth;
            value += this.date * dateIncrement;
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
