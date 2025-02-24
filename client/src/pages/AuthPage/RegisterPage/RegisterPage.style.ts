import { css } from '@emotion/react';

export const RegisterContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const RegisterBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 40rem;
    height: 50rem;
    border-radius: 1rem;
    padding: 0 4rem;
    padding-top: 2rem;
    padding-bottom: 1rem;
    box-shadow: 0.1rem 0.2rem 0.6rem rgba(0, 0, 0, 0.2);
    gap: 2.5rem;
`;

export const titleContainer = css`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-grow: 0.2;
    font-size: 2rem;
    font-weight: 700;
`;
export const emailContainer = css`
    display: flex;
    gap: 1rem;
    align-items: end;
`;
export const inputContainer = css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;
export const buttonContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;
