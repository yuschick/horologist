export interface DayNightIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
}

export interface DayNightIndicatorOptions {
    id: string;
    offsetHours?: boolean;
    reverse?: boolean;
}
