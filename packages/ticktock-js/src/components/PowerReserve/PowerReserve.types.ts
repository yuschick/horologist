import { WatchClass, WatchSettings } from '../Watch';

export interface PowerReserveClass {
    readonly bindEvents: () => void;
    readonly errorChecking: () => boolean;
    readonly getRotationValue: (direction?: 'increment' | 'decrement', rotation?: number) => number;
    readonly init: () => void;
    readonly rotate: (direction?: 'increment' | 'decrement') => void;
}

export interface PowerReserveOptions {
    id: string;
    onEmpty?: () => void;
    range: PowerReserveRange;
    rate?: number;
    windingKey?: string;
}

export type PowerReserveRange = {
    empty: number;
    full: number;
};

export type ParentWatch = {
    settings: WatchSettings;
    parent: WatchClass;
};
