import { css } from '@emotion/react';

// 페이지 전체 레이아웃 스타일
export const s_documentEvaluationPageContainer = () => css`
    width: 100%;
    height: 100%;
    padding: 2rem 1rem;
    display: flex;
`;

export const s_listContainer = () => css`
    flex: 2.2;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 30rem;
    max-width: 35rem;
    min-height: 0;
`;

export const s_informationContainer = () => css`
    flex: 5;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 45rem;
    max-width: 80rem;
    min-height: 0;
`;

export const s_evaluationContainer = () => css`
    flex: 2.8;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 35rem;
    max-width: 40rem;
    min-height: 0;
`;

// 공통 스켈레톤 스타일
export const s_skeleton = () => css`
    background-color: #e0e0e0;
    border-radius: 4px;
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

export const s_skeletonLine = () => css`
    ${s_skeleton()}
    height: 1rem;
    margin-bottom: 0.5rem;
`;

export const s_skeletonCircle = () => css`
    ${s_skeleton()}
    border-radius: 50%;
`;

// 좌측 지원자 목록 영역
export const s_applicantListSkeleton = () => css`
    height: 100%;
    padding: 2rem 1rem;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`;

export const s_listHeader = () => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const s_tabSkeleton = () => css`
    ${s_skeleton()}
    width: 8rem;
    height: 2rem;
    border-radius: 1rem;
`;

export const s_listSearchBar = () => css`
    ${s_skeleton()}
    width: 10rem;
    height: 2rem;
    border-radius: 6px;
`;

export const s_applicantListItem = () => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.5rem 0;
`;

export const s_avatarSkeleton = () => css`
    ${s_skeletonCircle()}
    width: 2.5rem;
    height: 2.5rem;
`;

export const s_nameEmailSkeleton = () => css`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
`;

export const s_nameSkeleton = () => css`
    ${s_skeletonLine()}
    width: 6rem;
    height: 1.2rem;
`;

export const s_emailSkeleton = () => css`
    ${s_skeletonLine()}
    width: 8rem;
    height: 1rem;
`;

export const s_evaluatedTag = () => css`
    ${s_skeleton()}
    width: 6rem;
    height: 1.5rem;
    border-radius: 1rem;
`;

export const s_informationBoxSkeleton = () => css`
    height: 100%;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const s_infoHeader = () => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const s_infoTabs = () => css`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const s_infoTabItem = () => css`
    ${s_skeleton()}
    width: 10rem;
    height: 3rem;
    border-radius: 10px;
`;

export const s_contentContainer = () => css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const s_innerContentContainer = () => css`
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-top: 2rem;
`;

export const s_infoSectionTitleSkeleton = () => css`
    ${s_skeletonLine()}
    width: 12rem;
    height: 15rem;
`;
export const s_textContentContainer = () => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const s_infoSectionContentSkeleton = () => css`
    ${s_skeleton()}
    width: 100%;
    height: 2rem;
    margin-top: 0.5rem;
`;

export const s_evaluationBoxSkeleton = () => css`
    height: 100%;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const s_evaluationTitle = () => css`
    ${s_skeleton()}
    width: 10rem;
    height: 1.5rem;
    margin-bottom: 1rem;
`;

export const s_evaluationRating = () => css`
    ${s_skeleton()}
    width: 6rem;
    height: 1.2rem;
`;

export const s_evaluationItem = () => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f0f0f0;
`;

export const s_evaluationItemHeader = () => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const s_evaluatorName = () => css`
    ${s_skeleton()}
    width: 5rem;
    height: 1.2rem;
`;

export const s_evaluatorStars = () => css`
    ${s_skeleton()}
    width: 6rem;
    height: 1.2rem;
`;

export const s_evaluationComment = () => css`
    ${s_skeleton()}
    width: 100%;
    height: 1.2rem;
`;

export const s_cardContainer = () => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
`;
