import { Text } from '~/components/typography/Text';
import { DescriptionListItemProps } from './DescriptionList.types';

export function DescriptionTerm({
    description,
    term,
    ...htmlAttributes
}: DescriptionListItemProps) {
    return (
        <div {...htmlAttributes}>
            <Text as="dt" tx={{ size: '1', weight: '500' }}>
                {term}
            </Text>
            <Text as="dd">{description}</Text>
        </div>
    );
}
