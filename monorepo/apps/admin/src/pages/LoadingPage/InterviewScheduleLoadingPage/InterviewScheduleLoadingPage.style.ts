import { css } from '@emotion/react';

// 페이지 전체 레이아웃 스타일
export const s_pageContainer = () => css`
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 1rem;
    overflow-y: auto;
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

export const s_skeletonLine = (width: string, height: string) => css`
    ${s_skeleton()}
    width: ${width};
    height: ${height};
    border-radius: 4px;
`;

// 주간 이동 컨테이너 스켈레톤
export const s_weekMoverSkeleton = () => css`
    width: 50%;
    min-width: 50rem;
    height: 4.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

export const s_weekMoverArrow = () => css`
    ${s_skeletonLine('2.5rem', '2.5rem')}
    border-radius: 50%;
`;

export const s_weekMoverText = () => css`
    ${s_skeletonLine('15rem', '1.5rem')}
`;

// 테이블 컨테이너 스켈레톤
export const s_tableContainerSkeleton = () => css`
    width: 50%;
    min-width: 50rem;
    padding: 1rem 0;
`;

export const s_tableSkeleton = () => css`
    ${s_skeleton()}
    width: 100%;
    height: 30rem;
    border: 1px solid #e0e0e0;
    border-collapse: collapse;
    border-radius: 10px;
`;

// 면접 일정 컨테이너 스켈레톤
export const s_scheduleContentContainerSkeleton = () => css`
    width: 50%;
    min-width: 50rem;
    min-height: 20rem;
    max-height: 60rem;
    border: 1px solid #e0e0e0;
    border-radius: 9px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

export const s_slotTitleSkeleton = () => css`
    padding: 0 2rem;
`;

export const s_slotTitleTextContainerSkeleton = () => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2.5rem 0;
`;

export const s_titleTextSkeleton = () => css`
    ${s_skeletonLine('8rem', '1.5rem')}
`;

export const s_titleAdditionButtonSkeleton = () => css`
    ${s_skeletonLine('6rem', '1.5rem')}
    border-radius: 1rem;
`;

export const s_dividerSkeleton = () => css`
    ${s_skeletonLine('100%', '1px')}
`;

export const s_allSlotContainerSkeleton = () => css`
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    gap: 1rem;
    overflow-y: auto;
`;

export const s_perSlotContainerSkeleton = () => css`
    display: flex;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid #e0e0e0;
    gap: 1rem;
`;

export const s_dateHeaderSkeleton = () => css`
    ${s_skeletonLine('8rem', '2rem')}
`;

export const s_timeAndNumberContainerSkeleton = () => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.8rem;
`;

export const s_slotRowSkeleton = () => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
`;

export const s_slotInfoSkeleton = () => css`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

export const s_slotTextSkeleton = () => css`
    ${s_skeletonLine('7rem', '1rem')}
`;

export const s_buttonContainerSkeleton = () => css`
    display: flex;
    gap: 0.5rem;
`;

export const s_buttonSkeleton = () => css`
    ${s_skeletonLine('4rem', '2rem')}
`;

export const s_warningContainerSkeleton = () => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const s_warningTextSkeleton = () => css`
    ${s_skeletonLine('20rem', '1.5rem')}
`;

// 리마인드 알림 컨테이너 스켈레톤
export const s_remindContainerSkeleton = () => css`
    width: 50%;
    min-width: 50rem;
    min-height: 20rem;
    max-height: 20rem;
    border: 1px solid #e0e0e0;
    border-radius: 9px;
    padding: 1rem 4rem;
    justify-content: center;
    margin: 1rem 0 3rem 0;
    display: flex;
    flex-direction: column;
`;

export const s_remindTitleContainerSkeleton = () => css`
    display: flex;
    gap: 0.5rem;
    margin: 0 0 2rem 0;
`;

export const s_remindTitleTextSkeleton = () => css`
    ${s_skeletonLine('15rem', '1.5rem')}
`;

export const s_infoSvgSkeleton = () => css`
    ${s_skeletonLine('1.5rem', '1.5rem')}
    border-radius: 50%;
`;

export const s_radioGroupSkeleton = () => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const s_radioItemSkeleton = () => css`
    ${s_skeletonLine('25rem', '1.5rem')}
`;
