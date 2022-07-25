import content from '../../content';
import { rotate, setupTriggerEvents } from '../../utils';
import { WatchSettings } from '../Watch';
import { ChronographClass, ChronographOptions, ChronographState } from './Chronograph.types';

export class Chronograph implements ChronographClass {
    hands: {
        tenths?: HTMLElement | null;
        seconds: HTMLElement | null;
        minutes: HTMLElement | null;
        hours?: HTMLElement | null;
        split?: {
            seconds?: HTMLElement | null;
            minutes?: HTMLElement | null;
            hours?: HTMLElement | null;
        };
    };
    hasError: boolean;
    iterationCount: number;
    interval?: ReturnType<typeof setInterval>;
    options: ChronographOptions;
    pushers: {
        mono: HTMLElement | null;
        dual?: HTMLElement | null;
        tri?: HTMLElement | null;
    };
    rotations: {
        tenths: number;
        seconds: number;
        minutes: number;
        hours: number;
    };
    settings: WatchSettings;
    state: {
        isActive: boolean;
        isPaused: boolean;
        isReady: boolean;
        isSplitSet: boolean;
    };
    type: {
        isFlyback?: boolean;
        isMonoPusher?: boolean;
        isDualPusher?: boolean;
        isTriPusher?: boolean;
        isSplit?: boolean;
        isSingleSplit?: boolean;
        isDoubleSplit?: boolean;
        isTripleSplit?: boolean;
    };

    constructor(options: ChronographOptions, settings: WatchSettings) {
        this.options = options;
        this.hands = {
            tenths: this.options.hands.tenths
                ? document.getElementById(this.options.hands.tenths)
                : undefined,
            seconds: document.getElementById(this.options.hands.seconds),
            minutes: document.getElementById(this.options.hands.minutes),
            hours: this.options.hands.hours
                ? document.getElementById(this.options.hands.hours)
                : undefined,
            split: {
                seconds: this.options.hands.rattrapante?.seconds
                    ? document.getElementById(this.options.hands.rattrapante?.seconds)
                    : undefined,
                minutes: this.options.hands.rattrapante?.minutes
                    ? document.getElementById(this.options.hands.rattrapante?.minutes)
                    : undefined,
                hours: this.options.hands.rattrapante?.hours
                    ? document.getElementById(this.options.hands.rattrapante?.hours)
                    : undefined,
            },
        };
        this.pushers = {
            mono: document.getElementById(this.options.pushers.mono),
            dual: this.options.pushers.dual
                ? document.getElementById(this.options.pushers.dual)
                : undefined,
            tri: this.options.pushers.tri
                ? document.getElementById(this.options.pushers.tri)
                : undefined,
        };
        // This increments each interval to determine when seconds/minutes/hours hands are to be rotated
        this.iterationCount = 1;
        this.rotations = {
            tenths: 0,
            seconds: 0,
            minutes: 0,
            hours: 0,
        };
        this.settings = settings;
        this.type = {};

        this.state = {
            isActive: false,
            isPaused: false,
            isReady: true,
            isSplitSet: false,
        };

        this.hasError = false;
        this.errorChecking();

        this.determineChronographType();
    }

    bindEvents() {
        setupTriggerEvents(
            {
                activeClass: this.settings.activeClass,
                element: this.pushers.mono as HTMLElement,
            },
            () => {
                if (this.state.isReady) return this.goToState('active');
                if (this.state.isActive) return this.goToState('paused');

                if (this.type.isMonoPusher) {
                    if (this.state.isPaused) return this.goToState('ready');
                }

                if (this.type.isDualPusher || this.type.isTriPusher) {
                    if (this.state.isPaused) return this.goToState('active');
                }
            },
        );

        if (!this.pushers.dual) return;

        setupTriggerEvents(
            {
                activeClass: this.settings.activeClass,
                element: this.pushers.dual,
            },
            () => {
                if (this.type.isDualPusher) {
                    if (!this.type.isSplit && !this.type.isFlyback) {
                        if (this.state.isActive || this.state.isPaused)
                            return this.goToState('ready');
                    } else if (this.type.isFlyback && !this.type.isSplit) {
                        if (this.state.isActive) {
                            this.goToState('setSplit');
                            this.resetHands();
                        }
                        if (this.state.isPaused) return this.goToState('ready');
                    } else if (this.type.isSplit) {
                        if (this.type.isFlyback) {
                            if (this.state.isActive && !this.state.isSplitSet) {
                                this.goToState('setSplit');
                                this.resetHands();
                                return;
                            }
                            if (this.state.isActive && this.state.isSplitSet)
                                return this.goToState('unsetSplit');
                            if (this.state.isPaused) return this.goToState('ready');
                        } else {
                            if (this.state.isActive && !this.state.isSplitSet)
                                return this.goToState('setSplit');
                            if (this.state.isActive && this.state.isSplitSet)
                                return this.goToState('unsetSplit');
                            if (this.state.isPaused) return this.goToState('ready');
                        }
                    }
                }

                if (this.type.isTriPusher) {
                    if (!this.type.isSplit && !this.type.isFlyback) {
                        if (this.state.isActive || this.state.isPaused)
                            return this.goToState('ready');
                    } else if (this.type.isFlyback && !this.type.isSplit) {
                        if (this.state.isActive) return this.resetHands();
                        if (this.state.isPaused) return this.goToState('ready');
                    } else if (this.type.isSplit) {
                        if (this.state.isActive && !this.state.isSplitSet)
                            return this.goToState('setSplit');
                        if (this.state.isActive && this.state.isSplitSet)
                            return this.goToState('unsetSplit');
                    }
                }
            },
        );

        if (!this.pushers.tri) return;

        setupTriggerEvents(
            {
                activeClass: this.settings.activeClass,
                element: this.pushers.tri,
            },
            () => {
                if (this.type.isSplit) {
                    if (this.type.isFlyback) {
                        if (this.state.isActive) return this.resetHands();
                        if (this.state.isPaused) return this.goToState('ready');
                    } else {
                        if (this.state.isActive || this.state.isPaused)
                            return this.goToState('ready');
                    }
                }
            },
        );
    }

    determineChronographType() {
        if (this.options.pushers.mono && !this.options.pushers.dual && !this.options.pushers.tri) {
            this.type.isMonoPusher = true;
        }

        if (this.options.pushers.mono && this.options.pushers.dual && !this.options.pushers.tri) {
            this.type.isDualPusher = true;
        }

        if (this.options.pushers.mono && this.options.pushers.dual && this.options.pushers.tri) {
            this.type.isTriPusher = true;
        }

        if (this.options.hands.rattrapante?.seconds) {
            this.type.isSingleSplit = true;
            this.type.isSplit = true;
        }

        if (this.options.hands.rattrapante?.minutes) {
            this.type.isDoubleSplit = true;
            this.type.isSplit = true;
        }

        if (this.options.hands.rattrapante?.hours) {
            this.type.isTripleSplit = true;
            this.type.isSplit = true;
        }

        if (this.options.flyback) {
            this.type.isFlyback = true;
        }
    }

    errorChecking() {
        this.hasError = false;

        if (!this.pushers.mono) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.mono_pusher_not_found);
        }
        if (this.options.pushers.dual && !this.pushers.dual) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.dual_pusher_not_found);
        }
        if (this.options.pushers.tri && !this.pushers.tri) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.tri_pusher_not_found);
        }
        if (this.options.pushers.tri && !this.options.pushers.dual) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.incompatible_pushers);
        }
        if (this.options.hands.tenths && !this.hands.tenths) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.tenth_seconds_hand_not_found);
        }
        if (!this.hands.seconds) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.seconds_hand_not_found);
        }
        if (!this.hands.minutes) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.minutes_hand_not_found);
        }
        if (this.options.hands.hours && !this.hands.hours) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.hours_hand_not_found);
        }
        if (this.options.hands.rattrapante?.seconds && !this.hands.split?.seconds) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.split_seconds_hand_not_found);
        }
        if (this.options.hands.rattrapante?.minutes && !this.hands.split?.minutes) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.split_minutes_hand_not_found);
        }
        if (this.options.hands.rattrapante?.hours && !this.hands.split?.hours) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.split_hours_hand_not_found);
        }

        if (this.options.hands.rattrapante && !this.options.pushers.dual) {
            this.hasError = true;
            throw new Error(content.chronograph.errors.mono_pusher_cannot_support_rattrapante);
        }

        return this.hasError;
    }

    goToState(state: ChronographState) {
        switch (state) {
            case 'ready':
                this.state.isReady = true;
                this.state.isActive = false;
                this.state.isPaused = false;
                this.state.isSplitSet = false;
                this.iterationCount = 1;
                this.resetHands();
                this.stopChronograph();
                break;
            case 'active':
                this.state.isReady = false;
                this.state.isActive = true;
                this.state.isPaused = false;
                this.startChronograph();
                break;
            case 'paused':
                this.state.isReady = false;
                this.state.isActive = false;
                this.state.isPaused = true;
                this.stopChronograph();
                break;
            case 'setSplit':
                this.state.isSplitSet = true;
                break;
            case 'unsetSplit':
                if (this.hands.split?.seconds) {
                    rotate({ element: this.hands.split.seconds, value: this.rotations.seconds });
                }
                if (this.hands.split?.minutes) {
                    rotate({ element: this.hands.split.minutes, value: this.rotations.minutes });
                }
                if (this.hands.split?.hours) {
                    rotate({ element: this.hands.split.hours, value: this.rotations.hours });
                }
                this.state.isSplitSet = false;
                break;
        }
    }

    incrementHands() {
        let increment = 0;

        // SUB-SECONDS HAND
        if (this.hands.tenths) {
            increment = 360 / 600; // When 1/10th second, 60*10=600
            this.rotations.tenths += increment;
            this.rotations.tenths -= this.rotations.tenths > 360 ? 360 : 0;
            rotate({ element: this.hands.tenths, value: this.rotations.tenths });
        }

        // SECONDS HANDS - Rotates every 10 iterations
        if (this.hands.seconds && this.iterationCount % 10 === 0) {
            increment = 360 / 60; // 60 Seconds per rotation
            this.rotations.seconds += increment;
            this.rotations.seconds -= this.rotations.seconds > 360 ? 360 : 0;
            rotate({ element: this.hands.seconds, value: this.rotations.seconds });

            if (!this.state.isSplitSet && this.hands.split?.seconds) {
                rotate({ element: this.hands.split.seconds, value: this.rotations.seconds });
            }
        }

        // MINUTES HANDS - Rotates every 600 iterations (10 = 1 seconds, 600 = 1 minute)
        if (this.hands.minutes && this.iterationCount === 600) {
            increment = 360 / 60; // 60 Minutes per rotation // TODO: Support custom value here
            this.rotations.minutes += increment;
            this.rotations.minutes -= this.rotations.minutes > 360 ? 360 : 0;
            rotate({ element: this.hands.minutes, value: this.rotations.minutes });

            if (!this.state.isSplitSet && this.hands.split?.minutes) {
                rotate({ element: this.hands.split.minutes, value: this.rotations.minutes });
            }
        }

        // HOURS HANDS - Rotates every 600 iterations (10 = 1 seconds, 600 = 1 minute)
        if (this.hands.hours && this.iterationCount === 600) {
            increment = 360 / 12 / 60; // 12 hours per rotation, 60 steps per hour // TODO: Support custom value here
            this.rotations.hours += increment;
            this.rotations.hours -= this.rotations.hours > 360 ? 360 : 0;
            rotate({ element: this.hands.hours, value: this.rotations.hours });

            if (!this.state.isSplitSet && this.hands.split?.hours) {
                rotate({ element: this.hands.split.hours, value: this.rotations.hours });
            }
        }
    }

    init() {
        if (this.hasError) return;
        this.bindEvents();
    }

    resetHands() {
        if (this.hands.tenths) {
            this.rotations.tenths = 0;
            rotate({ element: this.hands.tenths, value: 0 });
        }

        if (this.hands.seconds) {
            this.rotations.seconds = 0;
            rotate({ element: this.hands.seconds, value: 0 });

            if (!this.state.isSplitSet && this.hands.split?.seconds) {
                rotate({ element: this.hands.split.seconds, value: 0 });
            }
        }

        if (this.hands.minutes) {
            this.rotations.minutes = 0;
            rotate({ element: this.hands.minutes, value: 0 });

            if (!this.state.isSplitSet && this.hands.split?.minutes) {
                rotate({ element: this.hands.split.minutes, value: 0 });
            }
        }

        if (this.hands.hours) {
            this.rotations.hours = 0;
            rotate({ element: this.hands.hours, value: 0 });

            if (!this.state.isSplitSet && this.hands.split?.hours) {
                rotate({ element: this.hands.split.hours, value: 0 });
            }
        }

        this.iterationCount = 1;
    }

    startChronograph() {
        this.interval = setInterval(() => {
            this.incrementHands();

            if (this.iterationCount === 600) {
                this.iterationCount = 1;
            } else {
                this.iterationCount++;
            }
        }, 100);
    }

    stopChronograph() {
        clearInterval(this.interval);
        this.interval = undefined;
    }
}
