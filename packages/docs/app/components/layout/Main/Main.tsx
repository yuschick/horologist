import { PropsWithChildren } from 'react';

export function Main({ children }: PropsWithChildren) {
    return <main id="main-content">{children}</main>;
}
