import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';
import React from 'react';
import { rootContainer } from './Editor.style';

interface RootProps {
    children?: ReactNode;
    sx?: CSSObject;
}

function EditorRoot({ children, sx }: RootProps) {
    return <div css={[rootContainer, sx]}>{children}</div>;
}

export { EditorRoot };
