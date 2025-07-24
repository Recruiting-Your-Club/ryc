import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const clubApplyDetailQuestionContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
    }
`;
export const s_textAreaWrapperSx = css`
    margin-top: 0.5rem;
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
    @media (max-width: ${theme.breakpoint.tablet}) {
        gap: 1.5rem;
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
    cursor: pointer;
    color: ${theme.colors.gray[500]};
`;

export const s_tooltipSx = css`
    @media (max-width: ${theme.breakpoint.mobile}) {
        direction: 'bottomLeft';
    }
`;

export const s_questionTitleSx = css`
    white-space: normal;
    text-align: justify;
    word-break: break-word;
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
