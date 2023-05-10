import { HTMLAttributes, PropsWithChildren } from 'react';

export interface CodeBlockProps
    extends Omit<HTMLAttributes<HTMLPreElement>, 'style'>,
        PropsWithChildren {}
