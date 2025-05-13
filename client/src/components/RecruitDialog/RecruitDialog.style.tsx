import { css } from '@emotion/react';
import theme from '@styles/theme';
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
`;
export const applyButton = css`
    width: 100%;
    max-width: 30rem;
`;
