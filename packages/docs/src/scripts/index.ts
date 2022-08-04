import { Watch } from 'horologist';

const datograph = new Watch({
    date: {
        split: {
            ones: 'date-ones-disc',
            tenths: 'date-tenth-disc',
        },
    },
    day: {
        id: 'day-hand',
    },
    dials: [
        {
            hands: {
                hours: {
                    id: 'hour-hand',
                },
                minutes: {
                    id: 'minute-hand',
                },
            },
        },
    ],
    month: {
        id: 'month-hand',
    },
    leapYear: {
        id: 'year-disc',
    },
    moonphase: {
        id: 'moonphase-disc',
    },
    dayNight: {
        id: 'day-night-indicator-disc',
        reverse: true,
    },
    chronograph: {
        durations: {
            hours: 30,
        },
        flyback: true,
        pushers: {
            mono: 'chrono-primary',
            dual: 'chrono-secondary',
        },
        hands: {
            seconds: 'chrono-second-hand',
            minutes: 'chrono-minute-hand',
            hours: 'chrono-hours-hand',
        },
    },
    // reserve: {
    //     id: 'power-reserve-disc',
    //     range: {
    //         full: 34,
    //         empty: -50,
    //     },
    // },
});

datograph.start();
