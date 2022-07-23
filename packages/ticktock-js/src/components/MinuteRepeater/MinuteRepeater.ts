import content from '../../content';
import { setupTriggerEvents } from '../../utils';
import { WatchSettings } from '../Watch';
// Audio files from www.freesound.org
import ChimesHour from '../../assets/sounds/chime-hour.mp4';
import ChimesMinute from '../../assets/sounds/chime-minute.mp4';
import {
    MinuteRepeaterChimeCounts,
    MinuteRepeaterChimes,
    MinuteRepeaterClass,
    MinuteRepeaterOptions,
} from './MinuteRepeater.types';
import { getHours, getMinutes } from 'date-fns';

export class MinuteRepeater implements MinuteRepeaterClass {
    chimes: MinuteRepeaterChimes;
    element: HTMLElement | null;
    hasError: boolean;
    isPlaying: boolean;
    isPlayingQuarters: boolean;
    options: MinuteRepeaterOptions;
    now: Date;
    settings: WatchSettings;

    constructor(options: MinuteRepeaterOptions, settings: WatchSettings) {
        this.chimes = {
            audio: {
                hour: options.chimes?.hour || ChimesHour,
                minute: options.chimes?.minute || ChimesMinute,
            },
            counter: 1,
            counts: {
                hour: 0,
                minute: 0,
                quarter: 0,
            },
            durations: {
                minute: 0,
            },
            elements: {
                hour: document.createElement('audio'),
                minute: document.createElement('audio'),
            },
        };
        this.element = document.getElementById(options.id);
        this.isPlaying = false;
        this.isPlayingQuarters = false;
        this.options = options;
        this.now = settings.now;
        this.settings = settings;

        this.hasError = false;
        this.errorChecking();
    }

    /*
     * Setup all event listeners for the repeater trigger
     * and the audio elements
     */
    bindEvents() {
        // Can cast this.element here since the error checking passed
        setupTriggerEvents(
            { activeClass: this.settings.activeClass, element: this.element as HTMLElement },
            () => {
                if (this.isPlaying) {
                    this.stopAndResetAllAudio();
                    this.options.onStop?.();
                } else {
                    this.isPlaying = true;
                    this.getChimeCounts();
                    this.playChimes();
                    this.options.onPlay?.();
                }
            },
        );

        /*
         * Store the duration of each audio file to define the interval
         * duration when playing each element.
         */
        this.chimes.elements.minute.addEventListener(
            'loadedmetadata',
            () => (this.chimes.durations.minute = this.chimes.elements.minute.duration || 0),
            false,
        );

        this.chimes.elements.hour.addEventListener('ended', () => {
            this.isPlayingQuarters ? this.playQuarterHours() : this.playHours();
        });

        this.chimes.elements.minute.addEventListener('ended', () => {
            !this.isPlayingQuarters && this.playMinutes();
        });
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
            throw new Error(content.minute_repeater.errors.element_not_found);
        }
        return this.hasError;
    }

    /*
     * From this.now, determine the amount of chimes for
     * each audio element to play.
     */
    getChimeCounts() {
        const totalHours = getHours(this.now);
        const hours = totalHours >= 12 ? totalHours - 12 : totalHours;
        const totalMinutes = getMinutes(this.now);
        const quarters = Math.floor(totalMinutes / 15);
        const minutes = totalMinutes % 15;

        const counts: MinuteRepeaterChimeCounts = {
            hour: hours,
            quarter: quarters,
            minute: minutes,
        };

        this.chimes.counts = counts;
        return counts;
    }

    /*
     * If no errors are thrown, start the complication
     */
    init() {
        if (this.hasError) return;

        this.setupAudioElements();
        this.bindEvents();
    }

    /*
     * The entry point for playing the chimes
     */
    playChimes() {
        this.playHours();
    }

    /*
     * For every chimes.counts.hour, play the hour audio element.
     * Each play increments the class counter to determine when
     * the next audio element is to be played.
     */
    playHours() {
        if (this.chimes.counter <= this.chimes.counts.hour) {
            this.chimes.elements.hour.play();
            this.chimes.counter++;
        } else {
            this.isPlayingQuarters = true;
            this.chimes.counter = 1;
            setTimeout(
                () => {
                    this.playQuarterHours();
                },
                this.chimes.counts.quarter ? 500 : 1,
            );
        }
    }

    /*
     * For every chimes.counts.minute, play the minute audio element.
     * Each play increments the class counter to determine when
     * the next audio element is to be played.
     */
    playMinutes() {
        if (this.chimes.counter <= this.chimes.counts.minute) {
            this.chimes.elements.minute.play();
            this.chimes.counter++;
        } else {
            this.stopAndResetAllAudio();
            this.options.onEnd?.();
        }
    }

    /*
     * For every chimes.counts.quarter, play the minute and hour audio elements.
     * Each play increments the class counter to determine when
     * the next audio element is to be played.
     */
    playQuarterHours() {
        if (this.chimes.counter <= this.chimes.counts.quarter) {
            /*
             * First, play the minute chime. Cut its duration in half
             * and then play the hour chime for a dual effect
             */
            this.chimes.elements.minute.play();

            setTimeout(() => {
                this.chimes.elements.hour.play();
            }, Math.round(this.chimes.durations.minute * 1000) / 2);

            this.chimes.counter++;
        } else {
            this.isPlayingQuarters = false;
            this.chimes.counter = 1;
            setTimeout(() => {
                this.playMinutes();
            }, 500);
        }
    }

    /*
     * Create the required audio elements and attach them to the DOM
     */
    setupAudioElements() {
        this.chimes.elements.hour.src = this.chimes.audio.hour;
        document.body.appendChild(this.chimes.elements.hour);

        this.chimes.elements.minute.src = this.chimes.audio.minute;
        document.body.appendChild(this.chimes.elements.minute);
    }

    /*
     * Stop and reset all audio elements
     */
    stopAndResetAllAudio() {
        this.isPlaying = false;
        this.chimes.counter = 1;
        this.chimes.elements.hour.pause();
        this.chimes.elements.hour.currentTime = 0;
        this.chimes.elements.minute.pause();
        this.chimes.elements.minute.currentTime = 0;
    }
}
