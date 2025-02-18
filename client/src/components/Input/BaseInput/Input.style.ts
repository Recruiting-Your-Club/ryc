import { css } from '@emotion/react';
import { colors } from '@styles/color';

export type InputVariant = 'primary' | 'lined';

export const inputWrapperContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const labelStyle = css`
    font-size: 1.2;
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
`;

export const inputContainer = (error: boolean | undefined) => ({
    primary: css`
        ${baseInputContainer};
        border: 1px solid ${error ? colors.red[1000] : colors.inputBorder};
        border-radius: 0.3rem;
        transition: border-color 0.3s ease-in-out;
        &:focus-within {
            border-color: ${colors.default};
        }
    `,
    lined: css`
        ${baseInputContainer};
        border: none;
        border-bottom: 1px solid ${error ? colors.red[1000] : colors.inputBorder};
        transition: border-bottom 0.3s ease-in-out;
        &:focus-within {
            border-color: ${colors.default};
        }
    `,
});

export const baseInputStyle = css`
    width: 100%;
    height: 2.2rem;
    padding-left: 0.5rem;
    outline: none;
`;

export const inputVariant = {
    primary: css`
        ${baseInputStyle};
        border: none;
    `,
    lined: css`
        ${baseInputStyle};
        border: none;
    `,
};

export const startNodeStyle = css`
    margin-left: 0.1rem;
    white-space: nowrap;
`;

export const endNodeStyle = css`
    margin-right: 0.1rem;
`;

export const helperTextStyle = (error: boolean | undefined) => css`
    font-size: 0.8rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
    color: ${error ? colors.red[1000] : colors.textHelper};
`;

const baseInputContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
`;
