import content from '../../content';
import { rotate } from '../../utils';
import { WatchSettings } from '../Watch';
import { YearIndicatorClass, YearIndicatorOptions } from './YearIndicator.types';

/*
The year indicator complication receives a date, and displays
that date's year's placement within the cycle of leap years.
*/

export class YearIndicator implements YearIndicatorClass {
    element: HTMLElement | null;
    hasError: boolean;
    reverse: boolean;
    year?: number;

    constructor(options: YearIndicatorOptions, settings: WatchSettings) {
        this.element = document.getElementById(options.id);
        this.reverse = options.reverse || false;
        this.year = settings.now?.getFullYear();

        this.hasError = false;
        this.errorChecking();
    }

    errorChecking() {
        if (!this.element) {
            this.hasError = true;
            throw new Error(content.year_indicator.errors.element_not_found);
        }

        if (!this.year) {
            this.hasError = true;
            throw new Error(content.year_indicator.errors.year_invalid);
        }
    }

    getYearInCycle(year?: number) {
        const cycleYear = year;
        if (!cycleYear) return 1;

        if ((cycleYear % 4 === 0 && cycleYear % 100 !== 0) || cycleYear % 400 === 0) {
            return 4;
        } else if ((cycleYear % 4 === 2 && cycleYear % 100 !== 2) || cycleYear % 400 === 2) {
            return 2;
        } else if ((cycleYear % 4 === 3 && cycleYear % 100 !== 3) || cycleYear % 400 === 3) {
            return 3;
        }

        return 1;
    }

    init() {
        if (!this.hasError) {
            const cycle = this.getYearInCycle(this.year);
            this.rotate(cycle);
        }
    }

    rotate(cycle: 1 | 2 | 3 | 4) {
        if (!this.element) return;

        const yearRotationMap = Object.freeze({
            1: 0,
            2: 90,
            3: 180,
            4: 270,
        });
        let value = yearRotationMap[cycle];
        value *= this.reverse ? -1 : 1;

        rotate({ element: this.element, value });
    }
}
