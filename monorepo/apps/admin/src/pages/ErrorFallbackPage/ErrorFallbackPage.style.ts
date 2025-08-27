import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_fallbackContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 5rem;
    align-items: center;
    justify-content: center;
`;

export const s_textBox = css`
    margin-bottom: 3rem;
`;

export const s_iconContainer = css`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_warningIconWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_warningIcon = css`
    width: 10rem;
    height: 10rem;
    fill: ${theme.colors.black};
`;

export const s_captionText = css`
    margin-bottom: 0.5rem;
`;

export const s_buttonContainer = css`
    display: flex;
    gap: 0.5rem;
    margin: 0 0 1.5rem 0;
`;

export const s_homeTextButton = css`
    color: ${theme.colors.gray[300]};
`;
