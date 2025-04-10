import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { TextAreaSize } from './type';
import { textAreaSize } from './type';

export const s_textAreaSize = (size: TextAreaSize) => css`
    height: ${textAreaSize[size].height};
    padding: ${textAreaSize[size].padding};
    ${textAreaSize[size].typography};
`;

export const s_textAreaWrapper = (width: string) => css`
    width: ${width};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    position: relative;
`;
export const s_textAreaLabelWrapper = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const s_textArea = (size: TextAreaSize, error?: boolean, disabled?: boolean) => css`
    resize: none;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[500]};
    transition: border-color 0.3s ease-in-out;
    outline: none;
    width: 100%;

    ${s_textAreaSize(size)}

    &:focus {
        border-color: ${error ? theme.colors.red[800] : theme.colors.default};
    }

    ${error &&
    css`
        border-color: ${theme.colors.red[800]};
    `}

    ${disabled &&
    css`
        opacity: 0.5;
        cursor: not-allowed;
        background-color: ${theme.colors.gray[100]};
    `}
`;
export const s_label = css`
    margin-bottom: 0.5rem;
    ${theme.typography.h3Bold};
`;

export const s_errorText = css`
    position: absolute;
    right: 0;
    top: 1.5rem;
    color: ${theme.colors.red[800]};
    margin-top: 0.25rem;
    ${theme.typography.subCaptionLight};
`;

export const s_charCount = css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 0.25rem;
    ${theme.typography.subCaptionLight};
    color: ${theme.colors.gray[600]};
`;
