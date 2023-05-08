import type { PropsWithChildren } from 'react';

import styles from './NavigationSidebar.module.css';

export function NavigationSidebar({ children }: PropsWithChildren) {
    return <aside className={styles['navigation-sidebar']}>{children}</aside>;
}
