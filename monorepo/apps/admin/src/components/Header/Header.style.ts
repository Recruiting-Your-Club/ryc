import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const headerContainer = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.5rem 1rem;
    border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const logoContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 4rem;
    padding-bottom: 0.5rem;
`;

export const leftContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 2rem;
`;

export const roleContainer = css`
    padding: 0.5rem 1.5rem;
    background-color: ${theme.colors.white};
    border-radius: 10px;
    ${theme.typography.captionBold};
    color: ${theme.colors.default};
`;
