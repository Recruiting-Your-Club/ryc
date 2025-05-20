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
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem;

    @media (max-width: ${theme.breakpoint.tablet}) {
        padding: 1rem;
        justify-content: center;
        gap: 3rem;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
        flex-direction: column;
    }
`;

export const clubApplyPageMainContainer = css`
    width: 100%;
    min-height: 70rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: ${theme.colors.white};
    border-radius: 5px;

    @media (max-width: ${theme.breakpoint.tabletMini}) {
        width: 70%;
        padding: 1rem 3rem;
        margin: 0;
    }
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 75%;
        padding: 1rem 3rem;
        margin: 0;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
        padding: 1rem 3rem;
    }
`;

export const svgContainer = css`
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 10px;

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
    max-width: 70rem;
    max-height: 4.5rem;
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
`;

export const clubApplyTabContainer = css`
    width: 100%;
    max-width: 70rem;
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
`;

export const applyFormContainer = (index: number) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 70rem;

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
        margin: 2.5rem 0;
    }
`;

export const submitButtonContainer = css`
    width: 100%;
    height: 3rem;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${theme.colors.gray[100]};

    @media (max-width: ${theme.breakpoint.mobile}) {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
    }
`;

export const mobileQuestionStatus = css`
    display: none;
    margin-left: auto;
    align-items: center;
    @media (max-width: ${theme.breakpoint.tablet}) {
        display: flex;
    }
`;
