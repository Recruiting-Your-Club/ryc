import { css } from '@emotion/react';
import theme from '@styles/theme';

export const UserLayoutCss = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 120rem;
    min-width: 32rem;
    background-color: #fff;
    padding: 6rem 6rem 0rem 6rem;

    /* 400px 이상 */
    @media (min-width: ${theme.breakpoint.mobileMini}) {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    /* 480px 이상 */
    @media (min-width: ${theme.breakpoint.mobile}) {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    /* 768px 이상 */
    @media (min-width: ${theme.breakpoint.tabletMini}) {
        padding-left: 3rem;
        padding-right: 3rem;
    }

    /* 1024px 이상 */
    @media (min-width: ${theme.breakpoint.tablet}) {
        padding-left: 3rem;
        padding-right: 3rem;
    }

    /* 1200px 이상 */
    @media (min-width: ${theme.breakpoint.desktop}) {
        padding-left: 3rem;
        padding-right: 3rem;
    }
`;
// mobileMini: '400px',
// mobile: '480px',
// tabletMini: '768px',
// tablet: '1024px',
// desktop: '1200px',
