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

export const s_textArea = (size: TextAreaSize, error?: boolean, disabled?: boolean) => css`
    resize: none;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[500]};
    transition: border-color 0.3s ease-in-out;
    outline: none;
    width: 100%;

    ${s_textAreaSize(size)}

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
        opacity: 0.5;
        cursor: not-allowed;
        background-color: ${theme.colors.gray[100]};
    `}
`;
export const s_label = css`
    margin-bottom: 0.5rem;
    ${theme.typography.h3Bold};
`;

export const s_errorTextWrapper = css`
    position: absolute;
    left: 0;
    bottom: 0;
    margin-top: 0.25rem;
`;

export const s_charCountWrapper = css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 0.25rem;
`;
