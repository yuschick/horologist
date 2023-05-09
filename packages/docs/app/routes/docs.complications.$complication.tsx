import type { V2_MetaFunction } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import { Callout } from '~/components/feedback/Callout';
import { Heading } from '~/components/typography/Heading';
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
                A date complication is common in the world of watchmaking, but comes in several
                different variations, such as single displays, split displays, and retrograde
                indicators.
            </Text>

            <Heading as="h2" id="demo" isJumpToHeading>
                Demo
            </Heading>
            <Text>Demo code sandbox</Text>

            <Heading as="h2" id="how-it-works" isJumpToHeading>
                How It Works
            </Heading>
            <Text as="p">
                There are three display types when creating a Date Indicator complication. Each type
                functions differently.
            </Text>
            <ul>
                <li>
                    <Heading as="h3">Standard Displays</Heading>
                    <Text>When dates 1-31 are shown on a single disc or with a single hand.</Text>
                </li>
                <li>
                    <Heading as="h3">Retrograde Displays</Heading>
                    <Text>
                        When dates 1-31 are shown in a single semi-circle, often 180 or 90 degrees
                        and indicated with a single hand or disc.
                    </Text>
                </li>
                <li>
                    <Heading as="h3">Split Displays</Heading>
                    <Text>
                        When the date is displayed in two pieces, a ones (0-9) indicator and tenths
                        (0-3) indicator, both rotated independently to form the full date value.
                    </Text>
                </li>
            </ul>

            <Heading as="h2" id="design-considerations" isJumpToHeading>
                Design Considerations
            </Heading>
            <Text>
                When designing a Date Indicator display to work with Horologist, there are a few
                considerations to keep in mind.
            </Text>

            <ol>
                <li>
                    When dealing with a 360 display, whether a hand or a disc, the indicator must be
                    positioned at 1, the first date of the month.
                </li>
                <li>
                    When working with retrograde displays, the indicator must be positioned at 1,
                    the first day of the month. The max retrograde rotation is the rotation value
                    needed to move the indicator to 31, the last date of the month.
                </li>
                <li>
                    When designing a split display, the starting position for both discs must be 00.
                    The ones disc must contain values 0-9 and the tenths disc must contain values
                    0-3 evenly spaced around 360 degrees.
                </li>
                <li>
                    Horologist does not assign any transition-origin properties. These must be
                    defined manually.
                </li>
            </ol>

            <Heading as="h2" id="settings" isJumpToHeading>
                Settings
            </Heading>
            <code>
                <pre>
                    {`date: {
    id: string;
    retrograde?: {
        max: number;
    };
    reverse?: boolean;
    split?: {
        ones: string;
        tenths: string;
    };
}`}
                </pre>
            </code>

            <Heading as="h3" id="settings-id" isJumpToHeading>
                <code>id</code>
            </Heading>
            <Callout message="* An id prop is not compatible with split displays." type="alert" />
            <Text as="p">The id of the date indicator DOM element.</Text>

            <Heading as="h3" id="settings-retrograde" isJumpToHeading>
                <code>retrograde</code>
            </Heading>
            <Callout
                message="* A retrograde prop is not compatible with split displays."
                type="alert"
            />
            <Text as="p">The id of the retrograde indicator DOM element.</Text>

            <Heading as="h3" id="settings-reverse" isJumpToHeading>
                <code>reverse</code>
            </Heading>
            <Text as="p">
                By default, Horologist will rotate elements in a clockwise direction. Use the
                reverse prop to rotate the elements counter-clockwise.
            </Text>

            <Heading as="h3" id="settings-split" isJumpToHeading>
                <code>split</code>
            </Heading>
            <Callout
                message="* The split prop is not compatible with the id or retrograde props."
                type="alert"
            />
            <Text as="p">
                A split display is when two discs, a ones and tenths disc, rotate independently to
                display the date. Often seen as a big date display. The ones disc will contain
                values 0-9 while the tenths disc would display 0-3.
            </Text>
        </>
    );
}
