import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_inputLength = css`
    position: absolute;
    right: 0.8rem;
    top: 4rem;
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
