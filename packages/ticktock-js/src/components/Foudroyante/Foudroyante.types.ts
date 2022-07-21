export interface FoudroyanteClass {
    readonly errorChecking: () => boolean;
    readonly init: () => void;
    readonly clearInterval: () => void;
    readonly rotate: () => void;
    readonly startInterview: () => void;
}

export interface FoudroyanteOptions {
    id: string;
    reverse?: boolean;
    steps: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
