import { css } from '@emotion/react';

export const s_interviewInformationPageContainer = css`
    width: 100%;
    height: 100%;
    padding: 2rem 8rem;
    display: flex;
    flex-direction: column;
    min-width: 100rem;
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

export const s_skeleton = css`
    background-color: #e0e0e0;
    border-radius: 8px;
    animation: pulse 1.5s infinite ease-in-out;

    @keyframes pulse {
        0% {
            background-color: #e0e0e0;
        }
        50% {
            background-color: #f0f0f0;
        }
        100% {
            background-color: #e0e0e0;
        }
    }
`;

export const s_intervieweeListSkeleton = css`
    ${s_skeleton}
    height: 100%;
`;

export const s_informationBoxSkeleton = css`
    ${s_skeleton}
    height: 100%;
`;

export const s_evaluationBoxSkeleton = css`
    ${s_skeleton}
    height: 100%;
`;
