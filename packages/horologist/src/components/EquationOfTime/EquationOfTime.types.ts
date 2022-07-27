export interface EquationOfTimeClass {
    readonly errorChecking: () => boolean;
    readonly getEquationOfTime: () => number;
    readonly getRotationValue: () => number;
    readonly init: () => void;
}

export interface EquationOfTimeOptions {
    id: string;
    range: EquationOfTimeRange;
}

export type EquationOfTimeRange = {
    max: number;
    min: number;
};
