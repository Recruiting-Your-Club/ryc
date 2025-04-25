import { css } from '@emotion/react';
import theme from '@styles/theme';

export const footerContainer = css`
    width: 100dvw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    background-color: ${theme.colors.gray[100]};
`;

export const footerContent = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 14rem;
    padding: 2.5rem 4rem;
    max-width: 1200px;
    margin: 0 auto;
`;

export const footerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
`;
