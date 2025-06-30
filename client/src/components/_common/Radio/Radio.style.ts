import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { RadioOrientation } from './Radio';

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
            border: 0.1rem solid ${theme.colors.default};
        }
    }
`;

export const s_radio = (checked: boolean) => css`
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 0.1rem solid ${theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
        content: '';
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        ${checked &&
        css`
            background-color: ${theme.colors.default};
        `};
        transition: background-color 0.1s ease-in;
    }
`;
