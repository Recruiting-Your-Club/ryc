import type { CSSObject } from '@emotion/react';
import type { ReactNode} from 'react';
import React, { useMemo, useState } from 'react';
import { rootContainer } from './Editor.style';
import { EditorContext } from './EditorContext';
import type { Align, Format } from './EditorToolbar';

interface RootProps {
    children?: ReactNode;
    sx?: CSSObject;
}

function EditorRoot({ children, sx }: RootProps) {
    const [formats, setFormats] = useState<Record<Format, boolean>>({
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
    });
    const [align, setAlign] = useState<Align>('left');

    const contextValue = useMemo(
        () => ({
            formats,
            setFormats,
            align,
            setAlign,
        }),
        [formats, align],
    );

    return (
        <EditorContext.Provider value={contextValue}>
            <div css={[rootContainer, sx]}>{children}</div>
        </EditorContext.Provider>
    );
}

export { EditorRoot };
