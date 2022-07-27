import { FoudroyanteClass, FoudroyanteOptions } from './Foudroyante.types';
import content from '../../content';
import { rotate } from '../../utils';

/*
 * Often on a Chronograph, a Foudroyante is a hand that makes one rotation every
 * second, pausing four, five, even eight times (steps) to indicate quarters,
 * fifths or eighths of a second.
 */
export class Foudroyante implements FoudroyanteClass {
    currentRotation: number;
    element: HTMLElement | null;
    hasError: boolean;
    interval?: ReturnType<typeof setInterval>;
    options: FoudroyanteOptions;
    stepDuration: number;
    stepRotation: number;

    constructor(options: FoudroyanteOptions) {
        this.options = options;
        this.currentRotation = 0;
        this.element = document.getElementById(options.id);
        this.stepDuration = 1000 / this.options.steps;
        this.stepRotation = 360 / this.options.steps;

        // Error properties and checking
        this.hasError = false;
        this.errorChecking();
    }

    /*
     * @return boolean
     * Check for any critical errors within the setup of the complication
     * and set this.hasError accordingly
     */
    errorChecking() {
        this.hasError = false;
        if (!this.element) {
            this.hasError = true;
            throw new Error(content.foudroyante.errors.element_not_found);
        }
        return this.hasError;
    }

    /*
     * If no errors are thrown, start the complication
     */
    init() {
        if (this.hasError) return;
        this.startInterview();
    }

    /*
     * Clear the interval and pause the component
     */
    clearInterval() {
        clearInterval(this.interval);
    }

    /*
     * Based on the current rotation value and settings,
     * calculate the next rotational value and rotate this.element
     */
    rotate() {
        if (!this.element) return;

        if (Math.abs(this.currentRotation) + this.stepRotation === 360) {
            this.currentRotation = 0;
        } else {
            this.currentRotation = Math.abs(this.currentRotation) + this.stepRotation;
            this.currentRotation *= this.options.reverse ? -1 : 1;
        }

        rotate({ element: this.element, value: this.currentRotation });
    }

    /*
     * Start the interval, effectively running the complication
     */
    startInterview() {
        this.interval = setInterval(() => {
            this.rotate();
        }, this.stepDuration);
    }
}
