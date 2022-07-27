import { RetrogradeOptions } from '../../types/retrograde';

export interface LeapYearIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly getRotationValue: (cycle: 1 | 2 | 3 | 4) => number;
    readonly getYearInCycle: (year: number) => 1 | 2 | 3 | 4;
    readonly init: () => void;
}

export interface LeapYearIndicatorOptions {
    id: string;
    offsetMonths?: boolean;
    retrograde?: RetrogradeOptions;
    reverse?: boolean;
}
