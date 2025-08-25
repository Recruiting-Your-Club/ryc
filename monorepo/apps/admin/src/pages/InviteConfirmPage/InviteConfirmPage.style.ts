import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_inviteConfirmPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_inviteConfirmPageCard = css`
    width: 100%;
    max-width: 48rem;
    height: 35rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

export const s_clubInfoCard = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
    pointer-events: none;
`;

export const s_clubInfoField = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

export const s_confirmText = css`
    display: inline-flex;
`;

export const s_buttonContainer = css`
    display: flex;
    gap: 0.75rem;
    justify-content: center;
`;
