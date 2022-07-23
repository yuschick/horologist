import { getMonth, getYear } from 'date-fns';

import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { YearIndicatorClass, YearIndicatorOptions } from './YearIndicator.types';

/*
 * The year indicator complication receives a date, and displays
 * that date's year's placement within the cycle of leap years.
 */
export class YearIndicator implements YearIndicatorClass {
    element: HTMLElement | null;
    hasError: boolean;
    month: number;
    options: YearIndicatorOptions;
    year: number;

    constructor(options: YearIndicatorOptions, settings: WatchSettings) {
        this.options = options;
        this.element = document.getElementById(options.id);
        this.month = getMonth(settings.now);
        this.year = getYear(settings.now);

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
            throw new Error(content.year_indicator.errors.element_not_found);
        }
        if (!this.year) {
            this.hasError = true;
            throw new Error(content.year_indicator.errors.year_invalid);
        }
        if (this.options.retrograde && this.options.retrograde.max > 360) {
            this.hasError = true;
            throw new Error(content.year_indicator.errors.retrograde_exceeds_max);
        }
        return this.hasError;
    }

    /*
     * @param cycle: 1|2|3|4
     * @return number
     * Based on the cycle position and options, return the appropriate
     * rotational value for this.element
     */
    getRotationValue(cycle: 1 | 2 | 3 | 4) {
        if (!this.element) return 0;
        const baseIncrementValue = this.options.retrograde ? this.options.retrograde.max : 360;

        const yearRotationMap = Object.freeze({
            1: 0,
            2: baseIncrementValue / 4, // 360 -> 90
            3: baseIncrementValue / 2, // 360 -> 180
            4: baseIncrementValue * 0.75, // 360 -> 270
        });
        let value = yearRotationMap[cycle];

        if (this.options.offsetMonths) {
            value += this.month * (baseIncrementValue / 4 / 12); // 360 -> 90deg / 12months
        }

        value *= this.options.reverse ? -1 : 1;
        return value;
    }

    /*
     * @param year: number
     * @return 1|2|3|4
     * Given a specified year, determine if that year is a leap year
     * and if not, determine its proximity within the leap year cycle
     */
    getYearInCycle(year: number): 1 | 2 | 3 | 4 {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return 4; // leap year
        } else if ((year % 4 === 2 && year % 100 !== 2) || year % 400 === 2) {
            return 2; // year 2 of 4
        } else if ((year % 4 === 3 && year % 100 !== 3) || year % 400 === 3) {
            return 3; // year 3 of 4
        }

        return 1; // year 1 of 4
    }

    /*
     * If no errors are thrown, start the complication
     */
    init() {
        if (this.hasError) return;

        const cycle = this.getYearInCycle(this.year);
        const value = this.getRotationValue(cycle);

        // Can cast this.element here since the error checking passed
        rotate({ element: this.element as HTMLElement, value });
    }
}
