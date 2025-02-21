import { css } from '@emotion/react';
import { colors } from '@styles/color';

export const headerBarContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 4rem;
    border-bottom: 0.5px solid ${colors.disabled};
`;

export const homeNavContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 17rem;
    padding-left: 0.5rem;
`;

export const homeImage = css`
    width: 1rem;
    height: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    object-fit: cover;
    background-color: black;
`;

export const homeNavText = css`
    font-size: 1.5rem;
    font-weight: bold;
`;
