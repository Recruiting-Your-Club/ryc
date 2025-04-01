import { css } from '@emotion/react';

export const sideBarContainer = (isCollapsed: boolean) => css`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: ${isCollapsed ? '4rem' : '16rem'};
    background-color: #f8f9fa;
`;

export const headerContainer = css`
    padding: 1rem;
    border-bottom: 1px solid #334155;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
