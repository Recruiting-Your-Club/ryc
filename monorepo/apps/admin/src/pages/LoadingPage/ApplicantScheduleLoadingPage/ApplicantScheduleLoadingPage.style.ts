import { css } from '@emotion/react';

export const s_applicantSchedulePageContainer = css`
    width: 100%;
    height: 100%;
    max-height: 100vh;
    overflow: visible;
    padding: 2rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const s_alertSvgContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const s_contentContainer = css`
    display: flex;
    padding: 0rem 2rem;
    gap: 2rem;
    flex: 1;
    justify-content: center;
`;

export const s_arrowContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
`;

export const s_contentComponentWrapper = css`
    flex: 3;
    height: 100%;
    padding: 1.5rem 1.8rem;
    align-items: center;
    justify-content: center;
    min-width: 28rem;
    max-width: 38rem;
    @media (max-width: 1600px) {
        padding: 2rem 0.3rem;
    }
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

export const s_alertSvgSkeleton = css`
    ${s_skeleton}
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-bottom: 2rem;
`;

export const s_alertSkeleton = css`
    ${s_skeleton}
    width: 30rem;
    height: 2rem;
    margin-bottom: 2rem;
`;

export const s_listSkeleton = css`
    ${s_skeleton}
    height: 100%;
    border: 1px solid #e0e0e0;
    padding: 1.5rem 1.8rem;
`;

export const s_arrowSkeleton = css`
    ${s_skeleton}
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
`;

export const s_applicantListItemSkeleton = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
`;

export const s_applicantListSkeletonWrapper = css`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const s_avatarPlaceholder = css`
    ${s_skeleton}
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
`;

export const s_textPlaceholder = css`
    ${s_skeleton}
    height: 1rem;
`;

export const s_textContainer = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 5rem;
`;

export const s_namePlaceholder = css`
    ${s_skeleton}
    width: 8rem;
    height: 2rem;
`;

export const s_emailPlaceholder = css`
    ${s_skeleton}
    width: 15rem;
    height: 2rem;
`;

export const s_listHeaderSkeleton = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0 2rem 0;
`;

export const s_dropdownSkeleton = css`
    ${s_skeleton}
    width: 12rem;
    height: 2.5rem;
    border-radius: 12px;
`;

export const s_searchBarSkeleton = css`
    ${s_skeleton}
    width: 11rem;
    height: 2.5rem;
    border-radius: 11px;
`;
