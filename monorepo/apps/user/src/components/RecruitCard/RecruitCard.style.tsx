import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const recruitCardContainer = css`
    display: flex;
    flex-direction: column;
    width: 25rem;
    height: 15rem;
    background-color: ${theme.colors.white};
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    transition: background-color 0.1s ease;
    :hover {
        background-color: ${theme.colors.gray[100]};
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 28rem;
    }
    @media (max-width: ${theme.breakpoint.mobileMini}) {
        width: 25rem;
    }
`;
export const recruitCardHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
`;

export const deadlineText = (diffDay: number) => css`
    ${diffDay <= 3 &&
    css`
        color: ${theme.colors.red[800]};
    `}
`;

export const recruitCardBody = css`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const recruitCardFooter = css`
    display: flex;
    width: 23rem;
    padding: 1rem;
    gap: 0.5rem;
`;
