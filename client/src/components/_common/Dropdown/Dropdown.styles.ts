import { css } from '@emotion/react';
import theme from '@styles/theme';
import React from 'react';

export const s_dropdown = css`
    position: relative;
`;

export const s_dropdownTrigger = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.4rem;
    border: 1px solid ${theme.colors.gray[300]};
    background: ${theme.colors.white};
    cursor: pointer;
    padding: 0 1.6rem;

    &:focus {
        box-shadow: 0 0 0 0.1rem ${theme.colors.blue[200]}50;
        border-color: ${theme.colors.blue[200]};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const baseContent = css`
    z-index: 50;
    min-width: 8rem;
    overflow: hidden;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 0.4rem;
    background: ${theme.colors.white};
    box-shadow: 0 0.6rem 0.9rem -0.2rem ${theme.colors.black}10;
    animation: dropdown_scaleIn 0.2s ease;

    @keyframes dropdown_scaleIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

export const s_dropdownContent = (
    offsetX: number,
    offsetY: number,
    position: string,
    open: boolean,
) => {
    return css`
        ${baseContent}
        position: absolute;
        margin-top: 0.5rem;
        display: none;
        ${open &&
        css`
            display: block;
        `}
    `;
};

export const s_dropdownItem = (disabled: boolean, inset: boolean) => {
    return css``;
};
