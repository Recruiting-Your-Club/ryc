import React from 'react';

import {
    s_alertSkeleton,
    s_alertSvgContainer,
    s_alertSvgSkeleton,
    s_applicantListItemSkeleton,
    s_applicantListSkeletonWrapper,
    s_applicantSchedulePageContainer,
    s_arrowContainer,
    s_arrowSkeleton,
    s_avatarPlaceholder,
    s_contentComponentWrapper,
    s_contentContainer,
    s_dropdownSkeleton,
    s_emailPlaceholder,
    s_listHeaderSkeleton,
    s_namePlaceholder,
    s_searchBarSkeleton,
    s_textContainer,
} from './ApplicantScheduleLoadingPage.style';

function ApplicantScheduleLoadingPage() {
    const ApplicantListSkeleton = () => (
        <div css={s_applicantListSkeletonWrapper}>
            <div css={s_listHeaderSkeleton}>
                <div css={s_dropdownSkeleton} />
                <div css={s_searchBarSkeleton} />
            </div>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} css={s_applicantListItemSkeleton}>
                    <div css={s_avatarPlaceholder} />
                    <div css={s_textContainer}>
                        <div css={s_namePlaceholder} />
                        <div css={s_emailPlaceholder} />
                    </div>
                </div>
            ))}
        </div>
    );

    const ArrowSkeleton = () => (
        <div css={s_arrowContainer}>
            <div css={s_arrowSkeleton} />
            <div css={s_arrowSkeleton} />
        </div>
    );

    return (
        <div css={s_applicantSchedulePageContainer}>
            <div css={s_alertSvgContainer}>
                <div css={s_alertSvgSkeleton} />
                <div css={s_alertSkeleton} />
            </div>
            <div css={s_contentContainer}>
                <div css={s_contentComponentWrapper}>
                    <ApplicantListSkeleton />
                </div>
                <ArrowSkeleton />
                <div css={s_contentComponentWrapper}>
                    <ApplicantListSkeleton />
                </div>
                <ArrowSkeleton />
                <div css={s_contentComponentWrapper}>
                    <ApplicantListSkeleton />
                </div>
            </div>
        </div>
    );
}

export { ApplicantScheduleLoadingPage };
