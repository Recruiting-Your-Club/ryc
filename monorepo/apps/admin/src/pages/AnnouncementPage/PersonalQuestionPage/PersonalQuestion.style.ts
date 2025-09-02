import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_personalQuestionForm = (hasError: boolean) => css`
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 1px solid ${theme.colors.gray[300]};
    gap: 1rem;
    ${hasError &&
    css`
        border: 1px solid ${theme.colors.red[800]};
        transition: 0.3s ease-in-out;
    `}
    border-radius: 5px;
    width: 100%;
    padding: 1.75rem;
    margin: 2rem 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);

    @media (max-width: ${theme.breakpoint.mobile}) {
        padding: 1rem;
        margin: 2rem 0;
        min-height: 10.5rem;
    }
`;

export const s_labelContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;
export const s_labelTextSx = css`
    margin-top: 0.3rem;
`;

export const s_labelSx = css`
    color: ${theme.colors.black};
    ${theme.typography.bodyRegular};
    margin-bottom: 1.5rem;
`;

export const s_inputSx = css`
    width: 70%;
    height: 2.5rem;
    padding: 0rem 0rem;
`;

export const s_helperTextSx = css`
    ${theme.typography.subCaptionLight};
    margin-top: 1.5rem;
`;

export const s_fileUploaderSx = css`
    width: 100%;
    margin-top: 0;
`;

export const s_labelMultiline = css`
    white-space: pre-line;
`;

export const s_label = css`
    color: ${theme.colors.gray[500]};
`;
