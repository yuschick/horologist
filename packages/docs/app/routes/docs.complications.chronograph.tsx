import type { V2_MetaFunction } from '@remix-run/node';
import { Heading } from '~/components/typography/Heading/Heading';
import { Text } from '~/components/typography/Text';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Chronograph - Horologist' }];
};

export default function DocsComplicationChronograph() {
    return (
        <>
            <Heading>Chronograph</Heading>
            <Text as="p">
                An analog watch containing a stopwatch function. Dedicated hand can be started,
                stopped and reset via pushers on the case, with varying amounts of separate
                sub-dials to measure additional minutes and hours. Complex chronographs can time
                multiple events simultaneously.
            </Text>
        </>
    );
}
