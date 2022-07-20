import * as Types from './Watch.types';

/*
    The top-level Watch class which manages timeouts, complications
    and event triggers for any child components.
*/
export class Watch implements Types.WatchClass {
    id?: string;
    settings: Types.WatchSettings;

    constructor(options: Types.WatchOptions) {
        this.id = options.id;
        this.settings = {};
    }

    pauseInterval() {
        clearInterval(this.settings.interval);
    }

    startInterval() {
        this.settings.interval = setInterval(() => {
            this.settings.now = Date.now();
        }, 1000);
    }

    start() {
        console.log(`Init ${this.id}`);
    }
}
