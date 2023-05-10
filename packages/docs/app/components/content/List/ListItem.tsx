import { ListItemProps } from './List.types';

export function ListItem({ children, ...htmlAttributes }: ListItemProps) {
    return <li {...htmlAttributes}>{children}</li>;
}
