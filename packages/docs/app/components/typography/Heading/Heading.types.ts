import type { HTMLAttributes, PropsWithChildren } from 'react';

import type { HeadingElement } from '~/types/typography.types';
import type { As } from '~/types/utils.types';
import type { TX } from '~/types/theme/tx.types';

interface HeadingPropsBase
    extends PropsWithChildren,
        Omit<HTMLAttributes<HTMLHeadingElement>, 'style'>,
        As<HeadingElement>,
        TX {
    appearAs?: HeadingElement;
    isJumpToHeading?: boolean;
}

/* Styles for `truncate` and `lines` conflict, so the features cannot be used simultaneously.  */
interface HeadingPropsWithTruncate extends HeadingPropsBase {
    lines?: never;
    truncate?: number;
}

interface HeadingPropsWithLines extends HeadingPropsBase {
    lines?: number;
    truncate?: never;
}

export type HeadingProps = HeadingPropsWithTruncate | HeadingPropsWithLines;
