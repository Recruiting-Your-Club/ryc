import { css } from '@emotion/react';
import theme from '@styles/theme';

export const recruitmentContainer = css`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
`;

export const contentContainer = css`
    position: relative;
    max-width: 90rem;
    min-height: 130rem;
    width: 100%;
    flex: 1;
    background-color: ${theme.colors.white};
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray[200]};
    padding: 2rem 3rem;
    @media (min-width: ${theme.breakpoint.tabletMini}) {
        padding: 4rem 6rem;
    }
`;

export const contentHeader = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 4rem;
    padding: 0 1rem;
`;
export const headerSubContainer = css`
    display: flex;
    justify-content: space-between;
`;
export const clubNameContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
`;
export const applyButtonAtDesktop = css`
    width: 25rem;
    height: 4rem;
    @media (max-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;

export const contentBody = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10rem;
`;
export const textContainer = css`
    padding: 0 2rem;
`;

export const applyButtonAtMobile = css`
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    bottom: 1rem;
    left: 0;
    right: 0;
    padding: 0 4rem;
    z-index: 100;
    opacity: 0.9;
    @media (min-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;
export const imageListContainer = css`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr); // 기본 3열
    padding: 4rem 3rem;
    gap: 0.5rem;
    @media (min-width: 480px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const imageItem = css`
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    background-color: transparent;
`;
