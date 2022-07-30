import { addSeconds, getHours, getMinutes, getSeconds } from 'date-fns';
import DateFnsTz from 'date-fns-tz';

import content from '../../content';
import { rotate, setElementTransition } from '../../utils';
import { WatchSettings } from '../Watch';
import { DialClass, DialOptions } from './Dial.types';

export const transitions = {
    default: 'transform 1s steps(4, start) 0s',
    jump: 'transform 0s linear 0s',
    sweep: 'transform 1s linear 0s',
};

export class Dial implements DialClass {
    hands: {
        seconds?: HTMLElement | null;
        minutes?: {
            standard?: HTMLElement | null;
            ones?: HTMLElement | null;
            tenths?: HTMLElement | null;
        };
        hours?: {
            standard?: HTMLElement | null;
            ones?: HTMLElement | null;
            tenths?: HTMLElement | null;
        };
    };
    hasError: boolean;
    id?: string;
    isReset: boolean;
    interval?: ReturnType<typeof setInterval>;
    options: DialOptions;
    rotations: {
        seconds: number;
    };
    settings: WatchSettings;

    constructor(options: DialOptions, settings: WatchSettings) {
        this.options = options;
        this.settings = {
            ...settings,
            now: options.timezone
                ? DateFnsTz.utcToZonedTime(settings.now, options.timezone)
                : settings.now,
        };
        this.hands = {
            seconds: options.hands.seconds
                ? document.getElementById(options.hands.seconds.id)
                : undefined,
            minutes: {
                standard: options.hands.minutes?.id
                    ? document.getElementById(options.hands.minutes.id)
                    : undefined,
                ones: options.hands.minutes?.split?.ones
                    ? document.getElementById(options.hands.minutes.split.ones)
                    : undefined,
                tenths: options.hands.minutes?.split?.tenths
                    ? document.getElementById(options.hands.minutes.split.tenths)
                    : undefined,
            },
            hours: {
                standard: options.hands.hours?.id
                    ? document.getElementById(options.hands.hours.id)
                    : undefined,
                ones: options.hands.hours?.split?.ones
                    ? document.getElementById(options.hands.hours.split.ones)
                    : undefined,
                tenths: options.hands.hours?.split?.tenths
                    ? document.getElementById(options.hands.hours.split.tenths)
                    : undefined,
            },
        };
        this.id = options.id;
        this.isReset = false;
        this.rotations = {
            seconds: 0,
        };

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

        if (this.options.hands.seconds?.id && !this.hands.seconds) {
            this.hasError = true;
            throw new Error(content.dial.errors.seconds_hand_not_found);
        }
        if (this.options.hands.minutes?.id && !this.hands.minutes?.standard) {
            this.hasError = true;
            throw new Error(content.dial.errors.minutes_hand_not_found);
        }
        if (this.options.hands.hours?.id && !this.hands.hours?.standard) {
            this.hasError = true;
            throw new Error(content.dial.errors.hours_hand_not_found);
        }

        if (
            (this.options.hands.minutes?.split &&
                (this.options.hands.minutes.id || this.options.hands.minutes?.retrograde)) ||
            (this.options.hands.hours?.split &&
                (this.options.hands.hours.id || this.options.hands.hours?.retrograde))
        ) {
            this.hasError = true;
            throw new Error(content.dial.errors.incompatible_display_types);
        }

        if (this.options.hands.minutes?.split && !this.hands.minutes?.ones) {
            this.hasError = true;
            throw new Error(content.dial.errors.minutes_ones_hand_not_found);
        }
        if (this.options.hands.minutes?.split && !this.hands.minutes?.tenths) {
            this.hasError = true;
            throw new Error(content.dial.errors.minutes_tenths_hand_not_found);
        }
        if (this.options.hands.hours?.split && !this.hands.hours?.ones) {
            this.hasError = true;
            throw new Error(content.dial.errors.hours_ones_hand_not_found);
        }
        if (this.options.hands.hours?.split && !this.hands.hours?.tenths) {
            this.hasError = true;
            throw new Error(content.dial.errors.hours_tenths_hand_not_found);
        }

        if (
            (this.options.hands.seconds?.retrograde &&
                this.options.hands.seconds?.retrograde.max > 360) ||
            (this.options.hands.minutes?.retrograde &&
                this.options.hands.minutes?.retrograde.max > 360) ||
            (this.options.hands.hours?.retrograde && this.options.hands.hours?.retrograde.max > 360)
        ) {
            this.hasError = true;
            throw new Error(content.dial.errors.retrograde_exceeds_max);
        }

        if (
            this.options.hands.seconds?.retrograde?.duration &&
            (this.options.hands.seconds?.retrograde?.duration < 10 ||
                this.options.hands.seconds?.retrograde?.duration > 60)
        ) {
            this.hasError = true;
            throw new Error(content.dial.errors.seconds_retrograde_out_of_range);
        }
        return this.hasError;
    }

    /*
     * If no errors are thrown, start the complication
     */
    init() {
        if (this.hasError) return;

        // First set the hands to the current time
        this.rotateHands({ init: true, minutes: true, hours: true });
        this.setSecondsHandTransitions();
    }

    /*
     * The seconds hand on many watches doesn't jump from position to position.
     * They often complete a series of smaller steps each second. This is why
     * the default transition of the seconds hand is to move in 5 step increments.
     * However, this can be overridden to sweep or jump.
     * Sweep will move the seconds hand linearly around the dial
     * Jump will move without any easing or steps between each position
     */
    setSecondsHandTransitions(props?: { reset?: boolean }) {
        if (!this.hands.seconds) return;

        if (this.options.hands.seconds?.sweep) {
            setElementTransition({
                element: this.hands.seconds,
                value: transitions.sweep,
                settings: { remove: props?.reset },
            });
        } else if (this.options.hands.seconds?.jump) {
            setElementTransition({
                element: this.hands.seconds,
                value: transitions.jump,
                settings: { remove: props?.reset },
            });
        } else {
            setElementTransition({
                element: this.hands.seconds,
                value: transitions.default,
                settings: { remove: props?.reset },
            });
        }
    }

    /*
     * This is the core rotate method for the Dial. Relative to this.settings.now,
     * rotate the appropriate hands. This method is called from the parent Watch interval.
     */
    rotateHands(props?: { init?: boolean; minutes?: boolean; hours?: boolean }) {
        // SET SECONDS
        if (this.hands.seconds) {
            const range = this.options.hands.seconds?.retrograde?.max || 360;
            const duration = this.options.hands.seconds?.retrograde?.duration || 60;
            const increment = range / duration;

            // If the hand has been reset, add the transition style back
            if (this.isReset) {
                this.isReset = false;
                this.setSecondsHandTransitions();
            }

            // When there is a 1 second transition, offset it by adding 1 second to now
            const secondOffset = this.options.hands.seconds?.jump ? 0 : 1;
            let value = props?.init
                ? (getSeconds(addSeconds(this.settings.now, secondOffset)) % duration) * increment
                : this.rotations.seconds + increment;

            /*
             * Okay. When rotating the seconds hand, whenever it gets to 59 seconds
             * then goes to 0, the hand in the UI rotates backwards to 0 instead of
             * moving forward. So whenever the hand has reached the max range of the
             * display, remove the transition of the hand and set it to 0deg rotation.
             * This way the hand continues forward with very little effect.
             */
            if (this.options.hands.seconds?.retrograde && value > range) {
                value = 0;
                this.setSecondsHandTransitions({ reset: true });
                this.isReset = true;
            }

            this.rotations.seconds = value;
            rotate({ element: this.hands.seconds, value });
        }

        // SET MINUTES
        if (props?.minutes && this.options.hands.minutes) {
            const minutes = getMinutes(this.settings.now);
            if (this.hands.minutes?.ones && this.hands.minutes?.tenths) {
                const minutesOnes = minutes % 10;
                const minutesTenths = Math.floor(minutes / 10);
                const onesIncrement = 360 / 10; // 0-9
                const tenthsIncrement = 360 / 6; // 0-5

                let onesValue = minutesOnes * onesIncrement;
                let tenthsValue = minutesTenths * tenthsIncrement;

                onesValue *= this.options.hands.minutes.reverse ? -1 : 1;
                tenthsValue *= this.options.hands.minutes.reverse ? -1 : 1;

                rotate({ element: this.hands.minutes.ones, value: onesValue });
                rotate({ element: this.hands.minutes.tenths, value: tenthsValue });
            } else if (this.hands.minutes?.standard) {
                const range = this.options.hands.minutes?.retrograde?.max || 360;
                const increment = range / 60;

                let value = minutes * increment;
                value *= this.options.hands.minutes?.reverse ? -1 : 1;

                rotate({ element: this.hands.minutes.standard, value });
            }
        }

        // SET HOURS
        if (props?.hours && this.options.hands.hours) {
            let hours = getHours(this.settings.now);
            if (this.options.format !== 24) {
                hours -= hours > 12 ? 12 : 0;
            }

            if (this.hands.hours?.ones && this.hands.hours?.tenths) {
                const hoursOnes = hours % 10;
                const hoursTenths = Math.floor(hours / 10);
                const onesIncrement = 360 / 10; // 0-9
                const tenthsBase = this.options.format === 24 ? 3 : 2; // 3 = 0-2, 2 = 0-1
                const tenthsIncrement = 360 / tenthsBase;

                let onesValue = hoursOnes * onesIncrement;
                let tenthsValue = hoursTenths * tenthsIncrement;

                onesValue *= this.options.hands.hours.reverse ? -1 : 1;
                tenthsValue *= this.options.hands.hours.reverse ? -1 : 1;

                rotate({ element: this.hands.hours.ones, value: onesValue });
                rotate({ element: this.hands.hours.tenths, value: tenthsValue });
            } else if (this.hands.hours?.standard) {
                const minutes = getMinutes(this.settings.now);

                const range = this.options.hands.hours.retrograde?.max || 360;
                const hoursPerRotation = this.options.format === 24 ? 24 : 12;

                const hourIncrement = range / hoursPerRotation;
                const minuteIncrement = this.options.hands.hours.jump ? 0 : hourIncrement / 60;

                let value = hourIncrement * hours + minuteIncrement * minutes;
                value *= this.options.hands.hours?.reverse ? -1 : 1;

                rotate({ element: this.hands.hours.standard, value });
            }
        }
    }
}
