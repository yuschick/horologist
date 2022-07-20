import { Watch } from 'ticktock-js';

const test = new Watch({
    id: 'demo-watch',
    foudroyante: { steps: 3, id: 'foudroyante-id', reverse: true },
});
test.start();
