import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Equation Of Time - Horologist' }];
};

export default function DocsComplicationEquationOfTime() {
    return <p>Equation Of Time</p>;
}
