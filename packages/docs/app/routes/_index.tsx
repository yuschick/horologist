import type { V2_MetaFunction } from '@remix-run/node';
import { Page } from '~/components/layout/Page';

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
    return [{ title: 'Horologist' }];
};

export default function Index() {
    return (
        <Page>
            <div />
            <p>Home page</p>
            <div />
        </Page>
    );
}
