import { css } from '@emotion/react';
import { colors } from '@styles/color';

export const baseInputStyle = css`
    width: 100%;
    height: 1.8rem;
    padding-left: 0.5rem;
    outline: none;
    color: ${colors.black};
`;

export const s_input = {
    primary: css`
        ${baseInputStyle};
        border: 1px solid ${colors.inputBorder};
        border-radius: 0.3rem;
        transition: border-color 0.3s ease-in-out;
        &:focus {
            border-color: ${colors.default};
        }
    `,
    lined: css`
        ${baseInputStyle};
        border: none;
        border-bottom: 1px solid ${colors.inputBorder};
        transition: border-bottom 0.3s ease-in-out;
        &:focus {
            border-color: ${colors.default};
        }
    `,
};

export const helperTextStyle = (error: boolean | undefined) => css`
    font-size: 0.8rem;
    margin-top: 0.2rem;
    color: ${error ? colors.red[1000] : colors.textHelper};
`;
