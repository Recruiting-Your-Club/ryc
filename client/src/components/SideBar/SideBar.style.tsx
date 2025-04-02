import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';

export const sideBarContainer = (isCollapsed: boolean) => css`
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    height: 100dvh;
    overflow: clip;
    width: ${isCollapsed ? '6rem' : '30rem'};
    background-color: ${theme.colors.gray[100]};
    border-right: 1px solid #e9ecef;
`;

export const headerContainer = css`
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 1rem;
    width: 100%;
`;

export const sectionContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0 3rem;
    width: 6rem;
    height: inherit;
    overflow: auto;
    z-index: 1;
    border-right: 1px solid black;
`;

export const navContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const menuContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;
export const contentContainer = css`
    padding: 16px 0;
    height: inherit;
`;
