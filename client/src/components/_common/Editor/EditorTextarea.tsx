import React from 'react';
import { textareaContainer } from './Editor.style';
import type { EditorProps } from './types';

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
