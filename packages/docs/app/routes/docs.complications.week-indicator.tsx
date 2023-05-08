import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Week Indicator - Horologist' }];
};

export default function DocsComplicationWeekIndicator() {
    return <p>Week Indicator</p>;
}
