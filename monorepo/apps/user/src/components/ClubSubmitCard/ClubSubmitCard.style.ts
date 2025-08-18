import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const clubApplySubmitCardContainer = css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const svgContainer = css`
    width: 4rem;
    height: 4rem;
    border-radius: 10px;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 3rem;
        height: 3rem;
    }
`;

export const clubSubmitCard = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25rem;
    height: 25rem;
    margin-right: 0.5rem;
    padding: 1.5rem;
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 10px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.16);
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.breakpoint.tablet}) {
        display: none;
    }
`;

export const clubSubmitCardLogo = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const clubSubmitCardSubCaption = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: ${theme.breakpoint.tablet}) {
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
`;
export const deadlineText = (diffDay: number) => css`
    ${diffDay <= 3 &&
    css`
        color: ${theme.colors.red[800]};
    `}
`;
