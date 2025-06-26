import { css } from '@emotion/react';
import theme from '@styles/theme';
export const buttonSize = {
    xs: {
        height: '2rem',
        padding: '0.5rem',
        typography: theme.typography.subCaptionRegular,
    },
    s: {
        height: '2.5rem',
        padding: '0.5rem',
        typography: theme.typography.captionRegular,
    },
    md: {
        height: '2.7rem',
        padding: '0.6rem',
        typography: theme.typography.captionRegular,
    },
    lg: {
        height: '3rem',
        padding: '0.8rem',
        typography: theme.typography.captionRegular,
    },
    xl: {
        height: '3.6rem',
        padding: '1rem 2rem',
        typography: theme.typography.captionRegular,
    },
    full: {
        width: '100%',
        height: '3.6rem',
        padding: '0.8rem',
        typography: theme.typography.captionRegular,
    },
};
export const s_size = (size = 'md') => {
    return css `
        ${buttonSize[size].typography}
        width: ${buttonSize[size].width};
        height: ${buttonSize[size].height};
        padding: ${buttonSize[size].padding};
    `;
};
export const s_variant = (variant) => {
    switch (variant) {
        case 'primary':
            return css `
                background-color: ${theme.colors.default};
                color: ${theme.colors.white};
                border: none;
                transition: background-color 0.2s;
                &:hover {
                    background-color: ${theme.colors.defaultHover};
                }
            `;
        case 'outlined':
            return css `
                background-color: ${theme.colors.white};
                color: ${theme.colors.black};
                border: 0.1rem solid ${theme.colors.gray[500]};
                transition: background-color 0.2s;
                &:hover {
                    color: ${theme.colors.default};
                    border: 0.1rem solid ${theme.colors.default};
                }
            `;
        case 'transparent':
            return css `
                background-color: transparent;
                border: none;
                color: ${theme.colors.textHelper};
                transition: background-color 0.2s;
                &:hover {
                    background-color: ${theme.colors.gray[100]};
                }
            `;
        case 'text':
            return css `
                background-color: transparent;
                border: none;
                transition: background-color 0.2s;
                &:hover {
                    color: ${theme.colors.defaultHover};
                }
            `;
        default:
            return css `
                background-color: ${theme.colors.default};
                color: ${theme.colors.white};
                border: none;
                transition: background-color 0.2s;
                &:hover {
                    background-color: ${theme.colors.defaultHover};
                }
            `;
    }
};
export const s_base = (borderRadius = '0.6rem', zIndex = 0) => {
    return css `
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: ${borderRadius};
        z-index: ${zIndex};
        white-space: nowrap;
        cursor: pointer;
        &:disabled {
            background-color: ${theme.colors.disabled};
            color: ${theme.colors.white};
            cursor: not-allowed;
        }
        &:disabled:hover {
            background-color: ${theme.colors.disabled};
            opacity: 1;
        }
    `;
};
//# sourceMappingURL=Button.style.js.map