import type { PropsWithChildren } from 'react';

import styles from './Page.module.css';
import { PageHeader } from './PageHeader/PageHeader';

export function Page({ children }: PropsWithChildren) {
    return (
        <div className={styles['page-wrapper']}>
            <PageHeader />
            {children}
        </div>
    );
}
