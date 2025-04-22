import { css } from '@emotion/react';
import theme from '@styles/theme';

export const UserLayoutCss = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-width: 32rem;
    background-color: #fff;
    padding: 6rem 6rem 0rem 6rem;
    // 840px ~ 1200px
    @media (max-width: ${theme.breakpoint.desktop}) {
        width: 90rem;
        padding-left: 3rem;
        padding-right: 3rem;
    }
    // 600px ~ 840px
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 70rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    // 0px ~ 600px
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 35rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;
