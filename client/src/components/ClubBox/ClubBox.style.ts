import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubBoxContainer = css`
    display: grid;
    grid-template-columns: repeat(2, 3fr);
    column-gap: 10rem;
    row-gap: 2rem;
    background-color: ${theme.colors.gray[100]};
    padding: 2rem 3rem;
    border-radius: 15px;
    margin-top: 10px;

    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 2fr);
    }
`;

export const clubBoxItem = css`
    display: flex;
    align-items: center;
    gap: 3rem;
`;
