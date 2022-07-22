import { addSeconds, isSameDay, isSameHour, isSameMonth } from 'date-fns';

import { DayIndicator } from '../DayIndicator';
import { DayNightIndicator } from '../DayNightIndicator';
import { EquationOfTime } from '../EquationOfTime';
import { Foudroyante } from '../Foudroyante';
import { MonthIndicator } from '../MonthIndicator';
import { Moonphase } from '../Moonphase';
import { PowerReserve } from '../PowerReserve';
import { WeekIndicator } from '../WeekIndicator';
import { YearIndicator } from '../YearIndicator';
import * as Types from './Watch.types';

/*
 * The top-level Watch class which manages timeouts, complications
 * and event triggers for any child components.
 */
export class Watch implements Types.WatchClass {
    day?: DayIndicator;
    dayNight?: DayNightIndicator;
    eq?: EquationOfTime;
    foudroyante?: Foudroyante;
    id?: string;
    settings: Types.WatchSettings;
    month?: MonthIndicator;
    moonphase?: Moonphase;
    reserve?: PowerReserve;
    week?: WeekIndicator;
    year?: YearIndicator;

    constructor(options: Types.WatchOptions) {
        this.id = options.id;
        this.settings = {
            now: options.settings?.date || new Date(),
        };

        this.day = options.day && new DayIndicator(options.day, this.settings);
        this.dayNight = options.dayNight && new DayNightIndicator(options.dayNight, this.settings);
        this.eq = options.eq && new EquationOfTime(options.eq, this.settings);
        this.foudroyante = options.foudroyante && new Foudroyante(options.foudroyante);
        this.month = options.month && new MonthIndicator(options.month, this.settings);
        this.moonphase = options.moonphase && new Moonphase(options.moonphase, this.settings);
        this.reserve =
            options.reserve &&
            new PowerReserve(options.reserve, { settings: this.settings, parent: this });
        this.week = options.week && new WeekIndicator(options.week, this.settings);
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
            this.settings.now = addSeconds(oldDate, 1);

            this.reserve?.rotate('decrement');

            // If the hour has changed, update the dependent indicators
            if (!isSameHour(oldDate, this.settings.now)) {
                this.day?.init();
                this.dayNight?.init();
            }

            // If the day has changed, update the dependent indicators
            if (!isSameDay(oldDate, this.settings.now)) {
                this.eq?.init();
                this.month?.init();
                this.moonphase?.init();
                this.week?.init();
            }

            // If the month has changed, update the year indicator
            if (!isSameMonth(oldDate, this.settings.now)) {
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
        this.dayNight?.init();
        this.eq?.init();

        // TODO: If the foudroyante isn't tied to a chronograph, init()
        this.foudroyante?.init();

        this.month?.init();
        this.moonphase?.init();
        this.reserve?.init();
        this.week?.init();
        this.year?.init();
    }
}
