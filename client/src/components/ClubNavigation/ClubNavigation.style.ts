import { css } from '@emotion/react';
import theme from '@styles/theme';

export const NavigationContainer = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
`;

export const NavigationButton = (isActive: boolean) => css`
    ${theme.typography.bodySemibold}
    color: ${theme.colors.gray[500]};
    margin-bottom: 0.5rem;
    ${isActive &&
    css`
        color: ${theme.colors.black};
        ${theme.typography.bodyBold}
    `}
    :hover {
        color: ${theme.colors.black};
        ${theme.typography.bodyBold}
    }
    transition: color 0.1s;
`;
