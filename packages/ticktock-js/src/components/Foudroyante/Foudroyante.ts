import { FoudroyanteClass, FoudroyanteOptions } from './Foudroyante.types';
import content from '../../content';
import { rotate } from '../../utils';

/*
Often on a Chronograph, a Foudroyante is a hand that makes one rotation every
second, pausing four, five, even eight times (steps) to indicate quarters,
fifths or eighths of a second.
*/

export class Foudroyante implements FoudroyanteClass {
    currentRotation: number;
    element: HTMLElement | null;
    hasError: boolean;
    interval?: ReturnType<typeof setInterval>;
    reverse?: boolean;
    stepDuration: number;
    stepRotation: number;
    steps: number;

    constructor(options: FoudroyanteOptions) {
        // Component properties
        this.currentRotation = 0;
        this.element = document.getElementById(options.id);
        this.reverse = options.reverse || false;
        this.steps = options.steps;
        this.stepDuration = 1000 / this.steps;
        this.stepRotation = 360 / this.steps;

        // Error properties and checking
        this.hasError = false;
        this.errorChecking();
    }

    errorChecking() {
        if (!this.element) {
            this.hasError = true;
            throw new Error(content.foudroyante.errors.element_not_found);
        }
    }

    init() {
        if (!this.hasError) this.startInterview();
    }

    clearInterval() {
        clearInterval(this.interval);
    }

    rotate() {
        if (!this.element) return;

        if (Math.abs(this.currentRotation) + this.stepRotation === 360) {
            this.currentRotation = 0;
        } else {
            this.currentRotation = Math.abs(this.currentRotation) + this.stepRotation;
            this.currentRotation *= this.reverse ? -1 : 1;
        }

        rotate({ element: this.element, value: this.currentRotation });
    }

    startInterview() {
        this.interval = setInterval(() => {
            this.rotate();
        }, this.stepDuration);
    }
}
