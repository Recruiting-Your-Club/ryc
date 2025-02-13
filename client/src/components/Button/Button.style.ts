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
        width: '5rem',
        height: '2.5rem',
    },
    s: {
        width: '7rem',
        height: '2.5rem',
    },
    md: {
        width: '9rem',
        height: '2.5rem',
    },
    lg: {
        width: '11rem',
        height: '2.5rem',
    },
    xl: {
        width: '13rem',
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
        transition: background-color 0.2s;
        &:hover {
            background-color: ${colors.defaultHover};
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
        &:disabled {
            background-color: ${colors.disabled};
            color: ${colors.white};
            cursor: not-allowed;
        }
        &:disabled:hover {
            background-color: ${colors.disabled};
            opacity: 1;
        }
    `;
};
