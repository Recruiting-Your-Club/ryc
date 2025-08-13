import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_recruitmentContainer = css`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
`;

export const s_contentContainer = css`
    max-width: 90rem;
    min-height: 130rem;
    width: 100%;
    flex: 1;
    background-color: ${theme.colors.white};
`;

export const s_contentHeader = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 4rem;
    padding: 0 1rem;
`;
export const s_headerSubContainer = css`
    display: flex;
    justify-content: space-between;
`;
export const s_clubNameContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
`;
export const s_applyButtonAtDesktop = css`
    width: 25rem;
    height: 4rem;
    @media (max-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;

export const s_contentBody = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10rem;
`;
export const s_textContainer = css`
    padding: 0 2rem;
`;

export const s_applyButtonAtMobile = css`
    position: fixed;
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
export const s_imageListContainer = css`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr); // 기본 3열
    padding: 4rem 3rem;
    gap: 0.5rem;
    width: 100%;
    @media (min-width: 480px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const s_imageItem = css`
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    background-color: transparent;
`;
