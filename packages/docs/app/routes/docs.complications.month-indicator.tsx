import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Month Indicator - Horologist' }];
};

export default function DocsComplicationMonthIndicator() {
    return <p>Month Indicator</p>;
}
