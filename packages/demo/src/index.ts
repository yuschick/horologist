import { Watch } from 'ticktock-js';

const test = new Watch({
    id: 'demo-watch',
    settings: {
        activeClass: 'booger',
    },
    repeater: {
        id: 'repeater-id',
        onPlay: () => console.log('PLAY'),
        onStop: () => console.log('STOP'),
        onEnd: () => console.log('END'),
    },
});
test.start();
