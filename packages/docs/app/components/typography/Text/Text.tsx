import { blockLevelTextElements } from '~/types/typography.types';
import { generateThemeStyles } from '~/utils/generateThemeStyles';
import classNames from 'classnames';

import styles from './Text.module.css';
import type { TextProps } from './Text.types';

export function Text({
    as: Element = 'span',
    children,
    className,
    lines,
    truncate,
    tx,
    ...htmlAttributes
}: TextProps) {
    const style = tx && generateThemeStyles({ tx });

    return (
        <Element
            {...(className || lines || truncate
                ? {
                      className: classNames(className, {
                          [styles['with-lines-limit']]: lines,
                          [styles['is-truncated']]: truncate,
                          [styles['with-display']]:
                              truncate && !blockLevelTextElements.includes(Element),
                      }),
                  }
                : undefined)}
            style={{
                ...style,
                ...(lines ? { '--lines': lines } : {}),
                ...(truncate ? { '--truncate': `${truncate}ch` } : {}),
            }}
            {...htmlAttributes}
        >
            {children}
        </Element>
    );
}
