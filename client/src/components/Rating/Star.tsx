import React from 'react';
import type { SerializedStyles } from '@emotion/react';
import { s_size, s_star } from './Rating.style';

export type StarSize = 'xs' | 's' | 'md' | 'lg' | 'xl';

interface StarProps {
    filled: boolean;
    partialFill?: number; //0~1 사이 값
    size: StarSize;
    customCSS?: SerializedStyles;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export function Star({ filled, partialFill, size, customCSS, onClick, onMouseEnter, onMouseLeave }: StarProps) {
    const cssProp = [s_size(size), s_star(filled)];

    return <div css={[cssProp, customCSS]}></div>;
}
