import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const footerContainer = (isManagerRoute: boolean) => css`
    height: 14rem;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    align-items: center;

    ${isManagerRoute &&
    css`
        border-top: 1px solid ${theme.colors.gray[300]};
    `}
`;

export const footerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 120rem;
    padding: 2.5rem 8rem;
    margin: 0 auto;

    @media (max-width: ${theme.breakpoint.tablet}) {
        padding: 2rem 4rem;
        height: auto;
        min-height: 12rem;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        padding: 1.5rem 3rem;
        min-height: 10rem;
    }

    @media (max-width: ${theme.breakpoint.mobileMini}) {
        padding: 1rem 2rem;
        min-height: 8rem;
    }
`;
