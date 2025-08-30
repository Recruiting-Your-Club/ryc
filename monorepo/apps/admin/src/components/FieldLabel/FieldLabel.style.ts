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
    ${theme.typography.subCaptionRegular}
    color: ${theme.colors.gray[800]};
    margin-top: 0.5rem;
`;

export const s_descriptionContainer = css`
    display: flex;
    gap: 0.5rem;
`;

export const s_informSvgWrapper = css`
    margin: 0.2rem 0 0 0;
    align-items: center;
`;

export const s_informSvg = css`
    width: 1.5rem;
    height: 1.5rem;
    color: ${theme.colors.gray[700]};
    &:hover {
        cursor: pointer;
    }
`;
