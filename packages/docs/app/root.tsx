import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import globalResetsUrl from 'the-new-css-reset/css/reset.css';
import globalStylesUrl from '~/styles/global.css';

export const links: LinksFunction = () => {
    return [
        { rel: 'icon', href: '/images/icon-horologist-100.svg' },
        { rel: 'stylesheet', href: globalResetsUrl },
        { rel: 'stylesheet', href: globalStylesUrl },
        ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    ];
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta
                    name="description"
                    content="Horologist is a JavaScript library for animating DOM elements to represent time in the same ways as many of the world's greatest haute horologist watchmakers"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
