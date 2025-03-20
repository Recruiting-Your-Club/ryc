import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { tagVariant } from './Tag';
const baseTag = css`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 700;
`;
export const tag = (variant: tagVariant) => {
    switch (variant) {
        case 'primary':
            return css`
                ${baseTag};
                background-color: ${theme.colors.inputBorder};
                color: ${theme.colors.textHelper};
                ${theme.typography.subCaptionBold}
            `;
        case 'progress':
            return css`
                ${baseTag};
                background-color: ${theme.colors.blue[100]};
                color: ${theme.colors.defaultHover};
                ${theme.typography.subCaptionBold}
            `;
        case 'end':
            return css`
                ${baseTag};
                background-color: ${theme.colors.red[200]};
                color: ${theme.colors.red[800]};
                ${theme.typography.subCaptionBold}
            `;
    }
};
