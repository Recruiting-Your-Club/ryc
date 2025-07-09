import type { CSSObject } from '@emotion/react';

export interface RatingProps {
    value?: number;
    size?: StarSize;
    totalStars?: number;
    type?: RatingType;
    onChange?: (rating: number) => void;
    sx?: CSSObject;
}

export interface StarProps {
    filled: boolean;
    partialFill?: number;
    size: StarSize;
    sx?: CSSObject;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

type RatingType = 'click' | 'display';
export type StarSize = 'xs' | 's' | 'md' | 'lg' | 'xl';
