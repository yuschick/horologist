import type { HTMLAttributes, PropsWithChildren } from 'react';

import type { TextElement } from '~/types/typography.types';
import type { As } from '~/types/utils.types';
import type { TX } from '~/types/theme/tx.types';

interface TextPropsBase
    extends PropsWithChildren,
        Omit<HTMLAttributes<Element>, 'style'>,
        As<TextElement>,
        TX {}

/* Styles for `truncate` and `lines` conflict, so the features cannot be used simultaneously.  */
interface TextPropsWithTruncate extends TextPropsBase {
    lines?: never;
    truncate?: number;
}

interface TextPropsWithLines extends TextPropsBase {
    lines?: number;
    truncate?: never;
}

export type TextProps = TextPropsWithTruncate | TextPropsWithLines;
