import { css } from '@emotion/react';
import theme from '@styles/theme';

export const cardContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 33rem;
    height: 16rem;
    padding: 1rem 1.5rem;
    gap: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    gap: 0.5rem;
`;
export const logoAndTitleContainer = css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 19rem;
`;
export const cardTitleContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
`;
export const cardBodyContainer = css`
    display: flex;
    flex-grow: 1;
`;
export const cardFooterContainer = css`
    display: flex;
    align-items: start;
    padding-bottom: 0.2rem;
    gap: 0.5rem;
`;
