import { css, keyframes } from '@emotion/react';
import React from 'react';

import theme from '@ssoc/styles';

// 스켈레톤 애니메이션
export const pulse = keyframes`
  0% {
    background-color: ${theme.colors.gray[100]};
  }
  50% {
    background-color: ${theme.colors.gray[200]};
  }
  100% {
    background-color: ${theme.colors.gray[100]};
  }
`;

// 스켈레톤 기본 스타일
const skeletonBase = css`
    background-color: ${theme.colors.gray[100]};
    border-radius: 4px;
    animation: ${pulse} 1.5s infinite ease-in-out;
`;

// 페이지 컨테이너 스타일 (반응형 및 최소 높이 적용)
export const skeletonPageContainer = css`
    padding: 2rem; /* 기본 패딩 */
    width: 100%;
    background-color: ${theme.colors.gray[100]};
    min-height: 90rem; /* 최소 높이 설정: 실제 콘텐츠가 들어갈 높이에 맞춰 조절 */
    display: flex;
    justify-content: center;

    @media (max-width: ${theme.breakpoint.tabletMini}) {
        padding: 15px; /* 태블릿 크기에서 패딩 조절 */
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        padding: 1rem; /* 모바일 크기에서 패딩 조절 */
    }
`;

export const skeletonContentContainer = css`
    width: 100%;
    height: 100%;
    padding: 2rem;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray[200]};
    background-color: ${theme.colors.white};
    max-width: 80rem;
`;
// 동아리 헤더 섹션 (로고, 이름, 카테고리)
export const skeletonHeaderSection = css`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${theme.colors.white};

    @media (max-width: ${theme.breakpoint.mobile}) {
        flex-direction: column; /* 모바일에서 세로로 정렬 */
        align-items: flex-start; /* 세로 정렬 후 왼쪽 정렬 */
        gap: 1rem;
    }
`;

export const skeletonLogo = css`
    ${skeletonBase};
    width: 8rem;
    height: 8rem;
    border-radius: 50%;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 6rem;
        height: 6rem;
    }
`;

export const skeletonTitle = css`
    ${skeletonBase};
    width: 25rem;
    height: 3rem;
`;

export const skeletonCategory = css`
    ${skeletonBase};
    width: 10rem;
    height: 2rem;
    margin-top: 8px;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 60%;
        height: 18px;
        margin-top: 5px;
    }
`;

// 탭 내비게이션 섹션
export const skeletonTabsSection = css`
    ${skeletonBase};
    margin-bottom: 3rem;
    overflow-x: auto; /* 탭이 많을 경우 스크롤 가능하게 */
    -webkit-overflow-scrolling: touch; /* iOS 스크롤 부드럽게 */
    padding-bottom: 5px; /* 스크롤바 때문에 추가 */
    width: 100%;
    height: 7rem;
    @media (max-width: ${theme.breakpoint.mobile}) {
        justify-content: flex-start; /* 모바일에서 왼쪽 정렬 */
    }
`;

export const skeletonTab = css`
    ${skeletonBase};
    flex-shrink: 0; /* 탭이 줄어들지 않게 */
    width: 12rem;
    height: 4rem;
    border-radius: 8px 8px 0 0;
    margin-right: 1rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 10rem;
        height: 35px;
    }
`;

// 탭 콘텐츠 영역 (줄글 정보)
export const skeletonContentSection = css`
    padding: 2rem 0;
`;

export const skeletonContentLine = css`
    ${skeletonBase};
    width: 100%;
    height: 2rem;
    margin-bottom: 1rem;
`;

export const skeletonContentShortLine = css`
    ${skeletonBase};
    width: 70%;
    height: 2rem;
    margin-bottom: 1rem;
`;

// 정보 그리드 스켈레톤 (반응형)
export const skeletonInfoGrid = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 기본 2열 */
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        grid-template-columns: 1fr; /* 60rem 이하에서 1열로 변경 */
    }
`;

export const skeletonInfoItem = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const skeletonInfoLabel = css`
    ${skeletonBase};
    width: 8rem;
    height: 18px;
`;

export const skeletonInfoValue = css`
    ${skeletonBase};
    width: 15rem;
    height: 2rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%; /* 모바일에서 전체 너비 */
    }
`;
