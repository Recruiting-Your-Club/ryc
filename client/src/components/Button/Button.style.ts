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
        width: '2rem',
        height: '2rem',
    },
    s: {
        width: '4rem',
        height: '2rem',
    },
    md: {
        width: '6rem',
        height: '2rem',
    },
    lg: {
        width: '8rem',
        height: '2rem',
    },
    xl: {
        width: '10rem',
        height: '2rem',
    },
    full: {
        width: '100%',
        height: '2rem',
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
    outlined: css`
        background-color: ${colors.white};
        color: ${colors.default};
        border: 0.1rem solid ${colors.default};
        transition: background-color 0.2s;
        &:hover {
            background-color: ${colors.defaultHover};
            color: ${colors.white};
        }
    `,
    transparent: css`
        background-color: transparent;
        border: none;
    `,
};

export const s_base = (borderRadius: number | string, zIndex: number) => {
    return css`
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: ${borderRadius};
        z-index: ${zIndex};
        cursor: pointer;
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
