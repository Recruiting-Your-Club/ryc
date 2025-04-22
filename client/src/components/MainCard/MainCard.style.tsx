import { css } from '@emotion/react';
import theme from '@styles/theme';

export const cardContainer = css`
    display: flex;
    flex-direction: column;
    width: 35rem;
    padding: 1rem 2rem;
    gap: 1.5rem;
    border: 0.5px solid ${theme.colors.gray[300]};
    border-radius: 10px;
`;

export const cardHeaderContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const logoAndTitleContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
`;
export const cardTitleContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
`;
export const cardFooterContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
`;
export const hashTagContainer = css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;
