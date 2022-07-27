import { Watch } from 'ticktock-js';

const test = new Watch({
    id: 'demo-watch',
    dials: [
        {
            hands: {
                seconds: {
                    id: 'tenths-hand',
                },
                minutes: {
                    id: 'minutes-hand',
                },
                hours: {
                    id: 'hours-hand',
                },
            },
        },
    ],
});

test.start();
