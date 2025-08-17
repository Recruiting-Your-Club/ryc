import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const mainPageContainer = css`
    height: 100%;
    width: 100%;
    max-width: 110rem;
    min-height: 130rem;
    @media (min-width: ${theme.breakpoint.mobile}) {
        padding: 0 2rem;
    }
`;

export const bannerContainer = css`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    @media (min-width: ${theme.breakpoint.mobileMini}) {
        height: 10rem;
        padding: 1rem;
    }
    @media (min-width: ${theme.breakpoint.mobile}) {
        height: 12rem;
        padding: 2rem 6rem;
    }
    @media (min-width: ${theme.breakpoint.tabletMini}) {
        height: 14rem;
    }
    @media (min-width: ${theme.breakpoint.tabletMini}) {
        height: 18rem;
    }
    @media (min-width: ${theme.breakpoint.desktop}) {
        height: 20rem;
    }
`;

export const totalClubContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0rem 0.5rem;
    padding-left: 1rem;
    gap: 0.5rem;
    @media (min-width: ${theme.breakpoint.mobile}) {
        padding-left: 0.5rem;
    }
`;

export const clubCategoryContainer = css`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 3.5rem;
`;

export const categoryProgressContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    width: 100%;
    padding-right: 1rem;
    @media (min-width: ${theme.breakpoint.mobile}) {
        justify-content: end;
    }
`;
export const categoryDropdown = css`
    @media (min-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;
export const dropdownItem = css`
    display: flex;
    flex-direction: column;
    height: 20rem;
    overflow-y: auto;
    gap: 0.5rem;
`;
export const divider = css`
    width: 100%;
    background-color: ${theme.colors.gray[200]};
`;

export const categorySlider = (position: number, width: string) => css`
    display: absolute;
    left: 0;
    bottom: 0;
    margin: 0;
    z-index: 1;
    border-radius: 25px;
    border: 1px solid ${theme.colors.default};
    width: ${width};
    transform: translateX(${position}rem);
    transition:
        transform 0.3s ease-in-out,
        width 0.2s ease-in-out 0.05s;
    @media (max-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;

export const emptyElement = css`
    display: flex;
    flex: 1;
    @media (max-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;

export const progressContainer = (isActive: boolean) => css`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 0.5rem;
    line-height: normal ${theme.typography.bodyRegular};
    color: ${theme.colors.gray[500]};
    ${isActive &&
    css`
        color: ${theme.colors.default};
    `}
    ${!isActive &&
    css`
        :hover {
            color: ${theme.colors.gray[500]};
        }
    `}
    @media (max-width: ${theme.breakpoint.mobile}) {
        justify-content: start;
    }
`;

export const svgContainer = css`
    width: 2rem;
    height: 2rem;
`;

export const categoryButton = (active: boolean) => css`
    color: ${theme.colors.gray[400]};
    ${theme.typography.bodyRegular};
    ${active &&
    css`
        color: ${theme.colors.default};
        ${theme.typography.bodyBold};
    `}
    @media (max-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;

export const clubListContainer = css`
    display: grid;
    grid-template-columns: repeat(1, 1fr); // 기본 3열
    gap: 1rem;
    margin-top: 1rem;
    justify-items: center;

    @media (min-width: ${theme.breakpoint.tabletMini}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${theme.breakpoint.tablet}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

// mobileMini: '340px',
// mobile: '480px',
// tabletMini: '768px',
// tablet: '1024px',
// desktop: '1200px',
