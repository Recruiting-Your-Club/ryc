import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const DialogContainer = css`
    display: flex;
    flex-direction: column;
    max-width: 90rem;
    max-height: 60rem;
    @media (min-width: ${theme.breakpoint.mobileMini}) {
        padding: 2rem 2rem 1rem 2rem;
    }
    @media (min-width: ${theme.breakpoint.mobile}) {
        padding: 3rem 4rem 1rem 4rem;
        max-height: 80rem;
    }
`;
export const headerContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 3rem;
    gap: 0.5rem;
`;
export const contentContainer = css`
    position: relative;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    width: 100%;
    gap: 5rem;
    overflow-y: auto;
`;

export const textContainer = css`
    padding: 0 2rem;
`;

export const imageListContainer = css`
    display: grid;
    justify-content: center;
    width: 100%;
    padding: 2rem 3rem;
    gap: 0.5rem;
    grid-template-columns: repeat(4, 1fr);
`;

export const imageItem = css`
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    background-color: transparent;
`;

export const actionContainer = css`
    padding-bottom: 2rem;
    padding-top: 3rem;
    @media (max-width: ${theme.breakpoint.mobile}) {
        position: fixed;
        width: 100%;
        bottom: 1rem;
        left: 0;
        right: 0;
        padding: 0.5rem 4rem;
        z-index: 100;
        opacity: 0.9;
    }
`;
export const applyButton = css`
    width: 100%;
    max-width: 30rem;
`;
