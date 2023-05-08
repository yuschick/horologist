import { NavLink, Outlet } from '@remix-run/react';

import { Page } from '~/components/layout/Page';
import { NavigationSidebar } from '~/components/layout/NavigationSidebar';
import { Text } from '~/components/typography/Text';

import styles from '~/styles/routes/index.module.css';

export default function Docs() {
    return (
        <Page>
            <NavigationSidebar>
                <nav className={styles['navigation-section']} title="Introduction">
                    <Text
                        className={styles['navigation-heading']}
                        tx={{ color: 'brand-primary', family: 'secondary', weight: '500' }}
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
                </nav>

                <nav className={styles['navigation-section']} title="Complications">
                    <Text
                        className={styles['navigation-heading']}
                        tx={{ color: 'brand-primary', family: 'secondary', weight: '500' }}
                    >
                        Complications
                    </Text>
                    <ul className={styles['navigation-list']}>
                        <li>
                            <NavLink to="complications/chronograph">Chronograph</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/date-indicator">Date Indicator</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/day-indicator">Day Indicator</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/day-night-indicator">
                                Day / Night Indicator
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/dial">Dial</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/equation-of-time">Equation of Time</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/foudroyante">Foudroyante</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/leap-year-indicator">
                                Leap Year Indicator
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/minute-repeater">Minute Repeater</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/month-indicator">Month Indicator</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/moonphase">Moonphase</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/power-reserve">Power Reserve</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/watch">Watch</NavLink>
                        </li>
                        <li>
                            <NavLink to="complications/week-indicator">Week Indicator</NavLink>
                        </li>
                    </ul>
                </nav>
            </NavigationSidebar>
            <main>
                <Outlet />
            </main>
            <aside>sub nav</aside>
        </Page>
    );
}
