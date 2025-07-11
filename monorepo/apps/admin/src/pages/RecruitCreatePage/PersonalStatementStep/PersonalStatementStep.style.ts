import { css } from '@emotion/react';
import theme from '@ssoc/styles';

export const s_buttonContainer = css`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const s_questionContainer = css`
    position: relative;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 0.6rem;
    padding: 3.5rem 3rem;
    margin-bottom: 1.6rem;
`;

export const s_buttonPosition = css`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
`;
