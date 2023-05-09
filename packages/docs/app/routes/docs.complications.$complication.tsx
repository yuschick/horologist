import type { V2_MetaFunction } from '@remix-run/node';
import { Params, useParams } from '@remix-run/react';
import { Heading } from '~/components/typography/Heading/Heading';
import { Text } from '~/components/typography/Text';
import { kebabToTitle } from '~/utils/stringUtils';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = ({ params }) => {
    const prettyTitle = kebabToTitle(params.complication || '');
    return [{ title: `${prettyTitle} - Horologist` }];
};

export default function DocsComplications() {
    const { complication = '' } = useParams();
    const prettyHeading = kebabToTitle(complication);

    return (
        <>
            <Heading>{prettyHeading}</Heading>
            <Text as="p">
                An analog watch containing a stopwatch function. Dedicated hand can be started,
                stopped and reset via pushers on the case, with varying amounts of separate
                sub-dials to measure additional minutes and hours. Complex chronographs can time
                multiple events simultaneously.
            </Text>
        </>
    );
}
