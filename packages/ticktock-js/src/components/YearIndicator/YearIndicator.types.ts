export interface YearIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly getRotationValue: (cycle: 1 | 2 | 3 | 4) => number;
    readonly getYearInCycle: (year: number) => 1 | 2 | 3 | 4;
    readonly init: () => void;
}

export interface YearIndicatorOptions {
    id: string;
    offsetMonths?: boolean;
    reverse?: boolean;
}
