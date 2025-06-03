import { css } from '@emotion/react';
import theme from '@styles/theme';

export const boxContainer = (height: string = '100%') => css`
    height: ${height};
    border-radius: 10px;
    background-color: ${theme.colors.white};
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0.5rem 1rem;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
`;

export const titleSection = css`
    flex: 0.5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

export const contentSection = css`
    flex: 9.5;
    width: 100%;
    min-height: 0;
`;

export const documentWrapper = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2rem;
    gap: 2rem;
    align-items: center;

    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;

export const personalDataWrapper = css`
    display: flex;
    /* border: 1px solid ${theme.colors.gray[200]}; */
    border-radius: 10px;
    padding: 2rem;
    gap: 1.3rem;
    align-items: center;
`;

export const avatarCss = css`
    width: 10rem;
    height: 12rem;
`;

export const textSection = css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
