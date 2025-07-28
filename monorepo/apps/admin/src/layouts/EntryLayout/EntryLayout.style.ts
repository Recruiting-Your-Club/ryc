import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const layoutContainer = css`
    display: flex;
    flex-direction: column;
    width: 100dvw;
    height: 100dvh;
`;

export const contentContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
    background-color: ${theme.colors.white};
`;

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    min-height: 400px;
`;
