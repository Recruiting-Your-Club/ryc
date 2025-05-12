import { css } from '@emotion/react';
import theme from '@styles/theme';
import { BREAKPOINT } from '@styles/theme/breakPoint';

export const clubApplySubmitCardContainer = css`
    display: flex;
    align-items: start;
    justify-content: center;

    @media (max-width: ${BREAKPOINT.tablet}) {
        width: 100%;
        margin-top: 2rem;
    }
`;

export const svgContainer = css`
    width: 4rem;
    height: 4rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 3rem;
        height: 3rem;
    }
`;

export const clubSubmitCard = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 23rem;
    height: 23rem;
    margin-right: 0.5rem;
    padding: 1.5rem;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.16);
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 100%;
        height: auto;
        margin: 0;
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

    @media (max-width: ${theme.breakpoint.mobile}) {
        gap: 0.5rem;
    }
`;

export const questionStatusContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
export const questionStatusTextSx = (isAllQuestionCompleted: boolean) => css`
    ${isAllQuestionCompleted &&
    css`
        color: ${theme.colors.default};
    `};
    ${!isAllQuestionCompleted &&
    css`
        color: ${theme.colors.red[800]};
    `};
`;

export const arrowIcon = css`
    width: 1rem;
    height: 1rem;
`;
