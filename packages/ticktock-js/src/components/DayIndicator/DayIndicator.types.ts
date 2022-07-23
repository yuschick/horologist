export interface DayIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
}

export interface DayIndicatorOptions {
    id: string;
    offsetHours?: boolean;
    retrograde?: DayIndicatorRetrograde;
    reverse?: boolean;
}

export type DayIndicatorRetrograde = {
    max: number;
};
