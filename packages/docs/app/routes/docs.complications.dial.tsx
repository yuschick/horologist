import type { V2_MetaFunction } from '@remix-run/node';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [
        { title: 'Dial - Horologist' },
        {
            description:
                "Horologist is a JavaScript library for animating DOM elements to represent time in the same ways as many of the world's greatest haute horologist watchmakers",
        },
    ];
};

export default function DocsComplicationDial() {
    return <p>Dial</p>;
}