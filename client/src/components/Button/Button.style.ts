import { css } from '@emotion/react';
import { colors } from '@styles/color';
import type { CSSProperties } from 'react';
import type { ButtonSize } from './Button';

interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    padding: CSSProperties['padding'];
}

export const buttonSize: Record<ButtonSize, Size> = {
    xs: {
        height: '2rem',
        padding: '0.5rem',
    },
    s: {
        height: '2.5rem',
        padding: '0.5rem',
    },
    md: {
        height: '2.7rem',
        padding: '0.6rem',
    },
    lg: {
        height: '3rem',
        padding: '0.8rem',
    },
    xl: {
        height: '3.6rem',
        padding: '1rem',
    },
    full: {
        width: '100%',
        height: '3.6rem',
        padding: '0.8rem',
    },
};
export const s_size = (size: ButtonSize) => {
    return css`
        width: ${buttonSize[size].width};
        height: ${buttonSize[size].height};
        padding: ${buttonSize[size].padding};
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
        color: ${colors.textHelper};
    `,
};

export const s_base = (borderRadius: number | string, zIndex: number) => {
    return css`
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
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
