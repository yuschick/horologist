import { FoudroyanteOptions } from '../Foudroyante';
import { YearIndicatorOptions } from '../YearIndicator';

export interface WatchClass {
    readonly clearInterval: () => void;
    readonly startInterval: () => void;
    start: () => void;
}

export interface WatchOptions {
    foudroyante?: FoudroyanteOptions;
    id?: string;
    year?: YearIndicatorOptions;
}

export type WatchSettings = {
    interval?: ReturnType<typeof setInterval>;
    now: Date;
};
