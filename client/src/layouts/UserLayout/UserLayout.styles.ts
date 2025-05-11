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
