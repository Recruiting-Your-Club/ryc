import { css } from '@emotion/react';

export const clubIntroContainer = css`
    padding: 3rem 0;
`;

export const textContainer = css`
    padding: 4rem 3rem;
`;

export const imageListContainer = css`
    display: flex;
    flex-wrap: wrap;
    padding: 4rem 3rem;
    gap: 0.5rem;
`;

export const imageItem = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17rem;
    height: 17rem;
    gap: 1rem;
    @media (max-width: 480px) {
        width: 8rem;
        height: 8rem;
    }
    @media (max-width: 400px) {
        width: 6rem;
        height: 6rem;
    }
`;
