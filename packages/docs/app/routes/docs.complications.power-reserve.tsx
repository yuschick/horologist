import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Power Reserve - Horologist' }];
};

export default function DocsComplicationPowerReserve() {
    return <p>Power Reserve</p>;
}
