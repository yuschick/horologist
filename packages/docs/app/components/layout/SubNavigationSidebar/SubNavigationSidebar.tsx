import type { PropsWithChildren } from 'react';

import styles from './SubNavigationSidebar.module.css';

export function SubNavigationSidebar({ children }: PropsWithChildren) {
    return <aside className={styles['sub-navigation-sidebar']}>{children}</aside>;
}
