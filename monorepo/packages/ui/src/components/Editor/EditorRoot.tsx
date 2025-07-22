import React, { useMemo, useRef, useState } from 'react';

import { editorListStyle, rootContainer } from './Editor.style';
import { EditorContext } from './EditorContext';
import type { RootProps } from './types';

function EditorRoot({ children, sx }: RootProps) {
    // prop destruction
    // lib hooks
    // initial values

    // state, ref, querystring hooks
    const editorRef = useRef<HTMLDivElement>(null);
    const [savedRange, setSavedRange] = useState<Range | null>(null);

    const contextValue = useMemo(
        () => ({
            editorRef,
            savedRange,
            setSavedRange,
        }),
        [savedRange],
    );

    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects

    return (
        <EditorContext.Provider value={contextValue}>
            <div css={[rootContainer, editorListStyle, sx]}>{children}</div>
        </EditorContext.Provider>
    );
}

export { EditorRoot };
