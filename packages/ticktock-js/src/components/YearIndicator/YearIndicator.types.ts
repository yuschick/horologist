export interface YearIndicatorClass {
    readonly errorChecking: () => void;
    readonly getYearInCycle: (year?: number) => number;
    readonly init: () => void;
    readonly rotate: (cycle: 1 | 2 | 3 | 4) => void;
}

export interface YearIndicatorOptions {
    id: string;
    reverse?: boolean;
}
