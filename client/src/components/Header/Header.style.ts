import { css } from '@emotion/react';
import { colors } from '@styles/color';

export const headerBarContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 1rem); /* 패딩 포함한 width 계산 */
    height: 4rem;
    padding-left: 1rem;
    border-bottom: 0.5px solid ${colors.disabled};
`;

export const homeNavContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 17rem;
`;

export const homeImage = css`
    width: 1rem;
    height: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    object-fit: cover;
    background-color: black;
`;

export const navContainer = css`
    display: flex;
    align-items: center;
    width: 10rem;
    justify-content: space-around;
`;

export const homeNavText = css`
    font-size: 1.5rem;
    font-weight: bold;
`;
