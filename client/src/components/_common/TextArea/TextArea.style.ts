import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_textAreaWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;
`;
export const s_textAreaLabelWrapper = (width: string) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${width};
`;

export const s_textArea = (
    height: number,
    width: string,
    error?: boolean,
    disabled?: boolean,
) => css`
    resize: none;
    width: ${width};
    height: ${height}rem;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[500]};
    padding: 1rem;
    ${theme.typography.bodySemibold};
    transition: border-color 0.3s ease-in-out;
    outline: none;

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
    color: ${theme.colors.red[800]};
    margin-top: 0.25rem;
    ${theme.typography.helperTextLight};
`;

export const s_charCount = (width: string) => css`
    width: ${width};
    display: flex;
    justify-content: flex-end;
    margin-top: 0.25rem;
    ${theme.typography.helperTextLight};
    color: ${theme.colors.gray[600]};
`;
