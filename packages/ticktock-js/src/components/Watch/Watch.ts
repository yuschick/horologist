import * as Types from './Watch.types';

/*
    The top-level Watch class which manages timeouts, complications
    and event triggers for any child components.
*/
export class Watch implements Types.WatchClass {
    name?: string;

    constructor(options: Types.WatchOptions) {
        this.name = options.name;
    }

    start() {
        console.log(`Init ${this.name}`);
    }
}
