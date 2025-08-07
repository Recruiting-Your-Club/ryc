import React from 'react';
import {
    skeletonRecruitmentContainer,
    skeletonContentContainer,
    skeletonContentHeader,
    skeletonTitle,
    skeletonHeaderSubContainer,
    skeletonClubNameContainer,
    skeletonClubName,
    skeletonStatusTag,
    skeletonApplyButton,
    skeletonContentBody,
    skeletonClubBoxContainer,
    skeletonClubBoxItem,
    skeletonClubBoxLabel,
    skeletonClubBoxValue,
    skeletonTextContainer,
    skeletonDescriptionText,
    skeletonImageListContainer,
    skeletonImageItem,
    skeletonApplyButtonMobile,
} from './RecruitmentLoadingPage.style';

function RecruitmentLoadingPage() {
    return (
        <div css={skeletonRecruitmentContainer}>
            <div css={skeletonContentContainer}>
                <div css={skeletonContentHeader}>
                    <div css={skeletonTitle} />
                    <div css={skeletonHeaderSubContainer}>
                        <div css={skeletonClubNameContainer}>
                            <div css={skeletonClubName} />
                            <div css={skeletonStatusTag} />
                        </div>
                        <div css={skeletonApplyButton} />
                    </div>
                </div>

                <div css={skeletonContentBody}>
                    <div css={skeletonClubBoxContainer}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} css={skeletonClubBoxItem}>
                                <div css={skeletonClubBoxLabel} />
                                <div css={skeletonClubBoxValue} />
                            </div>
                        ))}
                    </div>

                    <div css={skeletonTextContainer}>
                        <div css={skeletonDescriptionText} />
                        <div css={skeletonDescriptionText} />
                        <div css={skeletonDescriptionText} />
                    </div>

                    <div css={skeletonImageListContainer}>
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} css={skeletonImageItem} />
                        ))}
                    </div>
                </div>
            </div>
            <div css={skeletonApplyButtonMobile} />
        </div>
    );
}

export { RecruitmentLoadingPage };
