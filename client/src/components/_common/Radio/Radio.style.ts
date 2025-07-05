import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { RadioOrientation, RadioSize } from './types';

const radioSizeMap: Record<RadioSize, { outer: string; inner: string }> = {
    xs: { outer: '1rem', inner: '0.6rem' },
    sm: { outer: '1.2rem', inner: '0.8rem' },
    md: { outer: '1.5rem', inner: '1rem' },
    lg: { outer: '2rem', inner: '1.4rem' },
    xl: { outer: '2.5rem', inner: '1.7rem' },
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

export const s_label = (disabled: boolean) => css`
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
        & span {
            border: 1px solid ${theme.colors.default};
        }
    }
`;

export const s_radio = (checked: boolean, size: RadioSize = 'md') => css`
    width: ${radioSizeMap[size].outer};
    height: ${radioSizeMap[size].outer};
    border-radius: 50%;
    border: 1px solid ${theme.colors.black};
    position: relative;

    &::after {
        content: '';
        width: ${radioSizeMap[size].inner};
        height: ${radioSizeMap[size].inner};
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        ${checked &&
        css`
            background-color: ${theme.colors.default};
        `};
        transition: background-color 0.1s ease-in;
    }
`;
