export interface DayNightIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
}

export interface DayNightIndicatorOptions {
    dial?: string;
    id: string;
    offsetHours?: boolean;
    reverse?: boolean;
}
