import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_labelWrapper = css`
    display: block;
    margin-bottom: 0.5rem;
`;

export const s_fieldLabel = css`
    margin-bottom: 0.5rem;
    ${theme.typography.captionSemibold}
`;

export const s_requiredLabel = css`
    color: ${theme.colors.red[900]};
`;

export const s_labelDescription = css`
    ${theme.typography.subCaptionRegular}
    color: ${theme.colors.gray[800]};
`;
