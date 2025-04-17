import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { CSSProperties } from 'react';

export type TextAreaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type TextAreaVariant = 'outline' | 'subtle' | 'flushed';

interface TextAreaSizeConfig {
    height: string;
    padding: CSSProperties['padding'];
}

export const textAreaSize: Record<TextAreaSize, TextAreaSizeConfig> = {
    xs: {
        height: '10rem',
        padding: '0.75rem',
    },
    sm: {
        height: '20rem',
        padding: '0.75rem',
    },
    md: {
        height: '30rem',
        padding: '0.75rem',
    },
    lg: {
        height: '40rem',
        padding: '1rem 0.75rem',
    },
    xl: {
        height: '50rem',
        padding: '1rem 1rem',
    },
    full: {
        height: '60rem',
        padding: '1rem 1rem',
    },
};

export const s_textAreaVariant = (variant: TextAreaVariant = 'outline') => {
    switch (variant) {
        case 'outline':
            return css`
                border: 1px solid ${theme.colors.gray[500]};
            `;
        case 'subtle':
            return css`
                border: none;
                background-color: ${theme.colors.gray[100]};
            `;
        case 'flushed':
            return css`
                border: none;
                border-bottom: 1px solid ${theme.colors.gray[500]};
                border-radius: 0;
                background-color: transparent;
            `;
        default:
            return css``;
    }
};

export const s_textAreaSize = (size: TextAreaSize = 'md') => {
    const { height, padding } = textAreaSize[size];
    return css`
        height: ${height};
        padding: ${padding};
    `;
};

export const s_textAreaWrapper = (width: string) => css`
    width: ${width};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    position: relative;
`;

export const s_textArea = (
    size: TextAreaSize,
    variant: TextAreaVariant,
    error?: boolean,
    disabled?: boolean,
) => css`
    resize: none;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[500]};
    transition: border-color 0.3s ease-in-out;
    outline: none;
    width: 100%;

    ${s_textAreaSize(size)};
    ${s_textAreaVariant(variant)}
    ${theme.typography.bodyRegular};

    &:focus {
        outline: 1px solid ${theme.colors.default};
        outline-offset: 0px;
        border: none solid none;
        ${error &&
        css`
            outline-color: ${theme.colors.red[800]};
        `}
    }

    ${error &&
    css`
        border-color: ${theme.colors.red[800]};
    `}

    ${disabled &&
    css`
        opacity: 1;
        cursor: not-allowed;
        background-color: ${theme.colors.gray[100]};
    `}
`;

export const s_subTextWrapper = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.25rem;
`;
