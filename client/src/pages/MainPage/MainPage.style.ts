import { css } from '@emotion/react';
import theme from '@styles/theme';

export const mainPageContainer = css`
    height: 100%;
    width: 100%;
    padding-top: 2rem;
`;

export const bannerContainer = css`
    display: flex;
    justify-content: center;
    padding: 2rem 3rem;
    height: 22rem;
    width: 100%;
    margin-bottom: 1rem;
    @media (max-width: ${theme.breakpoint.desktop}) {
        padding: 2rem 6rem;
        height: 20rem;
    }
    @media (max-width: ${theme.breakpoint.tablet}) {
        height: 20rem;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        height: 8rem;
        padding: 0.5rem;
    }
`;

export const totalClubContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0rem 0.5rem;
    gap: 0.5rem;
    margin-bottom: 1rem;

    @media (max-width: ${theme.breakpoint.tablet}) {
        padding-left: 4rem;
    }
    @media (max-width: ${theme.breakpoint.tabletMini}) {
        padding-left: 0.5rem;
        margin: 0;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        padding-left: 1rem;
    }
`;

export const clubCategoryContainer = css`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 3.5rem;
    border-bottom: 1px solid ${theme.colors.gray[200]};
    padding-right: 0.5rem;
    @media (max-width: ${theme.breakpoint.tablet}) {
        margin-left: 4rem;
        width: 90%;
    }
    @media (max-width: ${theme.breakpoint.tabletMini}) {
        margin: 0;
        width: 100%;
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
    grid-template-columns: repeat(3, 1fr); // 기본 3열
    gap: 1rem;
    margin-top: 1rem;
    justify-items: center;

    /* 1024px 이하일 때 2열 */
    @media (max-width: ${theme.breakpoint.tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }

    /* 640px인가 이하일 때 */
    @media (max-width: ${theme.breakpoint.mobile}) {
        grid-template-columns: 1fr;
    }
`;
