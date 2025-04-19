import type { CSSObject } from '@emotion/react';
import React from 'react';
import { textareaContainer } from './Editor.style';

interface EditorProps {
    height?: string;
    radius?: string;
    sx?: CSSObject;
}
function EditorTextarea({ height, radius, sx }: EditorProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects

    return (
        <>
            <div
                contentEditable
                suppressContentEditableWarning
                css={[textareaContainer(height, radius), sx]}
            ></div>
        </>
    );
}

export { EditorTextarea };
