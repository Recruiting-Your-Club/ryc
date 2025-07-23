import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_descriptionWrapper = css`
    margin-bottom: 3rem;
`;

export const s_descriptionFileUploader = css`
    width: 100%;
`;

export const s_formGroup = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
`;

export const s_customFieldLabel = css`
    min-width: 10rem;
`;

export const s_formContainer = css`
    padding: 2rem;
`;

export const s_form = css`
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 2rem;
`;
