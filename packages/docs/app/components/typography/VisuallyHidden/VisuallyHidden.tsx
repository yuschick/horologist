import styles from './VisuallyHidden.module.css';
import classNames from 'classnames';
import type { VisuallyHiddenProps } from './VisuallyHidden.types';

export function VisuallyHidden({
    children,
    className,
    as: Element = 'div',
    ...htmlAttributes
}: VisuallyHiddenProps) {
    return (
        <Element className={classNames(styles['visually-hidden'], className)} {...htmlAttributes}>
            {children}
        </Element>
    );
}
