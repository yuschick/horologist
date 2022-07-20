export interface WatchClass {
    start: () => void;
}

export interface WatchOptions {
    moonphase?: string | { id?: string; reverse?: boolean };
    name?: string;
}
