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
    @media (max-width: ${theme.breakpoint.mobile}) {
        ${theme.typography.subCaptionRegular};
    }
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
    margin-left: 0.5rem;
`;

export const s_infoIcon = css`
    width: 2rem;
    height: 2rem;
    color: ${theme.colors.gray[400]};
`;

export const s_tooltipSx = css`
    @media (max-width: ${theme.breakpoint.mobile}) {
        direction: 'bottomLeft';
    }
`;

export const s_questionTitleSx = css`
    @media (max-width: ${theme.breakpoint.mobile}) {
        ${theme.typography.captionRegular};
    }
`;

export const s_questionStarSx = css`
    margin-top: 0.5rem;
    @media (max-width: ${theme.breakpoint.mobile}) {
        margin-top: 0.25rem;
    }
`;
