import type { CSSProperties } from 'react';
import type { SelectSize } from './Select';
import { css, CSSObject } from '@emotion/react';
import theme from '@styles/theme';

interface Size {
    width?: CSSProperties['width'];
}

export const selectSize: Record<SelectSize, Size> = {
    xs: {
        width: '6rem',
    },
    s: {
        width: '10rem',
    },
    md: {
        width: '14rem',
    },
    lg: {
        width: '18rem',
    },
    xl: {
        width: '22rem',
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
    border: 1px solid ${theme.colors.gray[300]};
    background-color: white;
    padding: 0 0.9rem;
    ${theme.typography.subCaptionRegular}
    gap: 0.5rem;
    outline: none;
    transition: all 0.2s ease;

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
    return css`
        position: absolute;
        left: 0;
        margin-top: 0.5rem;
        width: 100%;
        overflow: hidden;
        background-color: ${theme.colors.white};
        border-radius: 0.4rem;
        border: 1px solid ${theme.colors.gray[200]};
        box-shadow: 0 0.6rem 0.9rem -0.2rem ${theme.colors.black}10;
        z-index: 50;
        display: none;
        ${open &&
        css`
            display: block;
        `}
        max-height: 15rem;
        overflow-y: auto;
    `;
};

export const s_selectItem = (highlighted: boolean) => {
    return css`
        ${theme.typography.subCaptionRegular}
        color: ${theme.colors.gray[900]};
        border-radius: 0.3rem;
        display: flex;
        align-items: center;
        height: 2.5rem;
        padding: 0 0.5rem 0 2rem;
        position: relative;
        user-select: none;
        cursor: pointer;
        ${highlighted &&
        css`
            background-color: ${theme.colors.blue[100]};
        `}

        &:hover {
            background-color: ${theme.colors.blue[100]};
        }
        &:disabled {
            color: ${theme.colors.disabled};
            pointer-events: none;
        }
    `;
};

export const s_selectLabel = css`
    padding: 0.1rem 1rem 0.2rem;
    ${theme.typography.captionSemibold};
    font-size: 1rem;
    color: ${theme.colors.gray[600]};
`;

export const s_selectSeperator = css`
    height: 1px;
    background-color: ${theme.colors.gray[200]};
    margin-top: 0.3rem;
`;

export const s_selectGroup = css`
    padding: 0.3rem 0;
`;

export const s_selectValue = css`
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const s_selectPlaceholder = css`
    color: ${theme.colors.gray[600]};
`;

export const s_selectItemIndicator = css`
    position: absolute;
    left: 0.3rem;
    width: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;
