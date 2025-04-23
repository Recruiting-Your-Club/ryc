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
    height: 20rem;
    width: 100%;
    margin-bottom: 1rem;
    @media (max-width: ${theme.breakpoint.desktop}) {
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
    @media (max-width: ${theme.breakpoint.mobile}) {
        margin: 0;
        padding-left: 1rem;
    }
`;
export const progressContainer = (isActive: boolean) => css`
    display: flex;
    flex-grow: 1;
    justify-content: end;
    align-items: center;
    gap: 0.5rem;
    ${theme.typography.bodyRegular};
    color: ${theme.colors.gray[500]};
    ${isActive &&
    css`
        color: ${theme.colors.default};
        ${theme.typography.bodyRegular};
    `}
    @media (max-width: ${theme.breakpoint.mobile}) {
        justify-content: start;
    }
`;

export const svgContainer = css`
    width: 2rem;
    height: 2rem;
`;

export const clubCategoryContainer = css`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 3.5rem;
    border-bottom: 1px solid ${theme.colors.gray[200]};
    padding-right: 0.5rem;
    //border-radius: 10px;
    //background-color: ${theme.colors.gray[100]};
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
    grid-template-columns: repeat(3, 1fr); /* Large: 3열 */
    gap: 1rem;
    margin-top: 1rem;
    justify-items: center; /* 아이템 수평 중앙 */

    @media (max-width: ${theme.breakpoint.desktop}) {
        grid-template-columns: repeat(3, 1fr);
    }

    /* Medium (600~839px): 2열 */
    @media (max-width: ${theme.breakpoint.tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }

    /* Compact (<600px): 1열 */
    @media (max-width: ${theme.breakpoint.mobile}) {
        grid-template-columns: 1fr;
    }
`;
