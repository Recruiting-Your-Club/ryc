import type { CSSObject } from '@emotion/react';
import React from 'react';
import { toolbarContainer } from './Editor.style';

interface ToolbarProps {
    width?: string;
    radius?: string;
    sx?: CSSObject;
}

function EditorToolbar({ width, radius, sx }: ToolbarProps) {
    return (
        <div css={[toolbarContainer(width, radius), sx]}>
            <div></div>
            <div></div>
        </div>
    );
}

export { EditorToolbar };
