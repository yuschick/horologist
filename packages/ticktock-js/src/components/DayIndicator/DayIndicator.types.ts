export interface DayIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
}

export interface DayIndicatorOptions {
    id: string;
    offsetHours?: boolean;
    reverse?: boolean;
}
