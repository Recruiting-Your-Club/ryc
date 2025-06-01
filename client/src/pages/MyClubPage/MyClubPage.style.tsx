import { css } from '@emotion/react';
import theme from '@styles/theme';

export const myClubPageLayout = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const myClubPageContainer = css`
    display: flex;
    flex-direction: column;
    width: 38rem;
    height: 31rem;
    padding: 1rem;
`;
export const myClubList = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    overflow-y: auto;
`;
export const clubItem = css`
    display: flex;
    align-items: center;
    height: 5.5rem;
    gap: 1rem;
    padding: 0.5rem;
`;
export const clubItemText = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25rem;
    gap: 0.5rem;
`;

export const searchButton = css`
    justify-content: start;
    height: 5.5rem;
    width: 97%;
    gap: 1rem;
    padding: 1rem;
`;

export const plusButton = css`
    padding: 0.2rem;
    background-color: ${theme.colors.blue[100]};
    color: ${theme.colors.blue[200]};
    font-size: 2rem;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 15px;
`;
