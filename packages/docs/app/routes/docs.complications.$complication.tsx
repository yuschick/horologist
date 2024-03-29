import type { V2_MetaFunction } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import { CodeBlock } from '~/components/content/CodeBlock';
import { Table } from '~/components/content/Table';
import { Callout } from '~/components/feedback/Callout';
import { Heading } from '~/components/typography/Heading';
import { Text } from '~/components/typography/Text';
import { kebabToTitle } from '~/utils/stringUtils';

import styles from '~/styles/routes/docs.module.css';
import { List } from '~/components/content/List';
import { DescriptionList } from '~/components/content/DescriptionList';
import { SandboxDemo } from '~/components/content/SandboxDemo';

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
            <section className={styles['content-section']}>
                <Heading>{prettyHeading}</Heading>
                <Text as="p">
                    A date indicator is a watch function that displays the current date of the
                    month. It can come in various forms, such as a small window or a sub-dial. The
                    most common is a simple aperture located at the 3 o'clock or 6 o'clock position.
                    Other forms include retrograde displays or perpetual calendars.
                </Text>
            </section>

            <section className={styles['content-section']}>
                <Heading as="h2" id="demo" isJumpToHeading>
                    Demo
                </Heading>
                <SandboxDemo />
            </section>

            <section className={styles['content-section']}>
                <Heading as="h2" id="how-it-works" isJumpToHeading>
                    How It Works
                </Heading>
                <Text as="p">
                    There are three display types when creating a Date Indicator complication. Each
                    type functions differently.
                </Text>
                <DescriptionList>
                    <DescriptionList.Item
                        description="When dates 1-31 are shown on a single disc or with a single hand."
                        term="Standard Displays"
                    />
                    <DescriptionList.Item
                        description="When dates 1-31 are shown in a single semi-circle, often 180 or 90 degrees and indicated with a single hand or disc."
                        term="Retrograde Displays"
                    />
                    <DescriptionList.Item
                        description="When the date is displayed in two pieces, a ones (0-9) indicator and tenths (0-3) indicator, both rotated independently to form the full date value."
                        term="Split Displays"
                    />
                </DescriptionList>
            </section>

            <section className={styles['content-section']}>
                <Heading as="h2" id="design-considerations" isJumpToHeading>
                    Design Considerations
                </Heading>
                <Text as="p">
                    When designing a Date Indicator display to work with Horologist, there are a few
                    considerations to keep in mind.
                </Text>

                <List as="ol">
                    <List.Item>
                        When dealing with a 360 display, whether a hand or a disc, the indicator
                        must be positioned at 1, the first date of the month.
                    </List.Item>
                    <List.Item>
                        When working with retrograde displays, the indicator must be positioned at
                        1, the first day of the month. The max retrograde rotation is the rotation
                        value needed to move the indicator to 31, the last date of the month.
                    </List.Item>
                    <List.Item>
                        When designing a split display, the starting position for both discs must be
                        00. The ones disc must contain values 0-9 and the tenths disc must contain
                        values 0-3 evenly spaced around 360 degrees.
                    </List.Item>
                    <List.Item>
                        Horologist does not assign any transition-origin properties. These must be
                        defined manually.
                    </List.Item>
                </List>
            </section>

            <section className={styles['content-section']}>
                <Heading as="h2" id="settings" isJumpToHeading>
                    Settings
                </Heading>
                <CodeBlock>
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
                </CodeBlock>
            </section>

            <section className={styles['content-section']}>
                <Heading as="h3" id="settings-id" isJumpToHeading>
                    <code>id</code>
                </Heading>
                <Callout
                    message="* An id prop is not compatible with split displays."
                    type="alert"
                />
                <Text as="p">The id of the date indicator DOM element.</Text>

                <Table
                    caption="Details for the id setting"
                    columns={[
                        { dataKey: 'prop', heading: 'Prop', tx: { family: 'mono' } },
                        { dataKey: 'required', heading: 'Required' },
                        { dataKey: 'type', heading: 'Type' },
                        { dataKey: 'default', heading: 'Default' },
                        { dataKey: 'values', heading: 'Value(s)' },
                    ]}
                    data={[
                        {
                            prop: 'id',
                            required: 'True *',
                            type: 'String',
                            default: '-',
                            values: 'DOM element ID',
                        },
                    ]}
                />
            </section>

            <section className={styles['content-section']}>
                <Heading as="h3" id="settings-retrograde" isJumpToHeading>
                    <code>retrograde</code>
                </Heading>
                <Callout
                    message="* A retrograde prop is not compatible with split displays."
                    type="alert"
                />
                <Text as="p">The id of the retrograde indicator DOM element.</Text>

                <Table
                    caption="Details for the retrograde setting"
                    columns={[
                        { dataKey: 'prop', heading: 'Prop', tx: { family: 'mono' } },
                        { dataKey: 'required', heading: 'Required' },
                        { dataKey: 'type', heading: 'Type' },
                        { dataKey: 'default', heading: 'Default' },
                        { dataKey: 'values', heading: 'Value(s)' },
                    ]}
                    data={[
                        {
                            prop: 'retrograde',
                            required: 'True *',
                            type: 'Object',
                            default: '-',
                            values: '-',
                        },
                        {
                            prop: 'retrograde.max',
                            required: 'True',
                            type: 'Number',
                            default: '-',
                            values: 'The maximum rotation in degrees to reach the final date of the display. Often 90 or 180.',
                        },
                    ]}
                />
            </section>

            <section className={styles['content-section']}>
                <Heading as="h3" id="settings-reverse" isJumpToHeading>
                    <code>reverse</code>
                </Heading>
                <Text as="p">
                    By default, Horologist will rotate elements in a clockwise direction. Use the
                    reverse prop to rotate the elements counter-clockwise.
                </Text>

                <Table
                    caption="Details for the reverse setting"
                    columns={[
                        { dataKey: 'prop', heading: 'Prop', tx: { family: 'mono' } },
                        { dataKey: 'required', heading: 'Required' },
                        { dataKey: 'type', heading: 'Type' },
                        { dataKey: 'default', heading: 'Default' },
                        { dataKey: 'values', heading: 'Value(s)' },
                    ]}
                    data={[
                        {
                            prop: 'reverse',
                            required: 'False',
                            type: 'Boolean',
                            default: '-',
                            values: 'True / False',
                        },
                    ]}
                />
            </section>

            <section className={styles['content-section']}>
                <Heading as="h3" id="settings-split" isJumpToHeading>
                    <code>split</code>
                </Heading>
                <Callout
                    message="* The split prop is not compatible with the id or retrograde props."
                    type="alert"
                />
                <Text as="p">
                    A split display is when two discs, a ones and tenths disc, rotate independently
                    to display the date. Often seen as a big date display. The ones disc will
                    contain values 0-9 while the tenths disc would display 0-3.
                </Text>

                <Table
                    caption="Details for the split setting"
                    columns={[
                        { dataKey: 'prop', heading: 'Prop', tx: { family: 'mono' } },
                        { dataKey: 'required', heading: 'Required' },
                        { dataKey: 'type', heading: 'Type' },
                        { dataKey: 'default', heading: 'Default' },
                        { dataKey: 'values', heading: 'Value(s)' },
                    ]}
                    data={[
                        {
                            prop: 'split',
                            required: 'True *',
                            type: 'Object',
                            default: '-',
                            values: '-',
                        },
                        {
                            prop: 'split.ones',
                            required: 'True',
                            type: 'String',
                            default: '-',
                            values: 'DOM element ID',
                        },
                        {
                            prop: 'split.tenths',
                            required: 'True',
                            type: 'String',
                            default: '-',
                            values: 'DOM element ID',
                        },
                    ]}
                />
            </section>
        </>
    );
}
