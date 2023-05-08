import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Leap Year Indicator - Horologist' }];
};

export default function DocsComplicationLeapYearIndicator() {
    return <p>Leap Year Indicator</p>;
}
