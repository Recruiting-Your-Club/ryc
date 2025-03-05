import { css } from '@emotion/react';

export const overlay = css`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
`;

export const dialogContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 40rem;
    min-height: 30rem;

    border-radius: 1rem;
    background-color: white;
`;

export const titleContainer = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    padding: 1.5rem 2rem;
`;

export const contentContainer = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
`;

export const actionContainer = () => css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 2rem;
`;
