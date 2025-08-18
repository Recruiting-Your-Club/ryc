import React from 'react';
import {
    skeletonClubApplyPage,
    skeletonClubApplyPageMainContainer,
    skeletonClubLogoAndNameContainer,
    skeletonClubLogo,
    skeletonClubNameContainer,
    skeletonClubName,
    skeletonClubCategory,
    skeletonMobileQuestionStatus,
    skeletonQuestionDropdown,
    skeletonClubApplyTabContainer,
    skeletonTabNavigation,
    skeletonTabItem,
    skeletonQuestionFormContainer,
    skeletonQuestionForm,
    skeletonQuestionLabel,
    skeletonQuestionTitle,
    skeletonRequiredStar,
    skeletonQuestionInput,
    skeletonSubmitCardContainer,
    skeletonSubmitCard,
    skeletonSubmitCardHeader,
    skeletonSubmitCardLogo,
    skeletonSubmitCardDeadline,
    skeletonSubmitCardTitle,
    skeletonSubmitCardCategory,
    skeletonSubmitCardDescription,
    skeletonSubmitCardProgress,
    skeletonSubmitCardButton,
    skeletonSubmitButtonContainer,
    skeletonSubmitButton,
} from './ClubApplyLoadingPage.style';

function ClubApplyLoadingPage() {
    return (
        <div css={skeletonClubApplyPage}>
            <div css={skeletonClubApplyPageMainContainer}>
                <div css={skeletonClubLogoAndNameContainer}>
                    <div css={skeletonClubLogo} />
                    <div css={skeletonClubNameContainer}>
                        <div css={skeletonClubName} />
                        <div css={skeletonClubCategory} />
                    </div>
                </div>

                <div css={skeletonMobileQuestionStatus}>
                    <div css={skeletonQuestionDropdown} />
                </div>

                <div css={skeletonClubApplyTabContainer}>
                    <div css={skeletonTabNavigation}>
                        <div css={skeletonTabItem} />
                        <div css={skeletonTabItem} />
                    </div>
                </div>

                <div css={skeletonQuestionFormContainer}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} css={skeletonQuestionForm}>
                            <div css={skeletonQuestionLabel}>
                                <div css={skeletonQuestionTitle} />
                                <div css={skeletonRequiredStar} />
                            </div>
                            <div css={skeletonQuestionInput} />
                        </div>
                    ))}
                </div>
            </div>

            <div css={skeletonSubmitCardContainer}>
                <div css={skeletonSubmitCard}>
                    <div css={skeletonSubmitCardHeader}>
                        <div css={skeletonSubmitCardLogo} />
                        <div css={skeletonSubmitCardDeadline} />
                    </div>
                    <div css={skeletonSubmitCardTitle} />
                    <div css={skeletonSubmitCardCategory} />
                    <div css={skeletonSubmitCardDescription} />
                    <div css={skeletonSubmitCardProgress} />
                    <div css={skeletonSubmitCardButton} />
                </div>
            </div>

            <div css={skeletonSubmitButtonContainer}>
                <div css={skeletonSubmitButton} />
            </div>
        </div>
    );
}

export { ClubApplyLoadingPage };
