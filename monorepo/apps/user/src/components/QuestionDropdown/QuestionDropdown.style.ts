import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const questionStatusContainer = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
`;
export const questionStatusTextSx = (isAllQuestionCompleted: boolean) => css`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    ${isAllQuestionCompleted &&
    css`
        color: ${theme.colors.default};
    `};
    ${!isAllQuestionCompleted &&
    css`
        color: ${theme.colors.red[800]};
    `};
`;

export const s_arrowDown = css`
    width: 1rem;
    height: 1rem;
`;

export const s_dropdownTriggerSx = css`
    border: none;
    padding: 0;
`;

export const s_dropdownLabelTopSx = css`
    margin-top: 0.5rem;
`;
export const s_dropdownLabelBottomSx = css`
    margin-bottom: 0.5rem;
`;

export const s_dropdownItemSx = css`
    margin-bottom: 0.5rem;
`;

export const s_dropdownItem = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0;
`;

export const s_dropdownItemTextSx = css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 70%;
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 60%;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 55%;
    }
`;
export const s_dropdownItemSuccessTextSx = css`
    width: 30%;
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 40%;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 35%;
    }
`;

export const s_dropdownContent = css`
    width: 13rem;
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 12rem;
        transform: translateX(-11rem) translateY(1rem);
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 12rem;
        transform: translateX(-9rem) translateY(1rem);
    }
`;
