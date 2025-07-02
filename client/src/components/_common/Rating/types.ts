import type { SerializedStyles } from '@emotion/react';

export interface RatingProps {
    value?: number;
    size?: StarSize;
    totalStars?: number;
    type?: 'click' | 'display';
    onChange?: (rating: number) => void;
    customCSS?: SerializedStyles;
}

export interface StarProps {
    filled: boolean;
    partialFill?: number;
    size: StarSize;
    customCSS?: SerializedStyles;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export type StarSize = 'xs' | 's' | 'md' | 'lg' | 'xl';
