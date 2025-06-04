import { css } from '@emotion/react';
import theme from '@styles/theme';

export const UserLayoutContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-width: 32rem;
    background-color: ${theme.colors.white};
`;

export const contentContainer = css`
    flex-grow: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
// mobileMini: '400px',
// mobile: '480px',
// tabletMini: '768px',
// tablet: '1024px',
// desktop: '1200px',

