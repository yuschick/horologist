export interface ChronographClass {
    readonly bindEvents: () => void;
    readonly determineChronographType: () => void;
    readonly errorChecking: () => boolean;
    readonly goToState: (state: ChronographState) => void;
    readonly init: () => void;
    readonly incrementHands: () => void;
    readonly resetHands: () => void;
    readonly startChronograph: () => void;
    readonly stopChronograph: () => void;
}

export type ChronographState = 'active' | 'paused' | 'ready' | 'setSplit' | 'unsetSplit';

export interface ChronographOptions {
    durations?: ChronographDialDurations;
    flyback?: boolean;
    hands: ChronographHands;
    pushers: ChronographPushers;
}

export type ChronographPushers = {
    mono: string;
    dual?: string;
    tri?: string;
};

export type ChronographHands = {
    subSeconds?: string;
    seconds: string;
    minutes: string;
    hours?: string;
    rattrapante?: ChronographRattrapanteHands;
};

export type ChronographRattrapanteHands = {
    seconds: string;
    minutes?: string;
    hours?: string;
};

export type ChronographDialDurations = {
    subSeconds?: number;
    seconds?: number;
    minutes?: number;
    hours?: number;
};
