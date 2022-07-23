import { Watch } from 'ticktock-js';

const test = new Watch({
    id: 'demo-watch',
    date: {
        ones: 'ones-disc',
        tenths: 'tens-disc',
    },
});
test.start();
