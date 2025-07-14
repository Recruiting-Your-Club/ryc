import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';

export const sideBarContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    height: 100dvh;
    border-right: 1px solid ${theme.colors.gray[300]};
    z-index: 10000;
    padding-left: 2rem;
    padding-right: 1rem;
`;

export const navMenuContainer = (isExpanded: boolean) => css`
    display: flex;
    justify-content: start;
    align-items: center;
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

const sideBar_collapse = keyframes`
    0% {
        width: 23rem;
    }
    100% {
        border-right: 0;
        width: 4rem;
    }
`;
const sideBar_expand = keyframes`
    0% {
        width: 4rem;
    }
    100% {
        width: 23rem;
    }
`;
const sideBar_opacity = keyframes`
    0% {
        opacity: 0;
        display: none;
    }
    30%{
        display: none;
    }
    100% {
        opacity: 1;
    }
`;

export const clubContainer = css`
    display: flex;
    gap: 1rem;
`;
export const clubLogoWrapper = css`
    margin-bottom: 1rem;
    width: 4rem;
    height: 4rem;
    padding: 0;
`;
export const clubTextWrapper = (isExpanded: boolean) => css`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
    animation: ${isExpanded
        ? css`
              ${sideBar_opacity} 0.4s ease forwards
          `
        : css`
              ${sideBar_collapse} 0.4s ease forwards
          `};
`;

export const homeLogoContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 5rem;
`;
export const menuContainer = (isActive: boolean) => css`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding: 0;
    
    gap: 1rem;
    ${isActive && `color: ${theme.colors.black};`}
    :hover {
        color: ${theme.colors.black};
        background-color: none;
    }
`;

export const menuTextWrapper = (isExpanded: boolean) => css`
    animation: ${isExpanded
        ? css`
              ${sideBar_opacity} 0.4s ease forwards
          `
        : css`
              ${sideBar_collapse} 0.4s ease forwards
          `};
    color: ${theme.colors.gray[900]};
`;

export const menuListContainer = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    width: 100%;
`;

export const mainMenuContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`
export const subMenuContainer = (isExpanded: boolean) => css`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    gap: 0.5rem;
    animation: ${isExpanded
        ? css`
              ${sideBar_opacity} 0.4s ease forwards
          `
        : css`
              ${sideBar_collapse} 0.4s ease forwards
          `};
`
export const subMenuWrapper = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-left: solid 1px ${theme.colors.gray[300]};
    padding-left: 0.5rem;
`

export const navContainer = (isExpanded: boolean) => css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    width: 100%;
    gap: 1rem;
    background-color: ${theme.colors.white};
    z-index: 1000;
    animation: ${isExpanded
        ? css`
              ${sideBar_expand} 0.2s ease-in-out forwards
          `
        : css`
              ${sideBar_collapse} 0.4s ease forwards
          `};
`;

export const contentContainer = (isExpanded: boolean) => css`
    display: flex;
    flex-direction: column;
    height: inherit;
    border-right: 1px solid ${theme.colors.gray[300]};
    padding: 2rem 0rem;
    white-space: nowrap;
    background-color: ${theme.colors.white};
    animation: ${isExpanded
        ? css`
              ${sideBar_expand} 0.2s ease-in-out forwards, ${sideBar_opacity} 1s ease forwards
          `
        : css`
              ${sideBar_collapse} 0.4s ease forwards
          `};
    z-index: 1000;
`;

export const menuTitle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    padding: 0 1rem;
    ${theme.typography.h4Semibold};
`;

export const menuContent = (isActive: boolean) => css`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3rem;
    width: 100%;
    padding: 0 1rem;
    border-radius: 7px;
    margin-left: 1rem;
    ${theme.typography.captionLight};
    ${isActive &&
    css`
        background-color: ${theme.colors.blue[100]};
        color: ${theme.colors.defaultHover};
    `}
    :hover {
        color: ${theme.colors.defaultHover};
    }
`;
