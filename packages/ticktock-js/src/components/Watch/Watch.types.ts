import { ChronographOptions } from '../Chronograph';
import { DateIndicatorOptions } from '../DateIndicator';
import { DayIndicatorOptions } from '../DayIndicator';
import { DayNightIndicatorOptions } from '../DayNightIndicator';
import { DialOptions } from '../Dial';
import { EquationOfTimeOptions } from '../EquationOfTime';
import { FoudroyanteOptions } from '../Foudroyante';
import { MinuteRepeaterOptions } from '../MinuteRepeater';
import { MonthIndicatorOptions } from '../MonthIndicator';
import { MoonphaseOptions } from '../Moonphase';
import { PowerReserveOptions } from '../PowerReserve';
import { WeekIndicatorOptions } from '../WeekIndicator';
import { LeapYearIndicatorOptions } from '../LeapYearIndicator';

export interface WatchClass {
    readonly clearInterval: () => void;
    readonly startInterval: () => void;
    start: () => void;
}

export interface WatchOptions {
    chronograph?: ChronographOptions;
    date?: DateIndicatorOptions;
    day?: DayIndicatorOptions;
    dayNight?: DayNightIndicatorOptions;
    dials?: DialOptions[];
    eq?: EquationOfTimeOptions;
    foudroyante?: FoudroyanteOptions;
    id?: string;
    leapYear?: LeapYearIndicatorOptions;
    month?: MonthIndicatorOptions;
    moonphase?: MoonphaseOptions;
    repeater?: MinuteRepeaterOptions;
    reserve?: PowerReserveOptions;
    settings?: WatchCustomSettings;
    week?: WeekIndicatorOptions;
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
