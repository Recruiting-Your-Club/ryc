import { css } from '@emotion/react';

export const s_stepManagementPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const s_topContainer = css`
    width: 100%;
    height: 5%;
    min-height: 4rem;
    max-height: 5rem;
    padding: 3rem 0;
`;

export const s_searchBarContainer = css`
    width: 30%;
    height: 100%;
    padding: 0 4rem;
    display: flex;
    align-items: center;
`;

export const s_stepBoxContainer = css`
    height: 90%;
    padding: 0 3.5rem 0 3.5rem;
    display: flex;
    gap: 2rem;
`;

// 공통 스켈레톤 스타일 (박스에 적용)
export const s_skeleton = css`
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

export const s_searchBarSkeleton = css`
    ${s_skeleton}
    width: 15rem;
    height: 3rem;
    border-radius: 12px;
`;

export const s_cardBoxSkeleton = css`
    width: 27rem;
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 2rem;
`;

export const s_cardTitleSkeleton = css`
    ${s_skeleton}
    width: 40%;
    height: 3rem;
    margin-bottom: 1rem;
    border-radius: 10px;
`;

export const s_cardItemSkeleton = css`
    ${s_skeleton}
    width: 100%;
    height: 13rem;
    border-radius: 10px;
`;

export const s_titleContainer = css`
    display: flex;
    justify-content: space-between;
`;
