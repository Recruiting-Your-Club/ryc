import { css } from '@emotion/react';
import theme from '@styles/theme';

export const footerContainer = (isManagerRoute: boolean) => css`
    position: relative;
    width: 100dvw;
    left: 50%;
    margin-left: -50dvw;
    background-color: ${theme.colors.gray[100]};
    ${isManagerRoute &&
    css`
        border-top: 1px solid ${theme.colors.gray[300]};
    `}
`;

export const footerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    max-width: 75rem;
    height: 14rem;
    padding: 2.5rem 4rem;
`;
