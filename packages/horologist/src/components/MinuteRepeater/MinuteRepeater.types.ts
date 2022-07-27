export interface MinuteRepeaterClass {
    readonly bindEvents: () => void;
    readonly errorChecking: () => boolean;
    readonly getChimeCounts: () => MinuteRepeaterChimeCounts;
    readonly init: () => void;
    readonly playChimes: () => void;
    readonly playHours: () => void;
    readonly playMinutes: () => void;
    readonly playQuarterHours: () => void;
    readonly setupAudioElements: () => void;
    readonly stopAndResetAllAudio: () => void;
}

export interface MinuteRepeaterOptions {
    chimes?: MinuteRepeaterOptionsChimes;
    id: string;
    onPlay?: () => void;
    onStop?: () => void;
    onEnd?: () => void;
}

export type MinuteRepeaterOptionsChimes = {
    hour?: string;
    minute?: string;
};

export type MinuteRepeaterChimesAudio = {
    hour: string;
    minute: string;
};

export type MinuteRepeaterChimeCounts = {
    hour: number;
    minute: number;
    quarter: number;
};

export type MinuteRepeaterChimes = {
    audio: MinuteRepeaterChimesAudio;
    counter: number;
    counts: MinuteRepeaterChimeCounts;
    durations: {
        minute: number;
    };
    elements: {
        hour: HTMLAudioElement;
        minute: HTMLAudioElement;
    };
};
