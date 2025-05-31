import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubApplyPage = css`
    width: 100%;
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem;
    padding-bottom: 0;
    background-color: ${theme.colors.gray[100]};
    @media (max-width: ${theme.breakpoint.tablet}) {
        flex-direction: column;
        padding: 1rem;
        align-items: center;
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
    height: 100%;
    max-width: 90rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 10px;
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 80%;
        padding: 1rem 4rem;
        margin: 0;
    }
    @media (max-width: ${theme.breakpoint.tabletMini}) {
        width: 75%;
        padding: 1rem 4rem;
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
        width: 4rem;
        height: 4rem;
    }
`;

export const clubLogoAndNameContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 80rem;
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
    max-width: 80rem;
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
    max-width: 80rem;

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
    height: 4rem;
    display: none;
    box-shadow: 0px 0px 4px 2px rgba(55, 53, 47, 0.4);
    border-radius: 10px;
    top: 93%;
    opacity: 0.9;

    @media (max-width: ${theme.breakpoint.tablet}) {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 65%;
        padding: 0.75rem 0;
        top: 95%;
    }

    @media (max-width: ${theme.breakpoint.tabletMini}) {
        width: 60%;
        padding: 0.7rem 0;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 80%;
        padding: 0.5rem 0;
        top: 93%;
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

export const submitCardContainer = css`
    position: sticky;
    top: 8rem;
    align-self: flex-start;
`;
