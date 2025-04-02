import { css } from '@emotion/react';

export const layoutContainer = css`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100dvh;
`;

export const contentContainer = css`
    display: flex;
    flex: 1;
    width: 100%;
    overflow-y: auto;
    background-color: #f8f9fa;
`;
