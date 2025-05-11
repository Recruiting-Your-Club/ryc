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
// mobileMini: '400px',
// mobile: '480px',
// tabletMini: '768px',
// tablet: '1024px',
// desktop: '1200px',
