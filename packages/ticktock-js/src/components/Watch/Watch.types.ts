import { DayIndicatorOptions } from '../DayIndicator';
import { DayNightIndicatorOptions } from '../DayNightIndicator';
import { EquationOfTimeOptions } from '../EquationOfTime';
import { FoudroyanteOptions } from '../Foudroyante';
import { MinuteRepeaterOptions } from '../MinuteRepeater';
import { MonthIndicatorOptions } from '../MonthIndicator';
import { MoonphaseOptions } from '../Moonphase';
import { PowerReserveOptions } from '../PowerReserve';
import { WeekIndicatorOptions } from '../WeekIndicator';
import { YearIndicatorOptions } from '../YearIndicator';

export interface WatchClass {
    readonly clearInterval: () => void;
    readonly startInterval: () => void;
    start: () => void;
}

export interface WatchOptions {
    day?: DayIndicatorOptions;
    dayNight?: DayNightIndicatorOptions;
    eq?: EquationOfTimeOptions;
    foudroyante?: FoudroyanteOptions;
    id?: string;
    month?: MonthIndicatorOptions;
    moonphase?: MoonphaseOptions;
    repeater?: MinuteRepeaterOptions;
    reserve?: PowerReserveOptions;
    settings?: WatchCustomSettings;
    week?: WeekIndicatorOptions;
    year?: YearIndicatorOptions;
}

export type WatchSettings = {
    activeClass?: string;
    interval?: ReturnType<typeof setInterval>;
    now: Date;
};

export type WatchCustomSettings = {
    activeClass?: string;
    date?: Date;
};
