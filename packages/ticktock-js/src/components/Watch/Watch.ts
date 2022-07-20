import { Foudroyante } from '../Foudroyante';
import { YearIndicator } from '../YearIndicator';
import * as Types from './Watch.types';

/*
    The top-level Watch class which manages timeouts, complications
    and event triggers for any child components.
*/
export class Watch implements Types.WatchClass {
    foudroyante?: Foudroyante;
    id?: string;
    settings: Types.WatchSettings;
    year?: YearIndicator;

    constructor(options: Types.WatchOptions) {
        this.id = options.id;
        this.settings = {
            now: new Date(),
        };

        this.foudroyante = options.foudroyante && new Foudroyante(options.foudroyante);
        this.year = options.year && new YearIndicator(options.year, this.settings);
    }

    clearInterval() {
        clearInterval(this.settings.interval);

        // Complications that rely on an interval also are cleared
        // TODO: If foudroyante isn't tied to a chronograph, clearInterval();
        this.foudroyante?.clearInterval();
    }

    startInterval() {
        this.settings.interval = setInterval(() => {
            this.settings.now = new Date();
        }, 1000);
    }

    start() {
        this.startInterval();

        // TODO: If the foudroyante isn't tied to a chronograph, init()
        this.foudroyante?.init();
        this.year?.init();
    }
}
