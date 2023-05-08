import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Moonphase - Horologist' }];
};

export default function DocsComplicationMoonphase() {
    return <p>Moonphase</p>;
}
