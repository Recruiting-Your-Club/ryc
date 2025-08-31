import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_inputLength = css`
    align-self: flex-end;
    margin-top: 0.4rem;
    ${theme.typography.helperTextRegular};
    color: ${theme.colors.textHelper};
`;

export const s_applicationQuestion = css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const s_questionContainer = css`
    position: relative;
`;

export const s_questionArea = css`
    flex: 0 0 95%;
    min-width: 0;
    padding-right: 2rem;
    border-right: 1px solid ${theme.colors.gray[300]};
    position: relative;
`;

export const s_firstRow = css`
    display: flex;
    align-items: center;
`;

export const s_questionOptionContainer = css`
    margin-top: 2rem;
`;

export const s_questionOptionRow = css`
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    gap: 1.2rem;
`;

export const s_removeOptionButton = css`
    background: none;
    border: none;
    width: 1rem;
    height: 1rem;
    color: ${theme.colors.textHelper};
    cursor: pointer;
`;

export const s_addOptionButton = css`
    margin-top: 2rem;
    color: ${theme.colors.textHelper};
    ${theme.typography.subCaptionSemibold};
    border: 0.1rem solid ${theme.colors.gray[300]};
    height: 2.7rem;
`;

export const s_trashIcon = css`
    width: 2rem;
    height: 2rem;
    path {
        stroke-width: 1.5;
    }
`;

export const s_trashButton = css`
    margin-left: auto;
`;

export const s_textareaLined = (minRows = 4) => css`
    width: 100%;
    min-height: calc(${minRows} * 2em + 1rem);
    padding: 0.6rem 0.2rem 0.4rem 0.8rem;
    outline: none;
    border: none;
    background: transparent;
    line-height: 2;
    resize: vertical;
    border: 1px solid ${theme.colors.inputBorder};
    border-radius: 6px;

    transition: border-color 0.3s ease-in-out;
    &:focus-within {
        border-color: ${theme.colors.default};
    }
`;
