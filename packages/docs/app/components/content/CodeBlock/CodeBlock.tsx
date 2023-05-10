import styles from './CodeBlock.module.css';
import { CodeBlockProps } from './CodeBlock.types';

export function CodeBlock({ children, ...htmlAttributes }: CodeBlockProps) {
    return (
        <pre className={styles['codeblock']} {...htmlAttributes}>
            <code>{children}</code>
        </pre>
    );
}
