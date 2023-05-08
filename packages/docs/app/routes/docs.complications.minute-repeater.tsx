import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Minute Repeater - Horologist' }];
};

export default function DocsComplicationMinuteRepeater() {
    return <p>Minute Repeater</p>;
}
