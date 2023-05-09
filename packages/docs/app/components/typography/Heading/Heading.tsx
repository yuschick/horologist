import { generateThemeStyles } from '~/utils/generateThemeStyles';
import classNames from 'classnames';

import headingStyles from './Heading.module.css';
import textStyles from '../Text/Text.module.css';
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
                [headingStyles['is-jump-to-heading']]: isJumpToHeading,
                [textStyles['is-truncated']]: truncate,
                [textStyles['with-lines-limit']]: lines,
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
                    className={headingStyles['can-be-copied-link']}
                    tabIndex={-1}
                    to={`./#${id}`}
                >
                    <Text />
                </Link>
            )}
        </Element>
    );
}
