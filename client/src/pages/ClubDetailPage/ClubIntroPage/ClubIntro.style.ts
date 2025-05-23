import { css } from '@emotion/react';

export const clubIntroContainer = css`
    padding: 3rem 0;
`;

export const textContainer = css`
    padding: 4rem 3rem;
`;

export const imageListContainer = css`
    display: grid;
    justify-content: center;
    width: 100%;
    grid-template-columns: repeat(3, 1fr); // 기본 3열
    padding: 4rem 3rem;
    gap: 0.5rem;
    @media (min-width: 480px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const imageItem = css`
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    background-color: transparent;
`;
