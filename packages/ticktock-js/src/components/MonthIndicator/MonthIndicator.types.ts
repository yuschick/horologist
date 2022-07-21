export interface MonthIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
}

export interface MonthIndicatorOptions {
    id: string;
    offsetDate?: boolean;
    reverse?: boolean;
}
