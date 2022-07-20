import { FoudroyanteOptions } from '../Foudroyante/Foudroyante.types';

export interface WatchClass {
    readonly clearInterval: () => void;
    readonly startInterval: () => void;
    start: () => void;
}

export interface WatchOptions {
    foudroyante?: FoudroyanteOptions;
    id?: string;
}

export type WatchSettings = {
    interval?: ReturnType<typeof setInterval>;
    now?: number;
};
