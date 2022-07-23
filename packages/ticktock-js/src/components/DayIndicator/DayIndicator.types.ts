import { RetrogradeOptions } from '../../types/retrograde';

export interface DayIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
}

export interface DayIndicatorOptions {
    id: string;
    offsetHours?: boolean;
    retrograde?: RetrogradeOptions;
    reverse?: boolean;
}
