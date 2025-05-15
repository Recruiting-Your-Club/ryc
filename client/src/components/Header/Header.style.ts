import { css } from '@emotion/react';
import theme from '@styles/theme';

export const headerBarContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* 패딩 포함한 width 계산 */
    height: 6rem;
    padding: 0 1rem;
    background-color: ${theme.colors.white};
    border-bottom: 0.5px solid ${theme.colors.disabled};
`;

export const homeNavContainer = css`
    display: flex;
    justify-content: space-between;
    width: 100rem;

    // 840px ~ 1200px
    @media (max-width: ${theme.breakpoint.desktop}) {
        width: 90rem;
    }
    // 600px ~ 840px
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 70rem;
    }
    // 0px ~ 600px
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 35rem;
    }
`;

export const homeImage = css`
    border-radius: 0.5rem;
`;

export const navContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    @media (max-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;
