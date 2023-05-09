import { VisuallyHidden } from '~/components/typography/VisuallyHidden';
import { Link } from '../Link';

import styles from './SkipLink.module.css';

export function SkipLink() {
    return (
        <VisuallyHidden className={styles['skip-link']}>
            <Link to="#main-content">Skip to main content</Link>
        </VisuallyHidden>
    );
}
