import type { CSSObject } from '@emotion/react';
import type { TextareaHTMLAttributes } from 'react';
import React from 'react';
import { textareaContainer } from './Editor.style';

interface EditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    width?: string;
    height?: string;
    radius?: string;
    sx?: CSSObject;
}
function EditorTextarea({ width, height, radius, sx, ...props }: EditorProps) {
    return (
        <>
            <textarea css={[textareaContainer(width, height, radius), sx]} {...props}></textarea>
        </>
    );
}

export { EditorTextarea };
