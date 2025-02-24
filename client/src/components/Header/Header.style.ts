import { css } from '@emotion/react';
import { colors } from '@styles/color';

export const headerBarContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* 패딩 포함한 width 계산 */
    height: 6rem;
    padding: 0 1rem;
    border-bottom: 0.5px solid ${colors.disabled};
`;

export const homeNavContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 22rem;
`;
export const homeImage = css`
    border-radius: 0.5rem;
`;
export const homeNavText = css`
    font-size: 2rem;
    font-weight: bold;
`;

export const navContainer = css`
    display: flex;
    align-items: center;
`;
