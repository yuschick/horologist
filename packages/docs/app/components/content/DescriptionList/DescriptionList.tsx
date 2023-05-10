import styles from './DescriptionList.module.css';
import { DescriptionListProps } from './DescriptionList.types';
import { DescriptionTerm } from './DescriptionTerm';

export function DescriptionList({ children, ...htmlAttributes }: DescriptionListProps) {
    return (
        <dl className={styles['desc-list']} {...htmlAttributes}>
            {children}
        </dl>
    );
}

DescriptionList.Item = DescriptionTerm;
