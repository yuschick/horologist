import { CSSProperties } from 'react';
import styles from './Callout.module.css';
import { CalloutProps } from './Callout.types';

export function Callout({ message, type, ...htmlAttributes }: CalloutProps) {
    return (
        <div
            className={styles['callout-wrapper']}
            style={{ '--callout-type-color': `var(--h-color-status-${type})` } as CSSProperties}
            {...htmlAttributes}
        >
            <em>{message}</em>
        </div>
    );
}
