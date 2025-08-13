import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_announcementPage = css`
    width: 100%;
    min-height: 100vh;
    min-height: 100svh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 3rem;
    padding: 2rem;
    padding-bottom: 0;
    position: relative;
    background-color: ${theme.colors.gray[100]};

    //FIXME: 스크롤 끊김 현상 발생
    //아래 속성 지우면 layout/contentContentLayout overflow-y auto; 속성에 의해 배경색이 안칠해짐
    overflow-y: auto;

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

export const s_announcementPageMainContainer = css`
    width: 100%;
    //height: 100%;
    min-height: 100vh;
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

export const s_svgContainer = css`
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 10px;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 4rem;
        height: 4rem;
    }
`;

export const s_clubLogoAndNameContainer = css`
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

export const s_clubNameContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

export const s_clubApplyTabContainer = css`
    width: 90%;
    max-width: 80rem;
    display: flex;
    flex-direction: column;
`;

export const s_applyFormContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 80rem;
    margin: 2rem 0;

    @media (max-width: ${theme.breakpoint.mobile}) {
        margin: 2.5rem 0;
    }
`;

export const s_submitButtonSx = css`
    height: 4rem;
`;

export const s_arrowIcon = css`
    width: 1rem;
    height: 1rem;
`;
