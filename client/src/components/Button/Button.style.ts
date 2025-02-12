import { css } from '@emotion/react';
import { colors } from '@styles/color';
import type { CSSProperties } from 'react';
import type { ButtonSize } from './Button';

interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
}

export const buttonSize: Record<ButtonSize, Size> = {
    xs: {
        width: '4rem',
        height: '2.5rem',
    },
    s: {
        width: '5rem',
        height: '2.5rem',
    },
    md: {
        width: '6rem',
        height: '2.5rem',
    },
    lg: {
        width: '7rem',
        height: '2.5rem',
    },
    xl: {
        width: '8rem',
        height: '2.5rem',
    },
    full: {
        width: '100%',
        height: '2.5rem',
    },
};
export const s_size = (size: ButtonSize) => {
    return css`
        width: ${buttonSize[size].width};
        height: ${buttonSize[size].height};
    `;
};

export const s_variant = {
    primary: css`
        background-color: ${colors.default};
        color: ${colors.white};
        border: none;
        transition: opacity 0.2s;
        &:hover {
            opacity: 0.8;
        }
    `,
};

export const s_base = (borderRadius: number | string, zIndex: number) => {
    return css`
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: ${borderRadius};
        z-index: ${zIndex};
        :disabled {
            background-color: ${colors.disabled};
            color: ${colors.white};
            cursor: not-allowed;
        }
    `;
};
