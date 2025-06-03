import { css } from '@emotion/react';
import theme from '@styles/theme';

export const miniCardContainer = css`
    width: 100%;
    background-color: ${theme.colors.white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${theme.colors.gray[200]};
    }
`;

export const informationSection = css`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;
