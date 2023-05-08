import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Day Indicator - Horologist' }];
};

export default function DocsComplicationDayIndicator() {
    return <p>Day Indicator</p>;
}
