export interface WatchClass {
    readonly pauseInterval: () => void;
    readonly startInterval: () => void;
    start: () => void;
}

export interface WatchOptions {
    id?: string;
    settings: WatchSettings;
}

export type WatchSettings = {
    now?: number;
    interval?: ReturnType<typeof setInterval>;
};
