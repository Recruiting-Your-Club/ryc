import { css } from '@emotion/react';
import { colors } from '@styles/color';

export const baseContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const inputContainer = {
    primary: css`
        display: flex;
        justify-content: space-between;
        border: 1px solid ${colors.inputBorder};
        align-items: center;
        width: 100%;
        border-radius: 0.3rem;
        padding-right: 0.1rem;
        transition: border-color 0.3s ease-in-out;
        &:focus-within {
            border-color: ${colors.default};
        }
    `,
    lined: css`
        display: flex;
        justify-content: space-between;
        border: none;
        border-bottom: 1px solid ${colors.inputBorder};
        transition: border-bottom 0.3s ease-in-out;
        &:focus-within {
            border-color: ${colors.default};
        }
    `,
};

export const baseInputStyle = css`
    width: 100%;
    height: 2rem;
    padding-left: 0.5rem;
    outline: none;
    color: ${colors.black};
`;

export const inputVariant = {
    primary: css`
        ${baseInputStyle};
        border: none;
        border-radius: 0.3rem;
    `,
    lined: css`
        ${baseInputStyle};
        border: none;
        border-bottom: 1px solid ${colors.inputBorder};
    `,
};

export const labelStyle = css`
    font-size: 1.2;
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
`;

export const helperTextStyle = (error: boolean | undefined) => css`
    font-size: 0.8rem;
    margin-top: 0.2rem;
    padding-left: 0.2rem;
    color: ${error ? colors.red[1000] : colors.textHelper};
`;
