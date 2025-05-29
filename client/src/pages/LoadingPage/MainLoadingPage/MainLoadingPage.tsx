import { css, keyframes } from '@emotion/react';
import React from 'react';
import {
    skeletonMainPageContainer,
    skeletonBannerContainer,
    skeletonTotalClubText,
    skeletonCardCategory,
    skeletonCardDescription,
    skeletonCardImage,
    skeletonCardTags,
    skeletonCardTag,
    skeletonCardTitle,
    skeletonCategoryButton,
    skeletonClubCategoryContainer,
    skeletonClubListContainer,
    skeletonDivider,
    skeletonMainCard,
    skeletonProgressButton,
} from './MainLoadingPage.style';

function MainLoadingPage() {
    return (
        <div css={skeletonMainPageContainer}>
            {/* 배너 스켈레톤 */}
            <div css={skeletonBannerContainer} />

            {/* 총 동아리 수 텍스트 스켈레톤 */}
            <div css={skeletonTotalClubText} />

            {/* 카테고리 버튼 컨테이너 스켈레톤 */}
            <div css={skeletonClubCategoryContainer}>
                {/* CLUB_CATEGORIES 개수만큼 버튼 스켈레톤 반복 */}
                {Array.from({ length: 5 }).map(
                    (
                        _,
                        i, // 예시로 5개 카테고리 버튼
                    ) => (
                        <div key={i} css={skeletonCategoryButton} />
                    ),
                )}
                <div css={skeletonProgressButton} /> {/* 모집중 버튼 스켈레톤 */}
            </div>

            {/* 디바이더/슬라이더 스켈레톤 */}
            <div css={skeletonDivider} />

            {/* 클럽 카드 목록 스켈레톤 */}
            <div css={skeletonClubListContainer}>
                {Array.from({ length: 6 }).map(
                    (
                        _,
                        i, // 예시로 6개의 카드 스켈레톤
                    ) => (
                        <div key={i} css={skeletonMainCard}>
                            <div css={skeletonCardImage} />
                            <div css={skeletonCardTitle} />
                            <div css={skeletonCardCategory} />
                            <div css={skeletonCardDescription} />
                            <div css={skeletonCardTags}>
                                <div css={skeletonCardTag} />
                                <div css={skeletonCardTag} />
                                <div css={skeletonCardTag} />
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}
export { MainLoadingPage };
