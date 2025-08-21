import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_applicationSuccessPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        padding: 1rem 0.5rem;
        justify-content: center;
    }
`;

export const s_successDescriptionContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 3rem;
    text-align: center;

    @media (max-width: ${theme.breakpoint.mobile}) {
        gap: 3rem;
        padding: 0 1rem;
    }
`;

export const s_successDescriptionTextSx = css`
    @media (max-width: ${theme.breakpoint.mobile}) {
        ${theme.typography.h3Bold};
    }
`;
export const s_successSubDescriptionTextSx = css`
    @media (max-width: ${theme.breakpoint.mobile}) {
        ${theme.typography.bodyRegular};
    }
`;

export const s_applicationUserInfoBox = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 1rem;
    padding: 1rem 2rem;
    width: 33rem;
    margin-top: 7rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        max-width: 33rem;
        padding: 1rem 0;
        margin-top: 4rem;
        gap: 2.5rem;
    }
`;

export const s_applicationUserInfoLabel = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const s_applicationUserInfoValue = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const s_goToHomeButtonWrapper = css`
    width: 40rem;
    display: flex;
    justify-content: center;
    margin-top: 8rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        max-width: 33rem;
        margin-top: 5rem;
    }
`;
