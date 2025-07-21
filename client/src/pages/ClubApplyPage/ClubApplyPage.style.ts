import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubApplyPage = css`
    width: 100%;
    height: 100%;
    min-height: 115rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 3rem;
    padding: 2rem;
    padding-bottom: 0;
    background-color: ${theme.colors.gray[100]};
    @media (max-width: ${theme.breakpoint.tablet}) {
        flex-direction: column;
        padding: 1rem;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        min-height: 100dvh;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
        flex-direction: column;
    }
`;

export const clubApplyPageMainContainer = css`
    width: 100%;
    height: 100%;
    max-width: 95rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 10px;
    position: relative;
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
    width: 90%;
    max-width: 80rem;
    max-height: 4.5rem;
    margin-bottom: 2rem;
    margin-top: 1rem;

    @media (max-width: ${theme.breakpoint.tablet}) {
        margin-top: 2rem;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        gap: 1rem;
        height: 3rem;
        margin-top: 2rem;
    }
`;

export const clubNameContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

export const clubApplyTabContainer = css`
    width: 90%;
    max-width: 80rem;
    display: flex;
    flex-direction: column;
`;

export const applyFormContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 80rem;
    margin: 2rem 0;

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

export const s_submitButtonSx = css`
    height: 4rem;
`;

export const mobileQuestionStatus = css`
    position: absolute;
    right: 5rem;
    top: 10.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    display: none;

    @media (max-width: ${theme.breakpoint.tablet}) {
        display: flex;
        right: 8rem;
        top: 10rem;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        right: 5rem;
        top: 8.3rem;
    }
`;

export const submitCardContainer = css`
    position: sticky;
    top: 8rem;
    align-self: flex-start;
`;

export const arrowIcon = css`
    width: 1rem;
    height: 1rem;
`;
