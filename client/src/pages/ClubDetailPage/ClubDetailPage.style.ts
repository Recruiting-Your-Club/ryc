import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubDetailPageContainer = css`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
`;

export const contentContainer = css`
    max-width: 90rem;
    min-height: 130rem;
    width: 100%;
    height: 100%;
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
export const clubImage = css`
    width: 6rem;
    height: 6rem;
    min-width: 6rem;
    @media (max-width: 480px) {
        min-width: 5rem;
        width: 5rem;
        height: 5rem;
    }
`;
export const clubHeaderTextContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding-bottom: 0.5rem;
`;

export const clubHeaderTitle = css`
    @media (max-width: 480px) {
        ${theme.typography.h3Semibold};
    }
`;
