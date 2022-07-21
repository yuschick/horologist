import { differenceInCalendarYears, isSameHour } from 'date-fns';

import { DayIndicator } from '../DayIndicator';
import { Foudroyante } from '../Foudroyante';
import { YearIndicator } from '../YearIndicator';
import * as Types from './Watch.types';

/*
 * The top-level Watch class which manages timeouts, complications
 * and event triggers for any child components.
 */
export class Watch implements Types.WatchClass {
    day?: DayIndicator;
    foudroyante?: Foudroyante;
    id?: string;
    settings: Types.WatchSettings;
    year?: YearIndicator;

    constructor(options: Types.WatchOptions) {
        this.id = options.id;
        this.settings = {
            now: new Date(),
        };

        this.day = options.day && new DayIndicator(options.day, this.settings);
        this.foudroyante = options.foudroyante && new Foudroyante(options.foudroyante);
        this.year = options.year && new YearIndicator(options.year, this.settings);
    }

    /*
     * Clear the global interval.
     * This effect will pause all child complication intervals, as well,
     * to pause the entire watch
     */
    clearInterval() {
        clearInterval(this.settings.interval);

        // Complications that rely on an interval also are cleared
        // TODO: If foudroyante isn't tied to a chronograph, clearInterval();
        this.foudroyante?.clearInterval();
    }

    /*
     * Start the global interval, effectively starting the watch
     */
    startInterval() {
        this.settings.interval = setInterval(() => {
            const oldDate = this.settings.now;
            this.settings.now = new Date();

            // If the hour has changed, update the day indicator
            if (isSameHour(oldDate, this.settings.now)) {
                this.day?.init();
            }

            // If the calendar year has changed, update the year indicator
            if (differenceInCalendarYears(oldDate, this.settings.now)) {
                this.year?.init();
            }
        }, 1000);
    }

    /*
     * Start the global Watch instance and any child complications
     */
    start() {
        this.startInterval();

        this.day?.init();
        // TODO: If the foudroyante isn't tied to a chronograph, init()
        this.foudroyante?.init();
        this.year?.init();
    }
}
