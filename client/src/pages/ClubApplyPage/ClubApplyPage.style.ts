import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubApplyPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: ${theme.colors.gray[100]};
`;

export const clubApplyPage = css`
    width: 100%;
    max-width: 120rem;
    display: flex;
    align-items: start;
    gap: 2rem;
    padding: 2rem;

    @media (max-width: ${theme.breakpoint.tablet}) {
        padding: 1rem;
        justify-content: center;
        gap: 3rem;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
    }
`;

export const clubApplyPageMainContainer = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: ${theme.colors.white};
    border-radius: 5px;

    @media (max-width: ${theme.breakpoint.tabletMini}) {
        width: 60%;
        padding: 1rem;
        margin: 0;
    }
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 65%;
        padding: 1rem;
        margin: 0;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
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

export const clubLogoAndNameContainer = css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 60rem;
    height: 4rem;
    margin: 1rem 0;

    @media (max-width: ${theme.breakpoint.mobile}) {
        gap: 1rem;
        height: 3rem;
    }
`;

export const clubNameContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${theme.typography.h4Bold};
`;

export const clubTagContainer = css`
    ${theme.typography.subCaptionLight};
    color: ${theme.colors.gray[300]};
`;

export const clubApplyTabContainer = css`
    width: 100%;
    max-width: 60rem;
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid ${theme.colors.gray[300]};
    margin-top: 2rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        margin-top: 1rem;
        gap: 0.5rem;
    }
`;

export const clubApplyTabName = css`
    ${theme.typography.subCaptionRegular};
    color: ${theme.colors.gray[400]};
    padding: 0;

    @media (max-width: ${theme.breakpoint.mobile}) {
        font-size: 0.875rem;
    }
`;

export const clubApplyFormConatiner = (index: number) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 60rem;

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
        margin: 1rem 0;
    }
`;

export const submitButtonContainer = css`
    width: 100%;
    height: 4rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: ${theme.colors.white};
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    @media (min-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;

export const mobileQuestionStatus = css`
    margin-left: auto;
    font-size: 0.95rem;
    font-weight: 500;
    align-self: center;
    @media (min-width: ${theme.breakpoint.tablet}) {
        display: none;
    }
`;
