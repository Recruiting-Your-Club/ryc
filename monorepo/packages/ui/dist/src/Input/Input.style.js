import { css } from '@emotion/react';
import theme from '@styles/theme';
export const inputWrapperContainer = css `
    display: flex;
    flex-direction: column;
    width: 100%;
`;
export const labelStyle = (error) => css `
    ${theme.typography.bodySemibold}
    color: ${error ? theme.colors.red[800] : theme.colors.black};
    padding-left: 0.2rem;
`;
const baseInputContainer = css `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
`;
export const inputContainer = (error, variant) => {
    switch (variant) {
        case 'primary':
            return css `
                ${baseInputContainer};
                border: 1px solid ${error ? theme.colors.red[800] : theme.colors.inputBorder};
                border-radius: 6px;
                transition: border-color 0.3s ease-in-out;
                &:focus-within {
                    border-color: ${theme.colors.default};
                    ${error &&
                css `
                        border: 1.5px solid ${theme.colors.red[800]};
                    `}
                }
            `;
        case 'lined':
            return css `
                ${baseInputContainer};
                border: none;
                border-bottom: 1px solid ${error ? theme.colors.red[800] : theme.colors.inputBorder};
                transition: border-bottom 0.3s ease-in-out;
                &:focus-within {
                    border-color: ${theme.colors.default};
                    ${error &&
                css `
                        border-bottom: 1.5px solid ${theme.colors.red[800]};
                    `}
                }
            `;
        case 'transparent':
            return css `
                ${baseInputContainer};
                border: none;
            `;
    }
};
export const baseInputStyle = (height) => css `
    width: 100%;
    height: ${height};
    padding-left: 0.5rem;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: transparent;
`;
export const helperTextStyle = (error) => css `
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
    ${theme.typography.captionLight};
    color: ${error ? theme.colors.red[800] : theme.colors.textHelper};
`;
//# sourceMappingURL=Input.style.js.map