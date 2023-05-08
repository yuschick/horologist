import { NavLink } from '@remix-run/react';
import styles from '../Page.module.css';
import { Link } from '~/components/navigation/Link';

export function PageNavigation() {
    return (
        <nav title="Main navigation">
            <ul className={styles['page-navigation']} title="Introduction navigation">
                <li>
                    <NavLink to="/docs" data-text="Docs">
                        Docs
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/showcase" data-text="Showcase">
                        Showcase
                    </NavLink>
                </li>
                <li>
                    <Link to="https://github.com/yuschick/horologist" data-text="GitHub">
                        GitHub
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
