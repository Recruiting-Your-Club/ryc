import { css } from '@emotion/react';

import theme from '@ssoc/styles';

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
    padding: 1rem;
`;
export const myClubList = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
    margin-top: 1rem;
    height: 30rem;
    overflow-y: auto;
    overflow-x: hidden;
`;
export const clubItem = css`
    display: flex;
    align-items: center;
    height: 5rem;
    gap: 1rem;
    padding: 0.5rem;
`;
export const clubItemText = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25rem;
`;

export const searchButton = css`
    justify-content: start;
    height: 5.5rem;
    width: 100%;
    gap: 1rem;
    padding: 0.5rem;
    margin-bottom: 2rem;
`;

export const plusButton = css`
    padding: 0.1rem;
    padding-left: 0.2rem;
    background-color: ${theme.colors.blue[100]};
    color: ${theme.colors.blue[200]};
    font-size: 3rem;
    height: 4.5rem;
    width: 4.5rem;
    border-radius: 10px;
`;

export const s_nonClub = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.4rem 0;
    text-align: center;
`;
