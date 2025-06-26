import { css } from '@emotion/react';
import theme from '@styles/theme';
const baseTag = css `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0.8rem;
    padding-top: 0.5rem;
    border-radius: 1rem;
`;
export const tag = (variant) => {
    switch (variant) {
        case 'primary':
            return css `
                ${baseTag};
                background-color: ${theme.colors.inputBorder};
                color: ${theme.colors.textHelper};
                ${theme.typography.subCaptionRegular}
            `;
        case 'progress':
            return css `
                ${baseTag};
                background-color: ${theme.colors.blue[100]};
                color: ${theme.colors.defaultHover};
                ${theme.typography.subCaptionRegular}
            `;
        case 'end':
            return css `
                ${baseTag};
                background-color: ${theme.colors.red[200]};
                color: ${theme.colors.red[800]};
                ${theme.typography.subCaptionRegular}
            `;
    }
};
//# sourceMappingURL=Tag.style.js.map