import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

import theme from '@ssoc/styles';

import type { RatingType, StarSize } from './types';

interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
}

export const starSize: Record<StarSize, Size> = {
    xs: {
        width: '1rem',
        height: '1rem',
    },
    s: {
        width: '1.5rem',
        height: '1.5rem',
    },
    md: {
        width: '2rem',
        height: '2rem',
    },
    lg: {
        width: '2.5rem',
        height: '2.5rem',
    },
    xl: {
        width: '3rem',
        height: '3rem',
    },
};

export const s_size = (size: StarSize) => {
    return css`
        width: ${starSize[size].width};
        height: ${starSize[size].height};
    `;
};

export const s_star = (filled: boolean, type: RatingType) => {
    return css`
        cursor: pointer;
        position: relative;
        background: none;
        border: none;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        ${type === 'display' &&
        css`
            cursor: default;
        `}

        ${type === 'click' &&
        css`
            transition: transform 0.2s ease;

            &:hover {
                transform: scale(1.2);
            }
        `}

        & > svg {
            width: 100%;
            height: 100%;
            fill: ${filled ? theme.colors.default : theme.colors.disabled};
            transition: fill 0.2s ease;
        }
    `;
};

export const s_halfStar = (percentage: number) => {
    return css`
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;

        & > svg {
            fill: ${theme.colors.default};
            clip-path: inset(0 ${100 - percentage}% 0 0);
        }
    `;
};

export const ratingContainer = () => {
    return css`
        display: flex;
        align-items: center;
    `;
};
