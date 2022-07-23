import { RetrogradeOptions } from '../../types/retrograde';

export interface DateIndicatorClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly getRotationValue: () => number;
    readonly getRetrogradeRotationValue: () => number;
    readonly getSplitRotationValues: () => { ones: number; tenths: number };
}

export type DateIndicatorOptions = (DateIndicatorSingle | DateIndicatorSplit) & {
    reverse?: boolean;
};

type DateIndicatorSingle = {
    id: string;
    ones?: never;
    tenths?: never;
    retrograde?: RetrogradeOptions;
};

type DateIndicatorSplit = {
    id?: never;
    ones: string;
    tenths: string;
    retrograde?: never;
};
