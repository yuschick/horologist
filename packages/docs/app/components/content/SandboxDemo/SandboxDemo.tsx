import { Sandpack } from '@codesandbox/sandpack-react';

export function SandboxDemo() {
    return (
        <Sandpack
            options={{
                showInlineErrors: true,
                wrapContent: true,
                editorHeight: 400,
            }}
            theme="dark"
            template="react"
        />
    );
}
