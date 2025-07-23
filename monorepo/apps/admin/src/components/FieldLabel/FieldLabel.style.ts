import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_labelWrapper = css`
    display: block;
    margin-bottom: 1rem;
`;

export const s_fieldLabel = css`
    display: block;
    ${theme.typography.captionSemibold}
`;

export const s_requiredLabel = css`
    color: ${theme.colors.red[900]};
`;

export const s_labelDescription = css`
    ${theme.typography.captionRegular}
    color: ${theme.colors.gray[800]};
    margin-top: 0.7rem;
`;
