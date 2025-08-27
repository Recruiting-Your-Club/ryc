import { css } from '@emotion/react';

export const s_cardContainer = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.5rem 1rem;
`;

export const s_headerContainer = css`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const s_contentContainer = css`
    width: 100%;
    word-break: keep-all;
    overflow-wrap: break-word;
`;

export const s_evaluatorSection = css`
    flex: 6;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const s_ratingSection = css`
    flex: 4;
    display: flex;
    justify-content: end;
`;

export const s_svgButtonGroup = css`
    display: flex;
    margin: 0.5rem 0.8rem;
`;

export const s_svgButton = css`
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
`;
