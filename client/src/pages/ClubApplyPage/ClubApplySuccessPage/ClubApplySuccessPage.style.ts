import { css } from '@emotion/react';
import theme from '@styles/theme';
export const s_applicationSuccessPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const s_sucecessDescriptionContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 3rem;
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
`;
