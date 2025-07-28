import { css } from '@emotion/react';
export const cardContainer = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.5rem 1rem;
`;

export const headerContainer = css`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const contentContainer = css`
    width: 100%;
    word-break: keep-all;
    overflow-wrap: break-word;
`;

export const evaluatorSection = css`
    flex: 4;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ratingSection = css`
    flex: 6;
    display: flex;
    justify-content: end;
`;
