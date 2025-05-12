import { css } from '@emotion/react';
import theme from '@styles/theme';

export const UserLayoutCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    min-width: 32rem;
    background-color: ${theme.colors.white};
    padding-top: 6rem;
`;

// export const UserLayoutCss = css`
//     display: flex;
//     flex-direction: column;
//     height: 100%;
//     width: 115rem;
//     min-width: 32rem;
//     background-color: #fff;
//     padding: 6rem 6rem 0rem 6rem;
//     // 1200px 이하
//     @media (max-width: ${theme.breakpoint.desktop}) {
//         width: 110rem;
//         padding-left: 3rem;
//         padding-right: 3rem;
//     }
//     // 1024px 이하
//     @media (max-width: ${theme.breakpoint.tablet}) {
//         width: 90rem;
//         padding-left: 3rem;
//         padding-right: 3rem;
//     }
//     // 840px 이하
//     @media (max-width: ${theme.breakpoint.tabletMini}) {
//         width: 70rem;
//         padding-left: 1rem;
//         padding-right: 1rem;
//     }
//     // 600px 이하
//     @media (max-width: ${theme.breakpoint.mobile}) {
//         width: 35rem;
//         padding-left: 1rem;
//         padding-right: 1rem;
//     }
// `;
