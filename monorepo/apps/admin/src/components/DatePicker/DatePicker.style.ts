import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_triggerButton = (selectedDate: string[], disabled: boolean = false) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    border-radius: 6px;
    padding-left: 0.8rem;
    border: 1px solid ${theme.colors.gray[200]};
    background: ${theme.colors.white};
    color: ${selectedDate.length === 0 ? theme.colors.gray[600] : theme.colors.black};

    ${disabled &&
    css`
        &:hover {
            color: ${theme.colors.white};
            border: none;
        }
    `}
`;

export const s_dropdown = css`
    width: 100%;
`;

export const s_calendarIcon = css`
    width: 2rem;
    height: 2rem;
`;

export const s_labelWithIcon = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
`;

export const s_dropdownContent = css`
    min-width: 100%;
`;

export const s_calendar = css`
    width: 100%;
`;

export const s_alwaysButtonContainer = css`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    width: 100%;
`;

export const s_alwaysButton = css`
    width: 100%;
    margin-bottom: 1rem;
`;
