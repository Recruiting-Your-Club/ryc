import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';


const sideBar_opacity = keyframes`
    0% {
        display: none;
    }
    50%{
        display: none;
    }
`;

const chevron_expand_animation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(180deg);
    }
`
const chevron_collapse_animation = keyframes`
    0% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(0deg);
    }
`
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


export const emptyContainer = css`
    display: flex;
    flex-grow: 1;
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
    gap: 0.2rem;
    animation: ${isExpanded &&
    css`
        ${sideBar_opacity} 0.2s ease forwards
    `}
       
`;

export const homeLogoContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem;
    width: 100%;
    height: 6rem;
    margin-bottom: 1rem;
`;
export const homeLogoTextWrapper = (isExpanded: boolean) => css`
    padding: 0;
    ${theme.typography.h1Bold};
    ${!isExpanded && css`
        display: none;
    `}
    animation: ${isExpanded &&
    css`
        ${sideBar_opacity} 0.2s ease forwards
    `};
    :hover {
        color: black;
    }
`

export const chevronRightWrapper = (isExpanded: boolean) => css`
    width: 2rem;
    height: 2rem;
    animation: ${isExpanded
        ? css`    
              ${chevron_expand_animation} 0.4s ease forwards
          `
        : css`      
              ${chevron_collapse_animation} 0.4s ease forwards
          `};
`

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
    white-space: nowrap;
    overflow: hidden;
    opacity: ${isExpanded ? 1 : 0};
    transition: opacity 0.2s ease ${isExpanded ? '0.15s' : '0s'};
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
`;
export const subMenuContainer = (isOpen: boolean) => css`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    gap: 0.5rem;
    overflow: hidden;
    max-height: ${isOpen ? '30rem' : '0'};
    opacity: ${isOpen ? 1 : 0};
    transform: translateY(${isOpen ? '0' : '-10px'});
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const subMenuWrapper = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-left: solid 1px ${theme.colors.gray[300]};
    padding-left: 0.5rem;
`;

export const navContainer = (isExpanded: boolean) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    background-color: ${theme.colors.white};
    transition: width 0.2s ease;
    width: ${isExpanded ? '23rem' : '4rem'};
`;

export const dropdownTriggerContainer = css`
    border: none;
    padding: 0;
    width: 100%;
`
export const dropDownTriggerWrapper = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
`
export const dropDownChevronWrapper = css`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
`
export const chevronUpDownWrapper = css`
    width: 1.5rem;
    height: 1.5rem;
`
export const drowdownClubContainer = css`
    display: flex;
    flex-direction: column;
    width: 25rem;
    height: 20rem;
    overflow-y: auto;
    gap: 0.5rem;
    :hover {
        background-color: transparent;
    }
`
export const dropDownClubWrapper = css`
    display: flex;
    width: 100%;
    gap: 1rem;
    padding: 0.5rem;
    :hover {
        background-color: ${theme.colors.gray[100]};
    }
    border-radius: 5px;
`
export const dropdownClubLogoWrapper = css`
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
`

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
