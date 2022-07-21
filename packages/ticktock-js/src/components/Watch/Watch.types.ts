import { DayIndicatorOptions } from '../DayIndicator';
import { FoudroyanteOptions } from '../Foudroyante';
import { MonthIndicatorOptions } from '../MonthIndicator';
import { WeekIndicatorOptions } from '../WeekIndicator';
import { YearIndicatorOptions } from '../YearIndicator';

export interface WatchClass {
    readonly clearInterval: () => void;
    readonly startInterval: () => void;
    start: () => void;
}

export interface WatchOptions {
    day?: DayIndicatorOptions;
    foudroyante?: FoudroyanteOptions;
    id?: string;
    month?: MonthIndicatorOptions;
    week?: WeekIndicatorOptions;
    year?: YearIndicatorOptions;
}

export type WatchSettings = {
    interval?: ReturnType<typeof setInterval>;
    now: Date;
};
