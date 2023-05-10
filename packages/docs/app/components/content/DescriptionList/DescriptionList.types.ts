import { HTMLAttributes, PropsWithChildren } from 'react';

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement>, PropsWithChildren {}

export interface DescriptionListItemProps extends HTMLAttributes<HTMLDivElement> {
    description: string;
    term: string;
}
