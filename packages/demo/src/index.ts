import { Watch } from 'ticktock-js';

const test = new Watch({
    id: 'demo-watch',
    chronograph: {
        dialDurations: {
            subSeconds: 10,
            seconds: 30,
            minutes: 10,
            hours: 1,
        },
        hands: {
            subSeconds: 'tenths-hand',
            seconds: 'seconds-hand',
            minutes: 'minutes-hand',
            hours: 'hours-hand',
            rattrapante: {
                seconds: 'split-seconds-hand',
                minutes: 'split-minutes-hand',
                hours: 'split-hours-hand',
            },
        },
        pushers: {
            mono: 'mono-pusher',
            dual: 'dual-pusher',
        },
        flyback: true,
    },
});

test.start();
