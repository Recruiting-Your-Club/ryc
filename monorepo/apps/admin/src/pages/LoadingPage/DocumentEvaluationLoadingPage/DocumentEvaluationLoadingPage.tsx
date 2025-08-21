import React from 'react';

import {
    s_applicantListItem,
    s_applicantListSkeleton,
    s_avatarSkeleton,
    s_cardContainer,
    s_contentContainer,
    s_documentEvaluationPageContainer,
    s_emailSkeleton,
    s_evaluatedTag,
    s_evaluationBoxSkeleton,
    s_evaluationComment,
    s_evaluationContainer,
    s_evaluationItem,
    s_evaluationItemHeader,
    s_evaluationRating,
    s_evaluationTitle,
    s_evaluatorName,
    s_evaluatorStars,
    s_infoHeader,
    s_informationBoxSkeleton,
    s_informationContainer,
    s_infoSectionContentSkeleton,
    s_infoSectionTitleSkeleton,
    s_infoTabItem,
    s_infoTabs,
    s_innerContentContainer,
    s_listContainer,
    s_listHeader,
    s_listSearchBar,
    s_nameEmailSkeleton,
    s_nameSkeleton,
    s_tabSkeleton,
    s_textContentContainer,
} from './DocumentEvaluationLoadingPage.style';

function DocumentEvaluationLoadingPage() {
    return (
        <div css={s_documentEvaluationPageContainer()}>
            <div css={s_listContainer()}>
                <div css={s_applicantListSkeleton()}>
                    <div css={s_listHeader()}>
                        <div css={s_tabSkeleton()} />
                        <div css={s_listSearchBar()} />
                    </div>
                    <div css={s_cardContainer}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} css={s_applicantListItem()}>
                                <div css={s_avatarSkeleton()} />
                                <div css={s_nameEmailSkeleton()}>
                                    <div css={s_nameSkeleton()} />
                                    <div css={s_emailSkeleton()} />
                                </div>
                                {index % 2 === 0 && <div css={s_evaluatedTag()} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div css={s_informationContainer()}>
                <div css={s_informationBoxSkeleton()}>
                    <div css={s_contentContainer}>
                        <div css={s_infoHeader()}>
                            <div css={s_infoTabs()}>
                                <div css={s_infoTabItem()} />
                                <div css={s_infoTabItem()} />
                            </div>
                        </div>
                        <div css={s_innerContentContainer}>
                            <div css={s_infoSectionTitleSkeleton()} />
                            <div css={s_textContentContainer}>
                                <div css={s_infoSectionContentSkeleton()} />
                                <div css={s_infoSectionContentSkeleton()} />
                                <div css={s_infoSectionContentSkeleton()} />
                                <div css={s_infoSectionContentSkeleton()} />
                            </div>
                        </div>
                    </div>
                    <div css={s_infoSectionContentSkeleton()} />
                    <div css={s_infoSectionContentSkeleton()} />
                </div>
            </div>
            <div css={s_evaluationContainer()}>
                <div css={s_evaluationBoxSkeleton()}>
                    <div css={s_evaluationTitle()} />
                    <div css={s_evaluationRating()} />
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} css={s_evaluationItem()}>
                            <div css={s_evaluationItemHeader()}>
                                <div css={s_evaluatorName()} />
                                <div css={s_evaluatorStars()} />
                            </div>
                            <div css={s_evaluationComment()} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { DocumentEvaluationLoadingPage };
