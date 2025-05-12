import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubApplyFormContainer = (index: number) => css`
    display: flex;
    flex-direction: column;
    width: 90%;

    ${index === 0 &&
    css`
        justify-content: space-between;
    `}
    ${index === 1 &&
    css`
        gap: 1.5rem;
    `};
    margin: 3rem 0;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
        margin: 1.5rem 0;
    }
`;

export const clubApplyForm = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 5px;
    width: 100%;
    height: 10rem;
    padding: 1.5rem 1.5rem;
    margin: 2.5rem 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.16);

    @media (max-width: ${theme.breakpoint.mobile}) {
        padding: 1rem;
        margin: 1rem 0;
        height: 9rem;
    }
`;
