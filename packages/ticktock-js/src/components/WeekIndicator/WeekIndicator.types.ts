import { RetrogradeOptions } from '../../types/retrograde';

export interface WeekIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
}

export interface WeekIndicatorOptions {
    id: string;
    iso?: boolean;
    offsetDays?: boolean;
    retrograde?: RetrogradeOptions;
    reverse?: boolean;
}
