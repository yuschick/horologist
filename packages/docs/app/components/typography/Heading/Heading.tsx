import { generateThemeStyles } from '~/utils/generateThemeStyles';
import classNames from 'classnames';

import styles from '../Text/Text.module.css';
import type { HeadingProps } from './Heading.types';
import { Link } from '~/components/navigation/Link';
import { Text } from '../Text';

export function Heading({
    appearAs,
    as: Element = appearAs || 'h1',
    isJumpToHeading,
    children,
    className,
    id,
    lines,
    truncate,
    tx,
    ...htmlAttributes
}: HeadingProps) {
    const style = tx && generateThemeStyles({ tx });

    return (
        <Element
            className={classNames(className, {
                [styles['is-jump-to-heading']]: isJumpToHeading,
                [styles['is-truncated']]: truncate,
                [styles['with-lines-limit']]: lines,
            })}
            style={{
                ...style,
                ...(lines ? { '--lines': lines } : {}),
                ...(truncate ? { '--truncate': `${truncate}ch` } : {}),
            }}
            {...htmlAttributes}
        >
            {children}
            {isJumpToHeading && (
                <Link
                    aria-hidden="true"
                    className={styles['can-be-copied-link']}
                    tabIndex={-1}
                    to={`./#${id}`}
                >
                    <Text />
                </Link>
            )}
        </Element>
    );
}
