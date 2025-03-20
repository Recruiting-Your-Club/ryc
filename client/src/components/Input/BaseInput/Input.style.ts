import { css } from '@emotion/react';
import theme from '@styles/theme';

export type InputVariant = 'primary' | 'lined';

export const inputWrapperContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const labelStyle = (error: boolean) => css`
    ${theme.typography.bodySemibold}
    color: ${error ? theme.colors.red[800] : theme.colors.black};
    padding-left: 0.2rem;
`;

const baseInputContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
`;

export const inputContainer = (error: boolean) => ({
    primary: css`
        ${baseInputContainer};
        border: 1px solid ${error ? theme.colors.red[800] : theme.colors.inputBorder};
        border-radius: 0.6rem;
        transition: border-color 0.3s ease-in-out;
        &:focus-within {
            border-color: ${theme.colors.default};
        }
    `,
    lined: css`
        ${baseInputContainer};
        border: none;
        border-bottom: 1px solid ${error ? theme.colors.red[800] : theme.colors.inputBorder};
        transition: border-bottom 0.3s ease-in-out;
        &:focus-within {
            border-color: ${theme.colors.default};
        }
    `,
});

export const baseInputStyle = (height: string) => css`
    width: 100%;
    height: ${height};
    padding-left: 0.5rem;
    outline: none;
    border: none;
    border-radius: 1rem;
`;

export const startNodeStyle = css`
    white-space: nowrap;
`;

export const endNodeStyle = css`
    white-space: nowrap;
`;

export const helperTextStyle = (error: boolean | undefined) => css`
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
    ${theme.typography.captionLight};
    color: ${error ? theme.colors.red[800] : theme.colors.textHelper};
`;
