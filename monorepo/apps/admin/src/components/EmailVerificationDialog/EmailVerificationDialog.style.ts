import { css } from '@emotion/react';

import theme from '@ssoc/styles';

type CodeInputStyleProps = {
    hasValue: boolean;
    isError: boolean;
};

type TextStyleProps = {
    isError: boolean;
};

export const s_emailIconContainer = css`
    width: 4.8rem;
    height: 4.8rem;
    background-color: ${theme.colors.blue[100]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    margin-top: 1rem;
`;

export const s_emailIcon = css`
    color: ${theme.colors.default};
`;

export const s_headerContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const s_textContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
`;

export const s_contentContainer = css`
    padding: 2.4rem;
`;

export const s_codeInputContainer = css`
    display: flex;
    gap: 0.8rem;
    justify-content: center;
`;

export const s_codeInput = ({ hasValue, isError }: CodeInputStyleProps) => css`
    width: 5rem;
    height: 5rem;
    text-align: center;
    ${theme.typography.h4Semibold};
    border-radius: 8px;
    background: white;
    outline: none;
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    border: 2px solid
        ${isError
            ? theme.colors.red[700]
            : hasValue
              ? theme.colors.blue[200]
              : theme.colors.gray[500]};

    &:focus {
        border-color: ${isError ? theme.colors.red[800] : theme.colors.default};
        box-shadow: 0 0 0 3px ${isError ? theme.colors.red[200] : theme.colors.blue[100]};
    }

    &:disabled {
        background-color: ${theme.colors.gray[300]};
        cursor: not-allowed;
    }
`;

export const s_infoContainer = ({ isError }: TextStyleProps) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    color: ${isError ? theme.colors.red[800] : theme.colors.gray[700]};
`;

export const s_checkIcon = css`
    width: 2.4rem;
    height: 2.4rem;
    color: ${theme.colors.green[200]};
`;

export const s_footerConatiner = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
    padding: 0 4rem;
`;

export const s_resendContainer = css`
    margin-top: 2rem;
    color: ${theme.colors.gray[600]};
`;

export const s_resendButton = css`
    background: none;
    border: none;
    color: ${theme.colors.blue[300]};
    text-decoration: underline;

    &:disabled {
        color: ${theme.colors.gray[600]};
        cursor: not-allowed;
    }
`;
