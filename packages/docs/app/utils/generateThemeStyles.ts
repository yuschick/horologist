import type { CSSProperties } from 'react';
import type { SpaceOptions } from '~/types/theme/space.types';
import type { Space } from '~/types/theme/theme.types';
import type { TX } from '~/types/theme/tx.types';

function mapSpaceValueToStyle(
    value?: Space | [Space, Space] | [Space, Space?, Space?, Space?],
): string | undefined {
    if (!value) return;

    return Array.isArray(value)
        ? value.map((val) => (val === 'auto' ? val : `var(--h-space-base-${val})`)).join(' ')
        : value === 'auto'
        ? value
        : `var(--h-space-base-${value})`;
}

function generateSpacingStyles(spacing: SpaceOptions, type: 'margin' | 'padding'): CSSProperties {
    const formattedStyles = {
        [type]: mapSpaceValueToStyle(spacing.all),
        [`${type}Block`]: mapSpaceValueToStyle(spacing.block),
        [`${type}BlockEnd`]: mapSpaceValueToStyle(spacing.blockEnd),
        [`${type}BlockStart`]: mapSpaceValueToStyle(spacing.blockStart),
        [`${type}Inline`]: mapSpaceValueToStyle(spacing.inline),
        [`${type}InlineEnd`]: mapSpaceValueToStyle(spacing.blockEnd),
        [`${type}InlineStart`]: mapSpaceValueToStyle(spacing.blockStart),
    };

    return formattedStyles;
}

/*
    The core of the styling system. Pass in a TX object and it will return a CSSProperties object
    mapped to the theme's custom properties.
*/
export function generateThemeStyles({ tx }: TX): CSSProperties {
    return {
        color: tx?.color ? `var(--h-color-${tx.color})` : undefined,
        fontFamily: tx?.family ? `var(--h-font-family-${tx.family})` : undefined,
        fontSize: tx?.size ? `var(--h-font-size-${tx.size})` : undefined,
        fontWeight: tx?.weight ? `var(--h-font-weight-${tx.weight})` : undefined,
        ...(tx?.margin && generateSpacingStyles(tx.margin, 'margin')),
        ...(tx?.padding && generateSpacingStyles(tx.padding, 'padding')),
    };
}
