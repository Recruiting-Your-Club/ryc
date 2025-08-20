import React from 'react';

import {
    skeletonCardBody,
    skeletonCardContent,
    skeletonCardDeadline,
    skeletonCardFooter,
    skeletonCardHeader,
    skeletonCardTags,
    skeletonCardTitle,
    skeletonRecruitCard,
    skeletonRecruitCell,
    skeletonRecruitmentContainer,
} from './ClubDetailRecruitmentLoadingPage.style';

function ClubDetailRecruitmentLoadingPage() {
    return (
        <div css={skeletonRecruitmentContainer}>
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} css={skeletonRecruitCell}>
                    <div css={skeletonRecruitCard}>
                        <div css={skeletonCardHeader}>
                            <div css={skeletonCardTitle} />
                            <div css={skeletonCardDeadline} />
                        </div>
                        <div css={skeletonCardBody}>
                            <div css={skeletonCardContent} />
                        </div>
                        <div css={skeletonCardFooter}>
                            <div css={skeletonCardTags} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export { ClubDetailRecruitmentLoadingPage };
