import type { CSSProperties } from 'react';
import type { SelectSize } from './Select';
import { css, CSSObject } from '@emotion/react';
import theme from '@styles/theme';

interface Size {
    width?: CSSProperties['width'];
}

export const selectSize: Record<SelectSize, Size> = {
    xs: {
        width: '8rem',
    },
    s: {
        width: '10rem',
    },
    md: {
        width: '12rem',
    },
    lg: {
        width: '14rem',
    },
    xl: {
        width: '16rem',
    },
    full: {
        width: '100%',
    },
};

export const s_size = (size: SelectSize) => {
    return css`
        width: ${selectSize[size].width};
    `;
};

export const s_select = css`
    position: relative;
`;

export const s_selectTrigger = css`
    display: flex;
    height: 3rem;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.4rem;
    border: 1px solid ${theme.colors.gray[200]};
    background-color: white;
    padding: 0 0.9rem;
    ${theme.typography.subCaptionRegular}
    gap: 0.5rem;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:focus {
        box-shadow: 0 0 0 0.1rem ${theme.colors.blue[200]}50;
        border-color: ${theme.colors.blue[200]};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const s_selectContent = (open: boolean) => {
    return css``;
};

export const s_selectItem = (highlighted: boolean, selected: boolean) => {
    return css``;
};
