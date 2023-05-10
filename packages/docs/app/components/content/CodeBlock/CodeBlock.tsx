import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './CodeBlock.module.css';
import { CodeBlockProps } from './CodeBlock.types';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';

SyntaxHighlighter.registerLanguage('typescript', typescript);

export function CodeBlock({ children, ...htmlAttributes }: CodeBlockProps) {
    const code = children?.toString();

    return code ? (
        <SyntaxHighlighter
            className={styles['codeblock']}
            codeTagProps={{ className: styles['code'] }}
            customStyle={{
                background: 'var(--h-color-aux-100)',
                borderRadius: 0,
                color: 'var(--h-color-aux-950)',
                fontFamily: 'var(--h-font-family-mono)',
                margin: 0,
                textAlign: 'start',
            }}
            language="typescript"
            style={darcula}
            wrapLongLines
            {...htmlAttributes}
        >
            {code}
        </SyntaxHighlighter>
    ) : null;
}
