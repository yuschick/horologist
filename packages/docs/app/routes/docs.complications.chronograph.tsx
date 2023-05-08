import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Chronograph - Horologist' }];
};

export default function DocsComplicationChronograph() {
    return <p>Chronograph</p>;
}
