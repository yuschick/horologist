import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Getting Started - Horologist' }];
};

export default function DocsGettingStarted() {
    return <p>Getting Started Horologist</p>;
}
