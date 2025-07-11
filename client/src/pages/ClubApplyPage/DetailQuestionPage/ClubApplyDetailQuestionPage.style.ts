import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubApplyDetailQuestionContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
    }
`;

export const textAreaSx = css`
    width: 100%;
    height: 30rem;
    ${theme.typography.captionRegular};
`;

export const labelContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
