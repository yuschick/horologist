export interface MoonphaseClass {
    readonly errorChecking: () => boolean;
    readonly getRotationValue: () => number;
    readonly init: () => void;
}

export interface MoonphaseOptions {
    id: string;
    reverse?: boolean;
}

export type Phase =
    | 'New'
    | 'Waxing Crescent'
    | 'First Quarter'
    | 'Waxing Gibbous'
    | 'Full'
    | 'Waning Gibbous'
    | 'Last Quarter'
    | 'Waning Crescent';
