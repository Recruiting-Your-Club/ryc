import theme from '@styles/theme';
import { css } from '@emotion/react';

export const questionStatusContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
export const questionStatusTextSx = (isAllQuestionCompleted: boolean) => css`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    ${isAllQuestionCompleted &&
    css`
        color: ${theme.colors.default};
    `};
    ${!isAllQuestionCompleted &&
    css`
        color: ${theme.colors.red[800]};
    `};
`;

export const s_Icon = css`
    width: 1rem;
    height: 1rem;
`;

export const s_CheckIcon = css`
    width: 1rem;
    height: 1rem;
    color: ${theme.colors.default};
`;

export const s_DropdownItem = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 1rem;
`;
