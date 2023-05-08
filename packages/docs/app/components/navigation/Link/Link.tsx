import type { PropsWithChildren } from 'react';
import { Link as RemixLink } from '@remix-run/react';
import type { LinkProps } from '@remix-run/react';
import { VisuallyHidden } from '~/components/typography/VisuallyHidden';

export function Link({ children, to, prefetch, ...linkProps }: PropsWithChildren<LinkProps>) {
    const href = to.toString();
    const isExternalLink = href.startsWith('http');

    return isExternalLink ? (
        <a href={href} rel="noopener noreferrer" target="_blank" {...linkProps}>
            {children}
            <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
        </a>
    ) : (
        <RemixLink prefetch={prefetch} to={to} {...linkProps}>
            {children}
        </RemixLink>
    );
}
