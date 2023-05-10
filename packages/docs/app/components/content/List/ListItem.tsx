import { Text } from '~/components/typography/Text';
import { ListItemProps } from './List.types';

export function ListItem({ children, ...htmlAttributes }: ListItemProps) {
    return (
        <li {...htmlAttributes}>
            <Text as="p">{children}</Text>
        </li>
    );
}
