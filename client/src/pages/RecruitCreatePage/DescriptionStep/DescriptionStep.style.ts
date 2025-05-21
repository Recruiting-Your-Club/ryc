import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_descriptionHelpText = css`
    margin-bottom: 0.5rem;
    ${theme.typography.subCaptionRegular}
    color: ${theme.colors.gray[800]};
`;

export const s_inputWrapper = css`
    margin-bottom: 3rem;
`;

export const s_descriptionLabel = css`
    display: block;
    margin-bottom: 1rem;
    ${theme.typography.captionSemibold}
`;

export const s_descriptionAccent = css`
    color: ${theme.colors.red[900]};
`;

export const s_helpTextNoneInput = css`
    display: block;
    margin-bottom: 0.5rem;
    ${theme.typography.subCaptionRegular}
    color: ${theme.colors.gray[800]};
`;

export const s_descriptionFileUploader = css`
    width: 100%;
`;
