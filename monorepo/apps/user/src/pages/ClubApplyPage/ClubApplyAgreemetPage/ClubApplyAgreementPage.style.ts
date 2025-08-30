import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_agreementPageContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;
`;

export const s_agreementPageContentContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
    align-items: center;
    justify-content: center;
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 90%;
    }
`;

export const s_allAgreeContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px solid ${theme.colors.black};
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 1rem;
    width: 96%;
`;

export const s_checkboxAndTextContainer = css`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-start;
`;

export const s_agreementContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    width: 100%;
`;

export const s_agreementTextArea = css`
    width: 100%;
    height: 10rem;
    border: 1px solid ${theme.colors.black};
    padding: 1rem;
    resize: none;
`;

export const s_buttonContainer = css`
    width: 100%;
    padding: 1.5rem;
`;
