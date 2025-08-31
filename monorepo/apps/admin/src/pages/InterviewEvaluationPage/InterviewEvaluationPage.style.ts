import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_interviewInformationPageContainer = css`
    width: 100%;
    height: 100vh;
    padding: 2rem 8rem;
    display: flex;
    flex-direction: column;
    min-width: 100rem;
    overflow-y: hidden;
`;

export const s_selectionContainer = css`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

export const s_informationAndEvaluationContainer = css`
    flex: 9;
    display: flex;
    min-height: 0;
`;

export const s_informationBoxWrapper = css`
    flex: 6;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 45rem;
`;

export const s_evaluationBoxWrapper = css`
    flex: 4;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 35rem;
`;

export const s_warningPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 5rem;
    align-items: center;
    justify-content: center;
`;

export const s_textBox = css`
    margin-bottom: 4rem;
`;

export const s_iconContainer = css`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_warningIconWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_warningIcon = css`
    width: 8rem;
    height: 8rem;
    fill: ${theme.colors.black};
`;

export const s_captionText = css`
    margin-bottom: 0.5rem;
`;
