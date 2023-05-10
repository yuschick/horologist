import { ListProps } from './List.types';

import styles from './List.module.css';
import { ListItem } from './ListItem';

export function List({ as: Element = 'ul', children, ...htmlAttributes }: ListProps) {
    return (
        <Element className={styles['list-container']} {...htmlAttributes}>
            {children}
        </Element>
    );
}

List.Item = ListItem;
