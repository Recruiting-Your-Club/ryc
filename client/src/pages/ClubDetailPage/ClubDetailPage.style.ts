import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubDetailPageContainer = css`
    width: 100dvw;
    height: 100%;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
`;

export const contentContainer = css`
    width: 70rem;
    height: inherit;
    background-color: ${theme.colors.white};
    padding: 2rem 2rem;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray[200]};
`;
export const clubHeader = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
    margin-bottom: 4rem;
`;
export const clubHeaderText = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
`;
