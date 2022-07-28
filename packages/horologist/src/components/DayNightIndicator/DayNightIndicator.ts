import { getHours } from 'date-fns';
import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { DayNightIndicatorClass, DayNightIndicatorOptions } from './DayNightIndicator.types';

export class DayNightIndicator implements DayNightIndicatorClass {
    element: HTMLElement | null;
    hasError: boolean;
    hour: number;
    options: DayNightIndicatorOptions;

    constructor(options: DayNightIndicatorOptions, settings: WatchSettings) {
        this.options = options;
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
            throw new Error(content.day_night_indicator.errors.element_not_found);
        }
        return this.hasError;
    }

    /*
     * @return number
     * Based on the time of day, broken into quarters, return the appropriate rotation value
     * Optionally, adjust the rotation to offset the current hours
     */
    getRotationValue() {
        const quarterIncrement = 360 / 4;
        let value = 0;
        let hourOffset = 0;

        /*
         * Defining hourOffset:
         * Get how many hours into the quarter it is by subtracting the
         * first hour of the quarter (0,6,12,18) from the current hours.
         * Hour 20 - 18 = 2 hour offset
         */
        if (this.hour < 6) {
            // 0-6AM will show full day
            value = quarterIncrement * 0;
            hourOffset = this.hour - 0;
        } else if (this.hour >= 6 && this.hour < 12) {
            // 7am-12pm will show half day half night
            value = quarterIncrement * 1;
            hourOffset = this.hour - 6;
        } else if (this.hour >= 12 && this.hour < 18) {
            // 12pm-6pm will show full night
            value = quarterIncrement * 2;
            hourOffset = this.hour - 12;
        } else {
            // 6pm-12am will show half night half day
            value = quarterIncrement * 3;
            hourOffset = this.hour - 18;
        }

        if (this.options.offsetHours) {
            // Each quarter consists of 6 hours
            const hourIncrement = quarterIncrement / 6;
            value += hourOffset * hourIncrement;
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
