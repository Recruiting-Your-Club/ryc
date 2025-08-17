import { css } from '@emotion/react';

import theme from '@ssoc/styles';

import type { Placement } from './types';

export const s_dropdown = css`
    position: relative;
    display: inline-block;
`;

export const s_dropdownTrigger = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.6rem;
    border: 1px solid ${theme.colors.gray[300]};
    background: ${theme.colors.white};
    cursor: pointer;
    padding: 0 1.6rem;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${theme.colors.gray[200]};
    }

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
    isolation: isolate; // stacking context 분리

    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 0.6rem;
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
    open: boolean,
    placement: Placement,
) => {
    const x = `${offsetX * 0.8}rem`;
    const y = `${offsetY * 0.8}rem`;

    const positionStyles =
        placement === 'bottom'
            ? css`
                  top: calc(100% + 0.4rem);
                  left: 50%;
                  transform: translateX(calc(-50% + ${x})) translateY(${y});
              `
            : css`
                  top: 50%;
                  left: calc(100% + 0.4rem);
                  transform: translateY(calc(-50% + ${y})) translateX(${x});
              `;
    return css`
        ${baseContent}
        position: absolute;
        //${positionStyles}
        opacity: 0;
        pointer-events: none;
        visibility: hidden;

        ${open &&
        css`
            opacity: 1;
            pointer-events: auto;
            visibility: visible;
        `}

        transition: opacity 0.15s ease;
    `;
};

export const s_dropdownItem = (disabled: boolean, inset: boolean) => {
    return css`
        display: flex;
        cursor: pointer;
        align-items: center;
        width: 100%;
        padding: 0.3rem 1.2rem;
        line-height: 1.4;
        border-radius: 0.6rem;
        border: none;
        background-color: transparent;
        font-size: 1.4rem;
        ${theme.typography.captionRegular}
        color: ${theme.colors.gray[900]};
        text-align: left;
        transition: all 0.2s;
        user-select: none;

        &:hover {
            background-color: ${theme.colors.blue[100]};
        }

        &:focus {
            outline: none;
            background-color: ${theme.colors.blue[100]};
        }

        ${disabled &&
        css`
            opacity: 0.5;
            pointer-events: none;
        `}

        ${inset &&
        css`
            justify-content: center;
        `}
    `;
};

export const s_dropdownLabel = (inset: boolean) => {
    return css`
        display: flex;
        padding: 0.2rem 1.2rem;
        color: ${theme.colors.gray[600]};
        font-size: 1.2rem;
        ${theme.typography.captionSemibold}
        ${inset &&
        css`
            justify-content: center;
        `};
    `;
};

export const s_dropdownSeperator = css`
    height: 1px;
    margin: 0.4rem 0;
    background-color: ${theme.colors.gray[300]};
`;

export const s_dropdownGroup = css`
    padding: 0.4rem 0;
`;

export const s_dropdownSubTrigger = (disabled: boolean, inset: boolean) => {
    return css`
        position: relative;
        justify-content: space-between;
        ${s_dropdownItem(disabled, inset)}
    `;
};

export const s_dropdownSubTriggerArrow = css`
    position: absolute;
    right: 0.6rem;
`;

export const s_dropdownSubContent = (align: string, open: boolean) => {
    let yAlignStyles = css``;

    switch (align) {
        case 'center':
            yAlignStyles = css`
                transform: translateY(-50%);
            `;
            break;
        case 'top':
            yAlignStyles = css`
                top: 0;
            `;
            break;
        case 'bottom':
            yAlignStyles = css`
                bottom: 0;
            `;
            break;
    }

    return css`
        ${baseContent}
        position: absolute;

        left: 100%;
        margin-left: 0.4rem;
        opacity: 0;
        pointer-events: none;
        visibility: hidden;

        ${yAlignStyles};

        ${open &&
        css`
            opacity: 1;
            pointer-events: auto;
            visibility: visible;
        `}

        transition: opacity 0.15s ease;
    `;
};
