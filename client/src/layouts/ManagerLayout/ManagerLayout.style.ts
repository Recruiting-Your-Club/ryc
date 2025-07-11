import { css } from '@emotion/react';
import theme from '@styles/theme';

export const layoutContainer = css`
    display: flex;
    flex-direction: column;
    width: 100dvw;
    height: 100dvh;
`;

export const contentContainer = css`
    display: flex;
    flex: 1;
    width: 100%;
    overflow-y: auto;
    background-color: ${theme.colors.white};
`;
