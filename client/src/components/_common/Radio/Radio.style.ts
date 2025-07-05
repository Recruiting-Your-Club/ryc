import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { RadioOrientation, RadioSize } from './types';

const radioSizeMap: { [key in RadioSize]: string } = {
    xs: '1rem',
    sm: '1.2rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
};

export const radioContainer = (orientation: RadioOrientation) => css`
    display: flex;
    align-items: start;
    justify-content: start;
    gap: 0.5rem;
    ${orientation === 'vertical' &&
    css`
        flex-direction: column;
    `}
`;

export const s_input = css`
    display: none;
`;

export const s_label = (checked: boolean, disabled: boolean) => css`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 0.5rem;
    ${theme.typography.captionRegular};
    min-width: 3rem;

    ${disabled &&
    css`
        pointer-events: none;
        opacity: 0.5;
    `}

    &:hover {
        & div {
            ${!checked &&
            css`
                border: 1px solid ${theme.colors.default};
            `}
        }
    }
`;

export const s_radio = (size: RadioSize = 'md') => css`
    width: ${radioSizeMap[size]};
    height: ${radioSizeMap[size]};
    border-radius: 50%;
    border: 1px solid ${theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_radioInner = (size: RadioSize = 'md') => css`
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background-color: ${theme.colors.default};
    transition: background-color 0.1s ease-in;
`;
