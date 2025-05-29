import React from 'react';
import {
    skeletonCategory,
    skeletonContentLine,
    skeletonContentSection,
    skeletonContentShortLine,
    skeletonHeaderSection,
    skeletonInfoGrid,
    skeletonInfoItem,
    skeletonInfoLabel,
    skeletonInfoValue,
    skeletonLogo,
    skeletonPageContainer,
    skeletonTab,
    skeletonTabsSection,
    skeletonTitle,
    skeletonContentContainer,
} from './DetailLoadingPage.style';

function DetailLoadingPage() {
    return (
        <div css={skeletonPageContainer}>
            {/* 동아리 헤더 섹션 */}
            <div css={skeletonContentContainer}>
                <div css={skeletonHeaderSection}>
                    <div css={skeletonLogo}></div>
                    <div>
                        <div css={skeletonTitle}></div>
                        <div css={skeletonCategory}></div>
                    </div>
                </div>

                {/* 탭 내비게이션 섹션 */}
                <div css={skeletonTabsSection}>
                    <div css={skeletonTab}></div>
                </div>

                {/* 정보 그리드 스켈레톤 (동아리 소개 탭의 콘텐츠) */}
                <div css={skeletonInfoGrid}>
                    <div css={skeletonInfoItem}>
                        <div css={skeletonInfoLabel}></div>
                        <div css={skeletonInfoValue}></div>
                    </div>
                    <div css={skeletonInfoItem}>
                        <div css={skeletonInfoLabel}></div>
                        <div css={skeletonInfoValue}></div>
                    </div>
                    <div css={skeletonInfoItem}>
                        <div css={skeletonInfoLabel}></div>
                        <div css={skeletonInfoValue}></div>
                    </div>
                    <div css={skeletonInfoItem}>
                        <div css={skeletonInfoLabel}></div>
                        <div css={skeletonInfoValue}></div>
                    </div>
                    <div css={skeletonInfoItem}>
                        <div css={skeletonInfoLabel}></div>
                        <div css={skeletonInfoValue}></div>
                    </div>
                    <div css={skeletonInfoItem}>
                        <div css={skeletonInfoLabel}></div>
                        <div css={skeletonInfoValue}></div>
                    </div>
                </div>

                {/* 줄글 설명 스켈레톤 */}
                <div css={skeletonContentSection}>
                    <div css={skeletonContentLine}></div>
                    <div css={skeletonContentLine}></div>
                    <div css={skeletonContentLine}></div>
                    <div css={skeletonContentShortLine}></div>
                </div>
            </div>
        </div>
    );
}
export { DetailLoadingPage };
