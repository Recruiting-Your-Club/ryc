import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const clubBoxContainer = css`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 10rem;
    row-gap: 2rem;
    background-color: ${theme.colors.gray[100]};
    //background-color: ${theme.colors.white};
    //border: 1px solid ${theme.colors.gray[200]};
    padding: 2rem 3rem;
    border-radius: 15px;

    @media (min-width: ${theme.breakpoint.tabletMini}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const clubBoxItem = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    @media (max-width: ${theme.breakpoint.mobile}) {
        gap: 2rem;
    }
`;
