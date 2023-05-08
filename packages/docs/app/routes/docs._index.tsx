import type { V2_MetaFunction } from '@remix-run/node';
import { Heading } from '~/components/typography/Heading/Heading';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'About - Horologist' }];
};

export default function DocsAboutHorologist() {
    return <Heading>What is Horologist?</Heading>;
}
