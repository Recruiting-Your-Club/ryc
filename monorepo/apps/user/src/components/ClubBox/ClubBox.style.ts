import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const clubBoxContainer = css`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 10rem;
    row-gap: 2rem;
    background-color: ${theme.colors.gray[100]};
    padding: 2rem 3rem;
    border-radius: 15px;

    @media (min-width: ${theme.breakpoint.tabletMini}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const clubBoxItem = css`
    display: flex;
    @media (max-width: ${theme.breakpoint.mobile}) {
        gap: 2rem;
    }
`;

export const s_TextSx = css`
    width: 40%;
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: auto;
    }
`;
