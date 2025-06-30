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

export const arrowIcon = css`
    width: 1rem;
    height: 1rem;
`;
