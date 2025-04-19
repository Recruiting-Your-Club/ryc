import React from 'react';
import { EditorRoot } from './EditorRoot';
import { EditorTextarea } from './EditorTextarea';
import { EditorToolbar } from './EditorToolbar';

function BaseEditor() {
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
            <EditorRoot>
                <EditorToolbar />
                <EditorTextarea />
            </EditorRoot>
        </>
    );
}

const Editor = Object.assign(BaseEditor, {
    Root: EditorRoot,
    Toolbar: EditorToolbar,
    Textarea: EditorTextarea,
});

export { Editor };
