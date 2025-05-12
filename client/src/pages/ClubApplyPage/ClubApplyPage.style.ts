import { css } from '@emotion/react';
import theme from '@styles/theme';
import { BREAKPOINT } from '@styles/theme/breakPoint';

export const clubApplyPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 2rem;

    @media (max-width: ${BREAKPOINT.tablet}) {
        flex-direction: column;
        padding: 1rem;
    }
`;

export const clubApplyPageMainContainer = css`
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    margin-left: 10rem;

    @media (max-width: ${BREAKPOINT.tablet}) {
        width: 100%;
        margin-left: 0;
        padding: 1rem;
    }
`;

export const svgContainer = css`
    width: 4rem;
    height: 4rem;

    @media (max-width: ${BREAKPOINT.mobile}) {
        width: 3rem;
        height: 3rem;
    }
`;

export const clubLogoAndNameContainer = css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 20rem;
    max-width: 30rem;
    height: 4rem;

    @media (max-width: ${BREAKPOINT.mobile}) {
        width: 100%;
        gap: 1rem;
        height: 3rem;
    }
`;

export const clubNameContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${theme.typography.h4Bold};

    @media (max-width: ${BREAKPOINT.mobile}) {
        ${theme.typography.h4Bold};
        font-size: 1.5rem;
    }
`;

export const clubTagContainer = css`
    ${theme.typography.subCaptionLight};
    color: ${theme.colors.gray[300]};
`;

export const clubApplyTabContainer = css`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid ${theme.colors.gray[300]};
    margin-top: 2rem;

    @media (max-width: ${BREAKPOINT.mobile}) {
        margin-top: 1rem;
        gap: 0.5rem;
    }
`;
//active 받아서 탭 관리
export const clubApplyTabName = css`
    ${theme.typography.subCaptionRegular};
    color: ${theme.colors.gray[400]};
    padding: 0;

    @media (max-width: ${BREAKPOINT.mobile}) {
        font-size: 0.875rem;
    }
`;

export const clubApplyFormConatiner = (index: number) => css`
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
    margin: 3rem 2rem;

    @media (max-width: ${BREAKPOINT.mobile}) {
        width: 100%;
        margin: 1.5rem 0;
    }
`;

export const clubApplyForm = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 5px;
    width: 100%;
    height: 10rem;
    padding: 1.5rem 1.5rem;
    margin: 2.5rem 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.16);

    @media (max-width: ${BREAKPOINT.mobile}) {
        padding: 1rem;
        margin: 1rem 0;
        height: 9rem;
    }
`;

export const clubApplySubmitCardContainer = css`
    width: 30%;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    @media (max-width: ${BREAKPOINT.tablet}) {
        width: 100%;
        margin-top: 2rem;
    }
`;

export const clubApplySubmitCard = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 23rem;
    height: 23rem;
    margin-top: 2rem;
    margin-right: 0.5rem;
    padding: 1.5rem;
    z-index: 1;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 5px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.16);

    @media (max-width: ${BREAKPOINT.tablet}) {
        width: 100%;
        height: auto;
        margin: 0;
    }
`;
export const clubApplySubmitCardLogo = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const clubApplySubmitCardSubCaption = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: ${BREAKPOINT.mobile}) {
        gap: 0.5rem;
    }
`;

export const clubApplyDetailQuestionContainer = css`
    display: flex;
    flex-direction: column;
    margin-bottom: -0.5rem;
`;

export const submitButtonContainer = css`
    width: 100%;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: white;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    @media (min-width: ${BREAKPOINT.tablet}) {
        display: none;
    }
`;
