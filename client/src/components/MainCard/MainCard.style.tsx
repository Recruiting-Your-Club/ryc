import { css } from '@emotion/react';
import theme from '@styles/theme';

export const cardContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 33rem;
    height: 16rem;
    padding: 1rem 2rem;
    gap: 1.5rem;
    border: 0.5px solid ${theme.colors.gray[300]};
    //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: background-color 0.1s ease;
    :hover {
        background-color: ${theme.colors.gray[100]};
    }
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
    flex-grow: 1;
    justify-content: space-between;
    align-items: start;
`;
export const hashTagContainer = css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;
