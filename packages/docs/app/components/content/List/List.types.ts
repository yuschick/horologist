import { HTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import { As } from '~/types/utils.types';

export interface ListProps
    extends HTMLAttributes<HTMLUListElement | HTMLOListElement>,
        As<'ol' | 'ul'>,
        PropsWithChildren {}

export interface ListItemProps extends HTMLAttributes<HTMLLIElement>, PropsWithChildren {}
