import { css, keyframes } from '@emotion/react';

import theme from '@ssoc/styles';

const pulse = keyframes`
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
`;

export const skeletonBase = css`
    background-color: #f0f0f0;
    border-radius: 4px;
    animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const skeletonMainPageContainer = css`
    padding: 2rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

export const skeletonBannerContainer = css`
    ${skeletonBase};
    width: 100%;
    height: 200px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

// 총 동아리 수 텍스트 스켈레톤
export const skeletonTotalClubText = css`
    ${skeletonBase};
    width: 180px; /* 텍스트 길이에 맞춰 조절 */
    height: 28px; /* Text as h4Semibold에 맞춰 조절 */
    margin-bottom: 20px;
`;

// 카테고리 버튼 컨테이너 스켈레톤
export const skeletonClubCategoryContainer = css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* 실제 categoryButton 간격에 맞춰 조절 */
    margin-bottom: 20px;
    @media (max-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;

// 개별 카테고리 버튼 스켈레톤
export const skeletonCategoryButton = css`
    ${skeletonBase};
    width: 80px; /* 버튼 텍스트 길이에 맞춰 조절 */
    height: 40px; /* 버튼 높이에 맞춰 조절 */
    border-radius: 20px;
`;

// 모집중 버튼 스켈레톤
export const skeletonProgressButton = css`
    ${skeletonBase};
    width: 200px; /* 버튼 텍스트 길이에 맞춰 조절 */
    height: 40px;
    border-radius: 20px;
    margin-left: auto; /* emptyElement와 유사하게 오른쪽에 위치 */
`;

// 디바이더/슬라이더 스켈레톤 (단순한 라인으로 표현)
export const skeletonDivider = css`
    ${skeletonBase};
    width: 100%;
    height: 2px;
    margin-bottom: 20px;
`;

// 클럽 카드 목록 스켈레톤
export const skeletonClubListContainer = css`
    display: grid;
    grid-template-columns: repeat(
        auto-fill,
        minmax(300px, 1fr)
    ); /* MainCard 레이아웃에 맞춰 조절 */
    gap: 20px;
`;

// 개별 MainCard 스켈레톤
export const skeletonMainCard = css`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const skeletonCardImage = css`
    ${skeletonBase};
    width: 100%;
    height: 180px; /* 이미지 높이에 맞춰 조절 */
    border-radius: 8px;
    margin-bottom: 10px;
`;

export const skeletonCardTitle = css`
    ${skeletonBase};
    width: 80%;
    height: 24px;
`;

export const skeletonCardCategory = css`
    ${skeletonBase};
    width: 50%;
    height: 18px;
`;

export const skeletonCardDescription = css`
    ${skeletonBase};
    width: 95%;
    height: 20px;
`;

export const skeletonCardTags = css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 5px;
`;

export const skeletonCardTag = css`
    ${skeletonBase};
    width: 70px;
    height: 25px;
    border-radius: 12px;
`;
