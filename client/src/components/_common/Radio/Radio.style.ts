import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { RadioOrientation, RadioSize } from './types';

const radioSizeMap: Record<RadioSize, { size: string; padding: string }> = {
    xs: { size: '1rem', padding: '0.1rem' },
    sm: { size: '1.5rem', padding: '0.15rem' },
    md: { size: '2rem', padding: '0.2rem' },
    lg: { size: '2.5rem', padding: '0.25rem' },
    xl: { size: '3rem', padding: '0.3rem' },
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
    width: ${radioSizeMap[size].size};
    height: ${radioSizeMap[size].size};
    border-radius: 100px;
    border: 1px solid ${theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${radioSizeMap[size].padding};
`;

export const s_radioInner = css`
    width: 100%;
    height: 100%;
    border-radius: 100px;
    background-color: ${theme.colors.default};
    transition: background-color 0.1s ease-in;
`;
