export interface MonthIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
}

export interface MonthIndicatorOptions {
    id: string;
    offsetDate?: boolean;
    retrograde?: MonthIndicatorRetrograde;
    reverse?: boolean;
}

export type MonthIndicatorRetrograde = {
    max: number;
};
