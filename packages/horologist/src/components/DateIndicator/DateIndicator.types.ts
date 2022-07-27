import { RetrogradeOptions } from '../../types/retrograde';
import { SplitDisplay } from '../../types/splitdisplay';

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
    split?: never;
    retrograde?: RetrogradeOptions;
};

type DateIndicatorSplit = {
    id?: never;
    split: SplitDisplay;
    retrograde?: never;
};
