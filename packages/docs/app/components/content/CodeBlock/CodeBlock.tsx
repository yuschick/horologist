import { PropsWithChildren } from 'react';

import styles from './CodeBlock.module.css';

export function CodeBlock({ children }: PropsWithChildren) {
    return (
        <pre className={styles['codeblock']}>
            <code>{children}</code>
        </pre>
    );
}
