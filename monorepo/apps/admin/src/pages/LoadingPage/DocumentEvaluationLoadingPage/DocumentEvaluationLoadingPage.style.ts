import { css } from '@emotion/react';

export const s_documentEvaluationPageContainer = css`
    width: 100%;
    height: 100%;
    padding: 2rem 1rem;
    display: flex;
`;

export const s_listContainer = css`
    flex: 2.2;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 30rem;
    max-width: 35rem;
    min-height: 0;
`;

export const s_informationContainer = css`
    flex: 5;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 45rem;
    max-width: 80rem;
    min-height: 0;
`;

export const s_evaluationContainer = css`
    flex: 2.8;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 35rem;
    max-width: 40rem;
    min-height: 0;
`;

// Skeleton 박스에 적용할 기본 스타일
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

// 각 컨테이너에 대응하는 Skeleton 박스들
export const s_applicantListSkeleton = css`
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
