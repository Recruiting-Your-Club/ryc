import {
    skeletonBannerContainer,
    skeletonCardCategory,
    skeletonCardDescription,
    skeletonCardImage,
    skeletonCardTag,
    skeletonCardTags,
    skeletonCardTitle,
    skeletonCategoryButton,
    skeletonClubCategoryContainer,
    skeletonClubListContainer,
    skeletonDivider,
    skeletonMainCard,
    skeletonMainPageContainer,
    skeletonProgressButton,
    skeletonTotalClubText,
} from './MainLoadingPage.style';

function MainLoadingPage() {
    return (
        <div css={skeletonMainPageContainer}>
            <div css={skeletonBannerContainer} />
            <div css={skeletonTotalClubText} />
            <div css={skeletonClubCategoryContainer}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} css={skeletonCategoryButton} />
                ))}
                <div css={skeletonProgressButton} />
            </div>

            <div css={skeletonDivider} />

            <div css={skeletonClubListContainer}>
                {Array.from({ length: 8 }).map((_, i) => (
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
                ))}
            </div>
        </div>
    );
}
export { MainLoadingPage };
