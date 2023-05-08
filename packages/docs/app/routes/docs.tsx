import { NavLink, Outlet } from '@remix-run/react';

import { Page } from '~/components/layout/Page';
import { NavigationSidebar } from '~/components/layout/NavigationSidebar';
import { Text } from '~/components/typography/Text';

import styles from '~/styles/routes/index.module.css';

export default function Docs() {
    return (
        <Page>
            <NavigationSidebar>
                <Text
                    className={styles['navigation-heading']}
                    tx={{ color: 'brand-primary', family: 'secondary', weight: '700' }}
                >
                    Introduction
                </Text>
                <ul className={styles['navigation-list']}>
                    <li>
                        <NavLink to="/docs" end>
                            What is Horologist?
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/docs/installation">Installation</NavLink>
                    </li>
                    <li>
                        <NavLink to="/docs/getting-started">Getting Started</NavLink>
                    </li>
                </ul>
            </NavigationSidebar>
            <main>
                <Outlet />
            </main>
            <aside>sub nav</aside>
        </Page>
    );
}
