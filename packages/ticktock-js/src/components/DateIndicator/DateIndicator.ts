import { getDate } from 'date-fns';
import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { DateIndicatorClass, DateIndicatorOptions } from './DateIndicator.types';

/*
 * The Date Indicator is a common watch complication. However, it can come in different forms.
 * The Date display can support multiple variations.
 *
 * Single Display:
 * When dates 1-31 are shown on a single disc or with a single hand.
 * Single displays expect the designs / elements to begin at 1
 *
 * Split Display
 * When the date is shown in two pieces, tenths (0-3) and ones (0-9)
 * Split displays expect the designs / elements to begin at 00
 *
 * Retrograde
 * Typically a half circle indicating dates 1-31 with a single hand
 * Retrograde displays expect the designs / elements to begin at 1
 */
export class DateIndicator implements DateIndicatorClass {
    element?: HTMLElement | null;
    hasError: boolean;
    isRetrograde: boolean;
    isSplit: boolean;
    split?: {
        onesElement: HTMLElement | null;
        tenthsElement: HTMLElement | null;
    };
    options: DateIndicatorOptions;
    settings: WatchSettings;

    constructor(options: DateIndicatorOptions, settings: WatchSettings) {
        this.element = options.id ? document.getElementById(options.id) : undefined;
        this.options = options;
        this.settings = settings;
        this.split =
            options.ones && options.tenths
                ? {
                      onesElement: document.getElementById(options.ones),
                      tenthsElement: document.getElementById(options.tenths),
                  }
                : undefined;

        this.isRetrograde = !!this.options.retrograde;
        this.isSplit = !!this.split;

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
        if (!this.isSplit && !this.element) {
            this.hasError = true;
            throw new Error(content.date_indicator.errors.element_not_found);
        }
        if ((this.split?.onesElement || this.split?.tenthsElement) && this.element) {
            this.hasError = true;
            throw new Error(content.date_indicator.errors.incompatible_elements);
        }
        if (this.isSplit && !this.split?.onesElement) {
            this.hasError = true;
            throw new Error(content.date_indicator.errors.ones_element_not_found);
        }
        if (this.isSplit && !this.split?.tenthsElement) {
            this.hasError = true;
            throw new Error(content.date_indicator.errors.tenths_element_not_found);
        }
        if (this.isRetrograde && this.isSplit) {
            this.hasError = true;
            throw new Error(content.date_indicator.errors.incompatible_displays);
        }
        if (this.options.retrograde && this.options.retrograde.max > 360) {
            this.hasError = true;
            throw new Error(content.date_indicator.errors.retrograde_exceeds_max);
        }
        return this.hasError;
    }

    /*
     * @return number
     * Based on the date of the month, return the appropriate rotation value
     */
    getRotationValue() {
        // Subtract one because 1 should be at 0deg rotation
        const date = getDate(this.settings.now) - 1;
        const dateIncrement = 360 / 31;
        let value = date * dateIncrement;

        value *= this.options.reverse ? -1 : 1;
        return value;
    }

    /*
     * @return number
     * Based on the date of the month and max retrograde angle
     * return the appropriate rotation value
     */
    getRetrogradeRotationValue() {
        // Subtract one because 1 should be at 0deg rotation
        const date = getDate(this.settings.now) - 1;
        const dateIncrement = this.options.retrograde!.max / 31;
        let value = date * dateIncrement;

        value *= this.options.reverse ? -1 : 1;
        return value;
    }

    /*
     * @return { ones: number, tenths: number }
     * Based on the date of the month, return the appropriate rotation values
     * split between the ones and tenths dials.
     */
    getSplitRotationValues() {
        const date = getDate(this.settings.now);
        const dateOnes = date % 10;
        const dateTenths = Math.floor(date / 10);

        const onesIncrement = 360 / 10; // 0-9
        const tenthsIncrement = 360 / 4; // 0-3

        let onesValue = dateOnes * onesIncrement;
        let tenthsValue = dateTenths * tenthsIncrement;

        onesValue *= this.options.reverse ? -1 : 1;
        tenthsValue *= this.options.reverse ? -1 : 1;

        return {
            ones: onesValue,
            tenths: tenthsValue,
        };
    }

    /*
     * If no errors are thrown, start the complication
     */
    init() {
        if (this.hasError) return;

        // Can cast this.element here since the error checking passed
        if (this.isSplit) {
            const value = this.getSplitRotationValues();
            rotate({ element: this.split?.onesElement as HTMLElement, value: value.ones });
            rotate({ element: this.split?.tenthsElement as HTMLElement, value: value.tenths });
        } else {
            const value = this.isRetrograde
                ? this.getRetrogradeRotationValue()
                : this.getRotationValue();
            rotate({ element: this.element as HTMLElement, value });
        }
    }
}
