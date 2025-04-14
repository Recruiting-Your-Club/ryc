import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';

export const sideBarContainer = css`
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    height: 100%;
    overflow: clip;
    width: '30rem';
    border-right: 1px solid ${theme.colors.gray[100]};
`;

export const sectionContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0 2rem;
    width: 7rem;
    height: inherit;
    overflow: auto;
    background-color: #f6f7f9;
    border-right: 1px solid ${theme.colors.gray[300]};
`;

export const navContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const menuListContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export const emptyContainer = css`
    display: flex;
    flex: 1 1 0%;
    min-height: 5rem;
`;
export const imageContainer = css`
    width: 4rem;
    height: 4rem;
    border-radius: 10px;
`;
export const menuButton = (isActive: boolean) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 10px;
    ${isActive && `background-color: ${theme.colors.gray[300]};`}
    :hover {
        background-color: ${theme.colors.gray[300]};
    }
`;

const sideBar_collapse = keyframes`
    0% {
            width: 23rem;
        }
        100% {
            border-right: 0;
            width: 0;
        }
`;
const sideBar_expand = keyframes`
    0% {
            width: 0;
        }
        100% {
            border-right: 1px solid ${theme.colors.gray[300]};
            width: 23rem;
        }
`;
const sideBar_opacity = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const contentContainer = (isExpanded: boolean) => css`
    display: flex;
    flex-direction: column;
    height: 100dvh;
    border-right: 1px solid ${theme.colors.gray[300]};
    padding: 2rem 0rem;
    white-space: nowrap;
    background-color: #f6f7f9;
    animation: ${isExpanded
        ? css`
              ${sideBar_expand} 0.2s ease-in-out forwards, ${sideBar_opacity} 1s ease forwards
          `
        : css`
              ${sideBar_collapse} 0.4s ease forwards
          `};
`;

export const menuTitle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    padding: 0 1rem;
    ${theme.typography.h4Semibold}
`;

export const menuContainer = css`
    padding: 0 0.5rem;
`;
export const menuContent = (isActive: boolean) => css`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 4rem;
    width: 100%;
    padding: 0 1rem;
    border-radius: 7px;
    ${theme.typography.captionRegular};
    ${isActive &&
    css`
        background-color: ${theme.colors.blue[100]};
        color: ${theme.colors.defaultHover};
    `}
    :hover {
        color: ${theme.colors.defaultHover};
    }
`;
