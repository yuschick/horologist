import { RetrogradeOptions } from '../../types/retrograde';
import { SplitDisplay } from '../../types/splitdisplay';

export interface DialClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly rotateHands: (props?: { init?: boolean; minutes?: boolean; hours?: boolean }) => void;
    readonly setSecondsHandTransitions: () => void;
}

export interface DialOptions {
    format?: 12 | 24;
    hands: {
        seconds?: DialSecondsHand;
        minutes?: DialHand;
        hours?: DialHand & DialJumpHand;
    };
    id?: string;
    timezone?: string;
}

export type DialSecondsHand = DialSecondsHandSweep | DialSecondsHandJump;

type DialSecondsHandBase = {
    id: string;
    retrograde?: RetrogradeOptions & {
        duration?: number;
    };
};

type DialSecondsHandSweep = DialSecondsHandBase & {
    jump?: never;
    sweep?: true;
};
type DialSecondsHandJump = DialSecondsHandBase & {
    jump?: true;
    sweep?: never;
};

export type DialHand = DialHandStandard | DialHandSplit;

type DialHandBase = {
    reverse?: boolean;
};

type DialHandStandard = DialHandBase & {
    id: string;
    split?: never;
    retrograde?: RetrogradeOptions;
};

type DialHandSplit = DialHandBase & {
    id?: never;
    retrograde?: never;
    split: SplitDisplay;
};

type DialJumpHand = {
    jump?: boolean;
};
