import { css } from '@emotion/react';

export const s_interviewInformationPageContainer = () => css`
    width: 100%;
    height: 100%;
    padding: 2rem 8rem;
    display: flex;
    flex-direction: column;
    min-width: 100rem;
`;

export const s_selectionContainer = () => css`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

export const s_informationAndEvaluationContainer = () => css`
    flex: 9;
    display: flex;
    min-height: 0;
`;

export const s_informationBoxWrapper = () => css`
    flex: 6;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 45rem;
`;

export const s_evaluationBoxWrapper = () => css`
    flex: 4;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 35rem;
`;

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

export const s_intervieweeListSkeleton = () => css`
    height: 100%;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
`;

export const s_listSearchBar = () => css`
    ${s_skeleton()}
    width: 12rem;
    height: 2.5rem;
    margin-bottom: 1rem;
    border-radius: 6px;
`;

export const s_listTabs = () => css`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export const s_listTabItem = () => css`
    ${s_skeleton()}
    width: 8rem;
    height: 2.5rem;
    border-radius: 1rem;
`;

export const s_intervieweeListItemSkeleton = () => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
`;

export const s_avatarSkeleton = () => css`
    ${s_skeletonCircle()}
    width: 3rem;
    height: 3rem;
`;

export const s_intervieweeListContainer = css`
    display: flex;
    gap: 2rem;
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

export const s_infoTabs = () => css`
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
`;

export const s_infoTabItem = () => css`
    ${s_skeleton()}
    width: 10rem;
    height: 3rem;
    border-radius: 10px;
`;

export const s_infoSectionTitleSkeleton = () => css`
    ${s_skeletonLine()}
    width: 12rem;
    height: 15rem;
`;

export const s_infoSectionContentSkeleton = () => css`
    ${s_skeleton()}
    width: 100%;
    height: 2rem;
    margin-top: 0.5rem;
`;

export const s_contentContainer = () => css`
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-top: 2rem;
`;

export const s_textContentContainer = () => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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

export const s_evaluationTitleStarContainer = () => css`
    display: flex;
    justify-content: space-between;
`;

export const s_evaluationTitleSkeleton = () => css`
    ${s_skeleton()}
    width: 10rem;
    height: 3rem;
    margin-bottom: 1rem;
    border-radius: 8px;
`;

export const s_evaluationStarSkeleton = () => css`
    ${s_skeleton()}
    width: 15rem;
    height: 3rem;
    margin-bottom: 1rem;
    border-radius: 8px;
`;

export const s_evaluationItemSkeleton = () => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

export const s_evaluationAuthorSkeleton = () => css`
    ${s_skeleton()}
    width: 8rem;
    height: 2.5rem;
    border-radius: 8px;
`;

export const s_evaluationCommentSkeleton = () => css`
    ${s_skeleton()}
    flex: 1;
    height: 2.5rem;
    border-radius: 8px;
`;

export const s_titleContainer = css`
    display: flex;
    justify-content: space-between;
`;

export const s_leftTitleContainer = css`
    display: flex;
    gap: 1rem;
`;
