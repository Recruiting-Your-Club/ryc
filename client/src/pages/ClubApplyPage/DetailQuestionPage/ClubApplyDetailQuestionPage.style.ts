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

export const s_labelContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: ${theme.breakpoint.mobile}) {
        gap: 1rem;
    }
`;

export const s_questionTitleContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const s_infoIcon = css`
    width: 2rem;
    height: 2rem;
    color: ${theme.colors.gray[400]};
`;
